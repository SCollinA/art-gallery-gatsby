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
    }

    componentDidMount() {
        this.setState({
            selectedGallery: this.context.galleries[0],
            selectedArtwork: this.context.galleries[0] &&
                this.context.galleries[0].artworks[0],
        })
    }
    
    _selectGallery = galleryChoice => {
        const selectedGallery = this.context.galleries.find(gallery => gallery.id === galleryChoice.id)
        this.setState({
            selectedGallery,
            selectedArtwork: selectedGallery.artworks[0]
        })
    }

    _selectArtwork = selectedArtwork => this.setState({ 
        selectedArtwork: this.state.galleries.find(artwork => artwork.id === selectedArtwork.id),
     })

    render() {
        return (
            <div className='Gallery'>
                <GalleryChoice 
                    galleries={this.context.galleries} 
                    selectGallery={this._selectGallery}
                    selectedGallery={this.state.selectedGallery}
                />
                <GalleryMain 
                    selectedGallery={this.state.selectedGallery} 
                    selectedArtwork={this.state.selectedArtwork}
                />
                <ArtworkChoice
                    galleries={this.state.galleries} 
                    selectArtwork={this._selectArtwork}
                    selectedArtwork={this.state.selectedArtwork}
                />
            </div>
        )
    }
}

Gallery.contextType = LayoutContext