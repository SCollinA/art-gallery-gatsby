import React from 'react'
import AdminArtworks from "./AdminArtworks"
import AdminGalleries from "./AdminGalleries"
import UpdateGalleryForm from './UpdateGalleryForm'
import UpdateArtworkForm from './UpdateArtworkForm'
import AdminContext from '../contexts/adminContext'
import AdminLogin from './AdminLogin';
import LayoutContext from '../contexts/layoutContext';

export default class Admin extends React.Component<any, any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            isLoggedIn: false,
            isUpdating: false,
            selectedArtwork: {},
            selectedGallery: {},
            updatingArtwork: {},
            updatingGallery: {},
        };
    }

    componentDidMount() {
        localStorage.getItem('auth-token') && this.setState({ isLoggedIn: true })
    }
    
    _login = (isLoggedIn: any) => {
        this.setState({ isLoggedIn })
        if (isLoggedIn) {
            window.onbeforeunload = () => 'are you sure you want to log out?'
            window.onunload = () => localStorage.removeItem('auth-token')
        }
    }

    _logout = () => {
        window.onbeforeunload = null
        localStorage.removeItem('auth-token')
        this.setState({ isLoggedIn: false })
    }

    // select a gallery to update
    // when selecting, if one already exists, remove it
    _selectGallery = (selectedGallery: any) => this.setState({
        updatingArtwork: {},
        selectedArtwork: {},
        selectedGallery,
        updatingGallery: this.state.selectedGallery.id === selectedGallery.id && selectedGallery,
        isUpdating: this.state.selectedGallery.id === selectedGallery.id && true 
    })
    
    // select an artwork to update
    // when selecting, if one already exists, remove it
    _selectArtwork = (selectedArtwork: any) => this.setState({
        updatingGallery: {},
        // selectedGallery: {}, 
        selectedArtwork,
        updatingArtwork: selectedArtwork, 
        isUpdating: true
    })

    // update the gallery in state
    _handleGalleryChange = (updatingGallery: any) => this.setState({ updatingGallery })
    
    // update the gallery in state
    _handleArtworkChange = (updatingArtwork: any) => this.setState({ updatingArtwork: { ...this.state.updatingArtwork, ...updatingArtwork } })

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

    _removeGallery = () => this._submitGalleryChange()

    _removeArtwork = () => this._submitArtworkChange()

    render() {
        const { isUpdating, updatingGallery, updatingArtwork, isLoggedIn } = this.state
        const { updateDbImage } = this.context
        return (!isLoggedIn && (<AdminLogin adminLogin={this._login}/>)) || (
            <div className='Admin'
                onClick={() => this.setState({
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
                        removeGallery: this._removeGallery,
                        updatingArtwork: this.state.updatingArtwork,
                        selectArtwork: this._selectArtwork,
                        selectedArtwork: this.state.selectedArtwork,
                        changeArtwork: this._handleArtworkChange,
                        submitArtwork: this._submitArtworkChange,
                        updateDbImage,
                        resetArtwork: this._resetArtwork,
                        removeArtwork: this._removeArtwork,
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

Admin.contextType = LayoutContext