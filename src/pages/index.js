import React from "react"
import { graphql } from 'gatsby'

import Layout from "../components/layout"
import SEO from "../components/seo"

import Gallery from '../components/Gallery'
// import SocialLinks from '../components/SocialLinks'
import ContactForm from '../components/ContactForm'
import About from '../components/About'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faQuestionCircle } from '@fortawesome/free-regular-svg-icons'
library.add(faInstagram, faEnvelope, faQuestionCircle)

const IndexPage = ({data}) => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    {/* eslint-disable-next-line */}
    <a name='home'></a>
    <Gallery
      images={[
        {title: 'brown horse', image: data.image1.childImageSharp.fluid},
        {title: 'black dog', image: data.image2.childImageSharp.fluid},
        {title: 'dalmation', image: data.image3.childImageSharp.fluid},
        {title: 'irish wolf hound', image: data.image4.childImageSharp.fluid},
      ]}
    />
    {/* <SocialLinks /> */}
    {/* eslint-disable-next-line */}
    {/* <a name='contact'></a> */}
    <ContactForm 
      images={[
        {title: 'brown horse', image: data.image1.childImageSharp.fluid},
        {title: 'black dog', image: data.image2.childImageSharp.fluid},
        {title: 'dalmation', image: data.image3.childImageSharp.fluid},
        {title: 'irish wolf hound', image: data.image4.childImageSharp.fluid},
      ]} 
    />
    {/* eslint-disable-next-line */}
    <a name='about'></a>
    <About image={data.image.childImageSharp.fluid}/>
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