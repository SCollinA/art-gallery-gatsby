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
          const { galleries, artworks } = (data && data.galleries && data.artworks) ?
            data : 
            { galleries: [], artworks: [] }
          return (
            <StaticQuery query={ARTWORK_FILES}
              render={data => {
                const artworkFiles = data.artworkFiles ? data.artworkFiles.edges.map(edge => edge.node) : []
                return (
                  <LayoutContext.Provider 
                    value={{ 
                      galleries: galleries.length > 0 ? galleries.map(gallery => {
                        return {
                          id: gallery.id,
                          name: gallery.name,
                          artworks: artworks.length > 0 ? artworks.map(({ id, galleryId, title, width, height, image, medium, price, sold }) => {
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
                          })
                          .filter(artwork => artwork.galleryId === gallery.id) :
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