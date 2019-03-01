import React, { Component } from 'react'
import GalleryChoice from './GalleryChoice'
import GalleryMain from './GalleryMain'
import ArtworkChoice from './ArtworkChoice'
import LayoutContext from '../contexts/LayoutContext'

export default class Gallery extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            selectedGallery: {},
            selectedArtwork: null,
        }
        this.galleryMain = React.createRef()
        this.artworkChoice = React.createRef()
    }

    componentDidMount() {
        this.state.selectedArtwork || this.setState({
            selectedGallery: this.context.galleries[0],
            selectedArtwork: this.context.galleries[0] &&
                this.context.galleries[0].artworks[0],
        })
    }

    componentDidUpdate() {
        (this.state.selectedGallery.id === 'none' && this.context.galleries[0].id !== 'none') && this.setState({
            selectedGallery: this.context.galleries[0],
            selectedArtwork: this.context.galleries[0] &&
                this.context.galleries[0].artworks[0],
        })
    }

    _selectGallery = selectedGallery => this.setState({
        selectedGallery,
        selectedArtwork: selectedGallery.artworks[0]
    }, () => {
        const artworkChoice = this.artworkChoice.current
        artworkChoice.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        })
    })

    _selectArtwork = selectedArtwork => this.setState({
        selectedArtwork
   }, () => {
        const galleryMain = this.galleryMain.current
        galleryMain.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        })
   })

    render() {            
        return (
            <div className='Gallery'>
                <GalleryChoice 
                    galleries={this.context.galleries} 
                    selectGallery={this._selectGallery}
                    selectedGallery={this.state.selectedGallery}
                />
                <GalleryMain galleryMainRef={this.galleryMain}
                    selectedGallery={this.state.selectedGallery} 
                    selectedArtwork={this.state.selectedArtwork}
                />
                <ArtworkChoice artworkChoiceRef={this.artworkChoice}
                    selectedGallery={this.state.selectedGallery} 
                    selectArtwork={this._selectArtwork}
                    selectedArtwork={this.state.selectedArtwork}
                />
            </div>
        )
    }
}

Gallery.contextType = LayoutContext