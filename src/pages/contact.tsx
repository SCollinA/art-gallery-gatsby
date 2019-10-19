import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import ContactForm from '../components/ContactForm'

export default () => (
  <Layout>
    <SEO title="Contact" keywords={[`gatsby`, `application`, `react`]} />
    <ContactForm />
  </Layout>
)
