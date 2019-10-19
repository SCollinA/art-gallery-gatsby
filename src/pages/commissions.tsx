import React from "react";

import Commissions from "../components/Commissions";
import Layout from "../components/layout";
import SEO from "../components/seo";

export default () => (
  <Layout>
    <SEO title="Contact" keywords={[`gatsby`, `application`, `react`]} />
    <Commissions/>
  </Layout>
);
