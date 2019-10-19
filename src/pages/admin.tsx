import React from "react";
import Admin from "../components/Admin";
import Layout from "../components/layout";
import SEO from "../components/seo";


const adminPage = () => (
    <Layout>
        <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
        <Admin/>
    </Layout>
);

export default adminPage;
