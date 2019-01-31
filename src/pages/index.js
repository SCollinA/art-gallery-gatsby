import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import Gallery from '../components/Gallery'
import SocialLinks from '../components/SocialLinks'
import ContactForm from '../components/ContactForm'
import About from '../components/About'

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
