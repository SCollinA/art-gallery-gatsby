import React from 'react'

import Img from 'gatsby-image'

export default ({image}) => (
    <div className='About'>
        <h1>about Kelly</h1>
        <Img fluid={image}/>
        <p>Kelly has been painting forever.</p>
    </div>
)