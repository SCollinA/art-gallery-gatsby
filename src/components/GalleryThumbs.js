import React from 'react'
import Img from 'gatsby-image'

export default ({images, selectImage}) => (
    <div className='GalleryThumbs'>
        {images.map((image, index) => (
            <div key={index} className='galleryThumb'
                onClick={() => selectImage(image)}
            >
                <Img fluid={image.image}/>
            </div>
        ))}
    </div>
)