import React from "react";

import Home from "../components/Home";
import Layout from "../components/layout";
import SEO from "../components/seo";

const indexPage: () => React.Component<Layout> = (): React.Component<Layout> => (
    <Layout>
      // <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      // { <Home/> }
    </Layout>
);

export default indexPage;
