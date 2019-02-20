import React, { Component } from 'react'
import GalleryMain from './GalleryMain';
import GalleryThumbs from './GalleryThumbs';
// import { galleryContext } from './layout';

export default class Gallery extends Component {
    constructor(props) {
        super(props)
        this.state = { selectedArtworkTitle: null }
    }

    componentDidMount() {
        this.setState({
            selectedArtworkTitle: this.context.artworks[0].name
        })
    }
    
    _selectArtwork = selectedArtworkTitle => { this.setState({ selectedArtworkTitle: this.context.artworks.find(artwork => artwork.name === selectedArtworkTitle).name }) }

    render() {
        return (
            <div className='Gallery'>
                <GalleryMain selectedArtworkTitle={this.state.selectedArtworkTitle}/>
                <GalleryThumbs selectArtwork={this._selectArtwork}/>
            </div>
        )
    }
}

// Gallery.contextType = galleryContext