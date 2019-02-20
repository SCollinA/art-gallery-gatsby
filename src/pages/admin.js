import React from "react"
import Layout from '../components/layout'
import SEO from '../components/seo'
import AddArtworks from "../components/AddArtworks"
import AddGalleries from "../components/AddGalleries"
import UpdateGalleryForm from '../components/UpdateGalleryForm'
import UpdateArtworkForm from '../components/UpdateArtworkForm'

class AdminPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isUpdating: false,
            updatingGallery: {},
            updatingArtwork: {},
        }
    }

    componentDidMount() {

    }

    render() {
      return (
            <Layout>
                <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
                <AddGalleries/>
                <AddArtworks/>
                {this.state.isUpdating && 
                    ((updatingGallery && <UpdateGalleryForm/>) || 
                        (updatingArtwork && <UpdateArtworkForm/>))}
            </Layout>
        )
    }
}

export default AdminPage