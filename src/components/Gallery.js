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
        galleryChoice.id === this.state.selectedGallery.id ?
            this.setState({
                selectedGallery: {},
                selectedArtwork: null,
            }) : this.setState({
                selectedGallery,
                selectedArtwork: selectedGallery.artworks[0]
            })
    }

    _selectArtwork = selectedArtwork => this.setState({
        selectedArtwork: (this.state.selectedArtwork && 
            selectedArtwork.id === this.state.selectedArtwork.id) ?
            null :
            this.state.selectedGallery.artworks.find(artwork => artwork.id === selectedArtwork.id),
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
                    selectedGallery={this.state.selectedGallery} 
                    selectArtwork={this._selectArtwork}
                    selectedArtwork={this.state.selectedArtwork}
                />
            </div>
        )
    }
}

Gallery.contextType = LayoutContext