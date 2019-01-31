import React from 'react'
import Img from 'gatsby-image'

export default ({image}) => (
    <div className='GalleryMain'>
        <Img fluid={image} />
    </div>
)