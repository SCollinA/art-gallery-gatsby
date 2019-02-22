import React from "react"
import Layout from '../components/layout'
import SEO from '../components/seo'
import Admin from "../components/Admin";


const AdminPage = () => (
    <Layout>
        <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
        <Admin/>
    </Layout>
)

export default AdminPage