import React from "react"
import { graphql } from 'gatsby'

import Layout from "../components/layout"
import SEO from "../components/seo"
import About from '../components/About'

export default ({data}) => (
  <Layout>
    <SEO title="About" keywords={[`gatsby`, `application`, `react`]} />
    <About image={data.image.childImageSharp.fluid}/>
  </Layout>
)

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