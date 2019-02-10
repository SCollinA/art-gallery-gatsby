import React from 'react'
import Img from 'gatsby-image'

export default ({images, selectedImage}) => (
    <div className='GalleryMain'>
        <h1>{selectedImage.title}</h1>
        {images.map((image, index) => <Img className= "MainImg" key={index} style={{
            position: `${selectedImage.title === image.title ? 'relative' : 'fixed'}`,
            visibility: `${selectedImage.title === image.title ? 'visible' : 'hidden'}`
        }} fluid={image.image} />)}
    </div>
)