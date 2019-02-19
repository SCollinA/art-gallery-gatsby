import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"

import Header from "./header"
import Footer from './Footer'
import "./layout.css"

export const galleryContext = React.createContext({})

const Layout = ({ children, data }) => (
  <div className='Layout'>
    <Header/>
    <div className='Content'>
      <StaticQuery
      query={graphql`
        {
          allFile(filter: { relativeDirectory: { eq: "artworks" } }) {
            edges {
              node {
                name
                ...fluidImage
              }
            }
          }
        }
      `}
      render={({ allFile: { edges }}) => {
        return (
          <galleryContext.Provider value={{ artworks: edges.map(edge => edge.node)}}>
            {children}
          </galleryContext.Provider>
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
      fluid(maxWidth: 1000, quality: 100) {
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