import React from "react"
import PropTypes from "prop-types"
import { graphql, StaticQuery } from "gatsby"
import { Query, ApolloConsumer } from "react-apollo"
import gql from 'graphql-tag'
import LayoutContext from '../contexts/LayoutContext'
import Header from "./header"
import Footer from './Footer'
import "./layout.css"
import Loading from "./Loading";

const Layout = ({ children }) => (
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
                const { artworkFiles: { edges }} = data
                console.log('running artwork files static query', edges.map(({ node: { name }}) => name))
                const artworkFiles = data.artworkFiles ? data.artworkFiles.edges.map(edge => edge.node) : []
                return (
                  <ApolloConsumer>
                    {client => {
                      artworksWithFiles.forEach(async artworkWithFile => {
                        if (!(artworkWithFile.file || artworkWithFile.image)) {
                          const { data: { getArtwork: { image }}} = await client.query({ query: ARTWORK_IMAGE, variables: { id: artworkWithFile.id } })
                          const { galleries, artworks } = client.readQuery({ query: DB_CONTENT })
                          client.writeQuery({
                              query: DB_CONTENT,
                              data: { galleries, artworks: artworks.map(artwork => ({ ...artwork, image }))},
                          })
                          console.log('heres the image', image)
                        }
                      })
                      return (
                        <LayoutContext.Provider 
                          value={{ 
                            // if galleries has a gallery, add it's artworks
                            galleries: galleries.length > 0 ? 
                              galleries.map(gallery => {
                                const galleryArtworks = artworks.filter(artwork => artwork.galleryId === gallery.id)
                                const artworksWithFiles = galleryArtworks.length > 0 ? 
                                  galleryArtworks.map(({ id, galleryId, title, width, height, image, medium, price, sold }) => {
                                    // if an artwork file exist add it
                                    // will check if file is there to determine proper element for image
                                    return {
                                      id,
                                      galleryId,
                                      title,
                                      width,
                                      height,
                                      image,
                                      medium,
                                      price,
                                      sold,
                                      file: artworkFiles.find(artworkFile => artworkFile.name === `${id}-${title}`),
                                    }
                                    // only include art that has a picture to show for the gallery
                                  }) :
                                  [{ id: 'nada', title: 'no artworks'}]
                                return {
                                  id: gallery.id,
                                  name: gallery.name,
                                  artworks: artworksWithFiles,
                                }
                              }) : [{ 
                                id: 'none', 
                                name: 'no galleries', 
                                artworks: [{ id: 'nada', title: 'no galleries #1'}]
                              }],
                          }}
                        >
                          {loading && <Loading/>}
                          {children}
                        </LayoutContext.Provider>  
                      )}}
                  </ApolloConsumer>
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
  query GetArtworkImage($id: ID!) {
      getArtwork(id: $id) {
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
        ...GatsbyImageSharpFluid_tracedSVG
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