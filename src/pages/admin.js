import React from "react"
import Layout from '../components/layout'
import SEO from '../components/seo'
import AddArtworks from "../components/AddArtworks";
import AddGalleries from "../components/AddGalleries";


const AdminPage = () => {
  return (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <AddGalleries/>
    <AddArtworks/>
  </Layout>
)}

export default AdminPage