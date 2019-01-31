import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import Gallery from '../components/Gallery'
import SocialLinks from '../components/SocialLinks'
import ContactForm from '../components/ContactForm'
import About from '../components/About'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faLinkedin, faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons'
library.add(faLinkedin, faTwitter, faGithub)

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <Gallery />
    <SocialLinks />
    <ContactForm />
    <About />
  </Layout>
)

export default IndexPage
