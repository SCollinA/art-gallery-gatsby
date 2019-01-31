import React from 'react'
import Img from 'gatsby-image'

export default ({images, selectedImage}) => (
    <div className='GalleryMain'>
        <h1>{selectedImage.title}</h1>
        {images.map((image, index) => <Img key={index} style={{
            position: `${selectedImage.title === image.title ? 'relative' : 'fixed'}`,
        }} fluid={image.image} />)}
    </div>
)