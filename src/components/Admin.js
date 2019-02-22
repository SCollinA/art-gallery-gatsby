import React from 'react'
import AdminArtworks from "../components/AdminArtworks"
import AdminGalleries from "../components/AdminGalleries"
import UpdateGalleryForm from '../components/UpdateGalleryForm'
import UpdateArtworkForm from '../components/UpdateArtworkForm'
import AdminContext from '../contexts/AdminContext'
import AdminLogin from './AdminLogin';

export default class Admin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isUpdating: false,
            selectedGallery: {},
            updatingGallery: {},
            selectedArtwork: {},
            updatingArtwork: {},
            isLoggedIn: false,
        }
    }

    _login = isLoggedIn => this.setState({ isLoggedIn })

    _logout = () => {
        localStorage.removeItem('auth-token')
        this.setState({ isLoggedIn: false })
    }

    // select a gallery to update
    // when selecting, if one already exists, remove it
    _selectGallery = selectedGallery => this.setState({
        updatingArtwork: {},
        selectedArtwork: {},
        selectedGallery,
        updatingGallery: this.state.selectedGallery.id === selectedGallery.id && selectedGallery,
        isUpdating: this.state.selectedGallery.id === selectedGallery.id && true 
    })
    
    // select an artwork to update
    // when selecting, if one already exists, remove it
    _selectArtwork = selectedArtwork => this.setState({
        updatingGallery: {},
        selectedGallery: {}, 
        selectedArtwork,
        updatingArtwork: selectedArtwork, 
        isUpdating: true
    })

    // update the gallery in state
    _handleGalleryChange = updatingGallery => this.setState({ updatingGallery })
    
    // update the gallery in state
    _handleArtworkChange = updatingArtwork => this.setState({ updatingArtwork })

    // submission will be a mutation defined in the form
    _submitGalleryChange = () => this.setState({ 
        updatingGallery: {},
        selectedGallery: {}, 
        isUpdating: false 
    })
    
    // submission will be a mutation defined in the form
    _submitArtworkChange = () => this.setState({ 
        updatingArtwork: {}, 
        selectedArtwork: {},
        isUpdating: false 
    })

    _resetGallery = () => this.setState({
        updatingGallery: this.state.selectedGallery,
    })

    _resetArtwork = () => this.setState({
        updatingArtwork: this.state.selectedArtwork,
    })

    render() {
        const { isUpdating, updatingGallery, updatingArtwork, isLoggedIn } = this.state
        return (!isLoggedIn && (<AdminLogin adminLogin={this._login}/>)) || (
            <div className='Admin'
                onClick={event => this.setState({
                    isUpdating: false,
                    selectedGallery: {},
                    updatingGallery: {},
                    selectedArtwork: {},
                    updatingArtwork: {},
                })}
            >
            <div className='logout'>
                <input type='button' value='logout'
                    onClick={() => this._logout()}
                />
            </div>
                <AdminContext.Provider 
                    value={{ 
                        updatingGallery: this.state.updatingGallery,
                        selectGallery: this._selectGallery,
                        selectedGallery: this.state.selectedGallery,
                        changeGallery: this._handleGalleryChange,
                        submitGallery: this._submitGalleryChange,
                        resetGallery: this._resetGallery,
                        updatingArtwork: this.state.updatingArtwork,
                        selectArtwork: this._selectArtwork,
                        selectedArtwork: this.state.selectedArtwork,
                        changeArtwork: this._handleArtworkChange,
                        submitArtwork: this._submitArtworkChange,
                        resetArtwork: this._resetArtwork,
                    }}
                >
                    <AdminGalleries/>
                    <AdminArtworks/>
                    {isUpdating && (
                        <div className='updateForm'
                            onClick={() => this.setState({
                                isUpdating: false,
                                selectedGallery: {},
                                updatingGallery: {},
                                selectedArtwork: {},
                                updatingArtwork: {},
                            })}
                        >
                            {((updatingGallery.id && 
                                <UpdateGalleryForm/>) || 
                            (updatingArtwork.id && 
                                <UpdateArtworkForm/>))}
                        </div>
                    )}
                </AdminContext.Provider>
            </div>
        )
    }
}