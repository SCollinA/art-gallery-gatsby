import React from "react"
import Layout from '../components/layout'
import SEO from '../components/seo'
import AdminArtworks from "../components/AdminArtworks"
import AdminGalleries from "../components/AdminGalleries"
import UpdateGalleryForm from '../components/UpdateGalleryForm'
import UpdateArtworkForm from '../components/UpdateArtworkForm'

export const AdminContext = React.createContext({})

class AdminPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isUpdating: false,
            updatingGallery: {},
            updatingArtwork: {},
        }
    }

    // select a gallery to update
    // when selecting, if one already exists, remove it
    _selectGallery = updatingGallery => this.state.isUpdating ? this.setState({ updatingGallery: {}, isUpdating: false }) : this.setState({ updatingGallery, isUpdating: true })
    
    // select an artwork to update
    // when selecting, if one already exists, remove it
    _selectArtwork = updatingArtwork => this.state.isUpdating ? this.setState({ updatingArtwork: {}, isUpdating: false }) : this.setState({ updatingArtwork, isUpdating: true })

    // update the gallery in state
    _handleGalleryChange = updatingGallery => this.setState({ updatingGallery })
    
    // update the gallery in state
    _handleArtworkChange = updatingArtwork => this.setState({ updatingArtwork })

    // submission will be a mutation defined in the form
    _submitGalleryChange = () => this.setState({ updatingGallery: {}, isUpdating: false })
    
    // submission will be a mutation defined in the form
    _submitArtworkChange = () => this.setState({ updatingArtwork: {}, isUpdating: false })

    render() {
        const { isUpdating, updatingGallery, updatingArtwork } = this.state
        return (
            <Layout>
                <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
                <AdminContext.Provider 
                    value={{ 
                        updatingGallery: this.state.updatingGallery,
                        selectGallery: this._selectGallery,
                        changeGallery: this._handleGalleryChange,
                        submitGallery: this._submitGalleryChange,
                        updatingArtwork: this.state.updatingArtwork,
                        selectArtwork: this._selectArtwork,
                        changeArtwork: this._handleArtworkChange,
                        submitArtwork: this._submitArtworkChange,
                    }}
                >
                    <AdminGalleries/>
                    <AdminArtworks/>
                    {isUpdating && 
                        ((updatingGallery.id && 
                            <UpdateGalleryForm/>) || 
                        (updatingArtwork.id && 
                            <UpdateArtworkForm/>))
                    }
                </AdminContext.Provider>
            </Layout>
        )
    }
}

export default AdminPage