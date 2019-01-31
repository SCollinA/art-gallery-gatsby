import React from 'react'
import Img from 'gatsby-image'

export default ({images}) => (
    <div className='GalleryThumbs'>
        {images.map((image, index) => <Img key={index} fluid={image}/>)}
    </div>
)