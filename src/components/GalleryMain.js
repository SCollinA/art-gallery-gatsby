import React from 'react'
import Img from 'gatsby-image'

export default ({images, selectedImage}) => (
    <div className='GalleryMain'>
        <h1>{images && selectedImage.title}</h1>
        {images ? images.map((image, index) => <Img key={index} style={{
            position: `${selectedImage.title === image.title ? 'relative' : 'fixed'}`,
            visibility: `${selectedImage.title === image.title ? 'visible' : 'hidden'}`
        }} fluid={image.image} />) : <Img fluid={selectedImage.image}/>}
        <p>{selectedImage.subtitle}</p>
    </div>
)