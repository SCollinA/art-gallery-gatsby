import React from 'react'
import Img from 'gatsby-image'

export default ({images}) => (
    <div className='GalleryThumbs'>
        {images.map((image, index) => (
            <div key={index} className='galleryThumb'>
                <Img fluid={image}/>
            </div>
        ))}
    </div>
)