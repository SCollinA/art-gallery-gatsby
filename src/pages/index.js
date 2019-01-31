import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import Gallery from '../components/Gallery'
import SocialLinks from '../components/SocialLinks'
import ContactForm from '../components/ContactForm'
import About from '../components/About'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faLinkedin, faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
library.add(faLinkedin, faTwitter, faGithub, faEnvelope)

const IndexPage = ({data}) => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <Gallery />
    <SocialLinks />
    <ContactForm />
    <About image={data.image1.childImageSharp.fluid}/>
  </Layout>
)

export default IndexPage
export const fluidImage = graphql`
  fragment fluidImage on File {
    childImageSharp {
      fluid(maxWidth: 2000) {
        ...GatsbyImageSharpFluid
      }
    }
  }
`

export const query = () => {
  return graphql`
      query {
          image1: file(relativePath: { eq: "task_magic_icon.png" }) {
            ...fluidImage
          }

          image2: file(relativePath: { eq: "tee_hole.png" }) {
            ...fluidImage
          }
          
          image3: file(relativePath: { eq: "Sample824.png" }) {
            ...fluidImage
          }
          
          image4: file(relativePath: { eq: "CaveNebula.jpg" }) {
            ...fluidImage
          }
      }
  `
}