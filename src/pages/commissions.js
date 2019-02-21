import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Commissions from "../components/Commissions";

export default () => (
  <Layout>
    <SEO title="Contact" keywords={[`gatsby`, `application`, `react`]} />
    <Commissions/>
  </Layout>
)
