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
          postgres {
            artworks: allArtworksList {
              title
              image
              medium
            }
            galleries: allGalleriesList {
              name
            }
          }
        }
      `}
      render={data => {
        return (
          <galleryContext.Provider value={data.postgres}>
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

export const query = graphql`
  {
    postgres {
      images: allArtworksList {
        title
        image
        medium
      }
    }

    image1: file(relativePath: { eq: "brown_horse.jpg" }) {
      ...fluidImage
    }

    image2: file(relativePath: { eq: "black_dog.jpg" }) {
      ...fluidImage
    }
    
    image3: file(relativePath: { eq: "dalmation.jpg" }) {
      ...fluidImage
    }
    
    image4: file(relativePath: { eq: "irish_wolf_hound.jpg" }) {
      ...fluidImage
    }
  }
`

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