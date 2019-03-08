import React from "react"
import PropTypes from "prop-types"
import { graphql, StaticQuery } from "gatsby"
import { Query } from "react-apollo"
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
          console.log('running db content query')
          const { galleries, artworks } = (!loading && data) ?
            data : 
            { galleries: [], artworks: [] }
          return (
            <StaticQuery query={ARTWORK_FILES}
              render={data => {
                console.log('running artwork files static query')
                const artworkFiles = data.artworkFiles ? data.artworkFiles.edges.map(edge => edge.node) : []
                return (
                  <LayoutContext.Provider 
                    value={{ 
                      // if galleries has a gallery, add it's artworks
                      galleries: galleries.length > 0 ? 
                        galleries.map(gallery => {
                          const galleryArtworks = artworks.filter(artwork => artwork.galleryId === gallery.id)
                          return {
                            id: gallery.id,
                            name: gallery.name,
                            artworks: galleryArtworks.length > 0 ? 
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
                                  file: artworkFiles.find(artworkFile => artworkFile.name === id),
                                }
                              }) :
                              [{ id: 'nada', title: 'no galleries #1'}]
                          }
                        }) : [{ 
                          id: 'none', 
                          name: 'no galleries', 
                          artworks: [{ id: 'nada', title: 'no galleries #1'}]
                        }]
                    }}
                  >
                    {loading && <Loading/>}
                    {children}
                  </LayoutContext.Provider>
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
      image
      medium
      price
      sold
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