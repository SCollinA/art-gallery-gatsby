import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import About from '../components/About'

export default () => (
  <Layout>
    <SEO title="About" keywords={[`gatsby`, `application`, `react`]} />
    <About/>
  </Layout>
)