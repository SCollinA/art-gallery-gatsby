import React from "react"
import { graphql } from 'gatsby'
// import Img from 'gatsby-image'

import Layout from "../components/layout"
import SEO from "../components/seo"
import GalleryMain from "../components/GalleryMain";

const IndexPage = ({data}) => {
  console.log(data)
  return (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    {/* random artwork */}
    <div className='randomArtwork'>
      <GalleryMain
        selectedImage={[
          {title: 'brown horse', image: data.image1.childImageSharp.fluid},
          {title: 'black dog', image: data.image2.childImageSharp.fluid},
          {title: 'dalmation', image: data.image3.childImageSharp.fluid},
          {title: 'irish wolf hound', image: data.image4.childImageSharp.fluid},
        ][Math.floor(Math.random() * 4)]}
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

export const query = graphql`
      {
        postgres {
          images: allArtworksList {
            title
            
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

// export const query = () => {
//   return graphql`
//       query {

//       }
//   `
// } 