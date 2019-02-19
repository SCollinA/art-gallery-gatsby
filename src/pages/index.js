import React from "react"
import Img from 'gatsby-image'

import Layout, { galleryContext } from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => {
  return (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    {/* random artwork */}
    <div className='randomArtwork'>
      <galleryContext.Consumer>
        {({ artworks }) => (
          <Img fluid={artworks[Math.floor(Math.random() * artworks.length)].childImageSharp.fluid}/>
        )}
      </galleryContext.Consumer>
    </div>
    <div className='welcomeMessage'>
      <h4>Welcome!</h4>
      <p>Welcome to the best art gallery site evar!</p>
    </div>
  </Layout>
)}

export default IndexPage