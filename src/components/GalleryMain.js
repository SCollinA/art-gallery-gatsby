import React from 'react'
import Img from 'gatsby-image'

export default ({image}) => (
    <div className='GalleryMain'>
        <h1>{image.title}</h1>
        <Img fluid={image.image} />
    </div>
)