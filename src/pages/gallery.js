import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Gallery from '../components/Gallery'

export default () => (
  <Layout>
    <SEO title="Gallery" keywords={[`gatsby`, `application`, `react`]} />
    <Gallery/>
  </Layout>
)