import React from 'react'
import Img from 'gatsby-image'
import { fixedImage } from '../pages';

export default ({images, selectedImage}) => (
    <div className='GalleryMain'>
        <h1>{selectedImage.title}</h1>
        {images.map(image => <Img style={{
            position: `${selectedImage.title === image.title ? 'relative' : 'fixed'}`,
        }} fluid={image.image} />)}
    </div>
)