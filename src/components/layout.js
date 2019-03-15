import React from "react"
import PropTypes from "prop-types"
import { graphql, StaticQuery } from "gatsby"
import { 
  Query, 
  // Subscription ,
  // ApolloConsumer,
} from "react-apollo"
// import { client } from '../apollo/client'
import gql from 'graphql-tag'
import LayoutContext from '../contexts/LayoutContext'
import Header from "./header"
import Footer from './Footer'
import "./layout.css"
// import Loading from "./Loading";

const artworkImages = []

class Layout extends React.Component {

  // componentDidUpdate() {
  //   console.log('component did update')
  //   artworkImages.forEach(artworkImage => {
  //     console.log('each artwork image')
  //     const data = client.readQuery({
  //       fetchPolicy: 'cache-first',
  //       query: ARTWORK_IMAGE,
  //       variables: {
  //         id: artworkImage.id
  //       }
  //     })
  //     console.log('apollo data', data)
  //     artworkImage.image = data.getArtwork.image
  //   })
  // }

  _updateDbImage = ( id ) => {
    'updating artwork images'
    !artworkImages.find(artworkImages => artworkImages.id === id) &&
      artworkImages.push({ id })
  }

  render() {
    const { children } = this.props
    return (
      <div className='Layout'>
        <Header/>
        <div className='Content'>
          <Query query={DB_CONTENT}>
            {({ data, loading, error }) => {
              console.log('running db content query', data)
              const { galleries, artworks } = (!loading && data) ?
                data : 
                { galleries: [], artworks: [] }
              return (
                <StaticQuery query={ARTWORK_FILES}
                  render={data => {
                    console.log('running artwork files static query')
                    const artworkFiles = data.artworkFiles ? data.artworkFiles.edges.map(edge => edge.node) : []
                    const galleriesWithFiles = galleries.length > 0 ? 
                      galleries.map(gallery => {
                        const galleryArtworks = artworks.filter(artwork => artwork.galleryId === gallery.id)
                        return {
                          id: gallery.id,
                          name: gallery.name,
                          artworks: galleryArtworks.length > 0 ? 
                            galleryArtworks.map(({ id, galleryId, title, width, height, image, medium, price, sold }) => {
                              const artworkImage = artworkImages.find(artworkImage => id === artworkImage.id)
                              // if an artwork file exist add it
                              // will check if file is there to determine proper element for image
                              return {
                                id,
                                galleryId,
                                title,
                                width,
                                height,
                                image: artworkImage ? artworkImage.image : '',
                                medium,
                                price,
                                sold,
                                file: artworkFiles.find(artworkFile => artworkFile.name === `${id}-${title}`),
                              }
                            }) :
                            [{ id: 'nada', title: 'no artworks'}]
                        }
                      }) : [{ 
                        id: 'none', 
                        name: 'no galleries', 
                        artworks: [{ id: 'nada', title: 'no galleries #1'}]
                      }]
                    !artworkImages.length &&
                      galleriesWithFiles.forEach(galleryWithFile => {
                        galleryWithFile.artworks.forEach(galleryArtwork => {
                          if (!galleryArtwork.file && galleryArtwork.id !== 'nada') {
                            artworkImages.push({
                              id: galleryArtwork.id,
                            })
                          }
                        })
                      })
                    return (
                      <>
                        {artworkImages.map((artworkImage, index) => {
                          console.log('component did update')
                          console.log('each artwork image')
                          return (
                            <Query key={index} query={ARTWORK_IMAGE} variables={{ id: artworkImage.id }} fetchPolicy={'cache-only'}>
                              {({ data, loading, error }) => {
                                console.log('apollo data', data)
                                artworkImages.find(dbImage => dbImage.id === artworkImage.id).image = data.getArtwork && data.getArtwork.image
                                return null
                              }}
                            </Query>
                          )
                        })}
                        <LayoutContext.Provider 
                          value={{ 
                            // if galleries has a gallery, add it's artworks
                            galleries: galleriesWithFiles.map(galleryWithFile => {
                              console.log(artworkImages)
                              return {
                                ...galleryWithFile,
                                artworks: galleryWithFile.artworks.map(galleryArtwork => {
                                  const artworkImage = artworkImages.find(artworkImage => artworkImage.id === galleryArtwork.id)
                                  return {
                                    ...galleryArtwork,
                                    image: artworkImage ?
                                    artworkImage.image :
                                    galleryArtwork.image
                                  }
                                })
                              }
                            }),
                            updateDbImage: this._updateDbImage
                          }}
                        >
                          {/* {loading && <Loading/>} */}
                          {children}
                        </LayoutContext.Provider>
                      </>
                    )
                  }}
                />
              )
            }}
          </Query>  
          <Footer/>
        </div>
      </div>
    )
  }
}


Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Layout

export const DB_CONTENT = gql`
  {
    galleries: getAllGalleries {
      id
      name
    }

    artworks: getAllArtworks {
      id
      galleryId
      title
      width
      height
      medium
      price
      sold
    }
  }
  
  `

export const ARTWORK_IMAGE = gql`
  query GetArtworkImage($id: ID) {
    getArtwork(id: $id) {
      id
      image
    }
  }
`

export const GET_ARTWORK_IMAGES = gql`  
subscription GetArtworkImages {
  artworkImageChanged {
    id
    image
  }
}
`
  
  const ARTWORK_FILES = graphql`
  {
    artworkFiles: allFile(filter: { 
        relativeDirectory: { eq: "artworks" },
        extension: { eq: "jpeg" }
    }) {
      edges {
        node {
          name
          ...fluidImage
        }
      }
    }
  }
`

export const fluidImage = graphql`
  fragment fluidImage on File {
    childImageSharp {
      fluid(maxWidth: 1000, quality: 100, srcSetBreakpoints: [200, 340, 520, 890]) {
        ...GatsbyImageSharpFluid
      }
    }
  }
`

export const fixedImage = graphql`
  fragment fixedImage on File {
    childImageSharp {
      fixed(width: 1000, quality: 100) {
        ...GatsbyImageSharpFixed
      }
    }
  }
`