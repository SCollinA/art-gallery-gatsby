import React from "react"
import { graphql } from 'gatsby'

import Layout from "../components/layout"
import SEO from "../components/seo"
import Gallery from '../components/Gallery'

export default ({data}) => (
  <Layout>
    <SEO title="Contact" keywords={[`gatsby`, `application`, `react`]} />
    <Gallery
      images={[
        {title: 'brown horse', image: data.image1.childImageSharp.fluid},
        {title: 'black dog', image: data.image2.childImageSharp.fluid},
        {title: 'dalmation', image: data.image3.childImageSharp.fluid},
        {title: 'irish wolf hound', image: data.image4.childImageSharp.fluid},
      ]}
    />
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