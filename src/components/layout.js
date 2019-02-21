import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import { Query } from "react-apollo";
import { gql } from 'graphql-tag'
import LayoutContext from '../contexts/LayoutContext'
import Header from "./header"
import Footer from './Footer'
import "./layout.css"

const Layout = ({ children, data }) => (
  <div className='Layout'>
    <Header/>
    <div className='Content'>
      <StaticQuery
      query={graphql`
        {
          artworks: allFile(filter: { 
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
      `}
      render={({ artworks: { edges }}) => {
        return (
          // set context to the files returned from the query above
          <Query query={gql`
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
                image
                price
                sold
              }
            }
          `}>
            {({ data: { galleries, artworks }, loading, error }) => {
              const artworkFiles = edges.map(edge => edge.node)
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
          </Query>
        ) 
      }}/>
        <Footer/>
    </div>
  </div>
)

Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Layout

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