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
        this.galleryDiv = React.createRef()
    }

    componentDidMount() {
        this.setState({
            selectedGallery: this.context.galleries[0],
            selectedArtwork: this.context.galleries[0] &&
                this.context.galleries[0].artworks[0],
        })
    }

    _selectGallery = selectedGallery => this.setState({
        selectedGallery,
        selectedArtwork: selectedGallery.artworks[0]
    })

    _selectArtwork = selectedArtwork => this.setState({
        selectedArtwork
   })

    render() {            
        return (
            <div className='Gallery'>
                <GalleryMain 
                    selectedGallery={this.state.selectedGallery} 
                    selectedArtwork={this.state.selectedArtwork}
                />
                <ArtworkChoice
                    selectedGallery={this.state.selectedGallery} 
                    selectArtwork={this._selectArtwork}
                    selectedArtwork={this.state.selectedArtwork}
                />
                <GalleryChoice 
                    galleries={this.context.galleries} 
                    selectGallery={this._selectGallery}
                    selectedGallery={this.state.selectedGallery}
                />
            </div>
        )
    }
}

Gallery.contextType = LayoutContext