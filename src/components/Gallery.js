import React, { Component } from 'react'
import GalleryMain from './GalleryMain';
import GalleryThumbs from './GalleryThumbs';

export default class Gallery extends Component {
    constructor(props) {
        super(props)
        this.state = { selectedImage: props.images[0] }
    }
    
    _selectImage = selectedImage => { this.setState({ selectedImage: this.props.images.find(image => image.title === selectedImage.title) }) }

    render() {
        return (
            <div className='Gallery'>
                <GalleryMain images={this.props.images} selectedImage={this.state.selectedImage}/>
                <GalleryThumbs images={this.props.images} selectImage={this._selectImage}/>
            </div>
        )
    }
}