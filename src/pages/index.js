import React from "react"
import { graphql } from 'gatsby'

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = ({data}) => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
  </Layout>
)

export default IndexPage

export const query = () => {
  return graphql`
      query {
          image: file(relativePath: { eq: "kelly.jpg" }) {
            ...fluidImage
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
}

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