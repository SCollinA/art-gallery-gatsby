import React from "react"
import PropTypes from "prop-types"
import { graphql, StaticQuery } from "gatsby"
import { Query } from "react-apollo"
import gql from 'graphql-tag'
import LayoutContext from '../contexts/LayoutContext'
import Header from "./header"
import Footer from './Footer'
import "./layout.css"

const Layout = ({ children }) => (
  <div className='Layout'>
    <Header/>
    <div className='Content'>
      <Query query={DB_CONTENT}>
        {({ data, loading, error }) => {
          const galleries = data.galleries || []
          const artworks = data.artworks || []
          return (
          <StaticQuery query={ARTWORK_FILES}
            render={data => {
              const artworkFiles = data.artworkFiles.edges.map(edge => edge.node)
              return (
                <LayoutContext.Provider 
                  value={{ 
                    galleries: galleries.map(gallery => {
                      return {
                        ...gallery,
                        artworks: artworks.map(artwork => {
                          // if an artwork file exist add it
                          // will check if file is there to determine proper element for image
                          return {
                            ...artworks,
                            file: artworkFiles.find(artworkFile => artworkFile.name === artwork.id),
                          }
                        })
                        .filter(artwork => artwork.galleryId === gallery.id)
                      }
                    })
                  }}
                >
                  {children}
                </LayoutContext.Provider>
              )
            }}
          />
        )}}
      </Query>  
      <Footer/>
    </div>
  </div>
)

Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Layout

const DB_CONTENT = gql`
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
      fluid(maxWidth: 500, maxHeight: 500, quality: 100, srcSetBreakpoints: [200, 340, 520, 890]) {
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