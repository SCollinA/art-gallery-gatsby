import React from 'react'
import Img from 'gatsby-image'

export default ({images, selectImage}) => (
    <div className='GalleryThumbs'>
        <h1 className='galleryArrowLeft'>{'<'}</h1>
        {images.map((image, index) => (
            <div key={index} className='galleryThumb'
            onClick={() => selectImage(image)}
            >
                <Img fluid={image.image}/>
            </div>
        ))}
        <h1 className='galleryArrowRight'>{'>'}</h1>
    </div>
)