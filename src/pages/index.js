import React from "react"
// import { graphql } from 'gatsby'
// import Img from 'gatsby-image'

import Layout from "../components/layout"
import SEO from "../components/seo"
import GalleryMain from "../components/GalleryMain";

const IndexPage = () => {
  return (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    {/* random artwork */}
    <div className='randomArtwork'>
      <GalleryMain
        // selectedImage={[
        //   {title: 'brown horse', image: data.image1.childImageSharp.fluid},
        //   {title: 'black dog', image: data.image2.childImageSharp.fluid},
        //   {title: 'dalmation', image: data.image3.childImageSharp.fluid},
        //   {title: 'irish wolf hound', image: data.image4.childImageSharp.fluid},
        // ][Math.floor(Math.random() * 4)]}
      />
      {/*  <Img fluid={}/> */}
    </div>
    <div className='welcomeMessage'>
      <h4>Welcome!</h4>
      <p>Welcome to the best art gallery site evar!</p>
    </div>
  </Layout>
)}

export default IndexPage