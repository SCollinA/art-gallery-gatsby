import React from 'react'
import Img from 'gatsby-image'
import styled from 'styled-components'


const StyledImg = styled(Img)`
    display: block;
    margin: 0 auto;

   img {
        object-fit: contain !important
    }
`

export default ({images, selectedImage}) => (
    <div className='GalleryMain'>
        <h1>{images && selectedImage.title}</h1>
        {images ? images.map((image, index) => <StyledImg key={index} style={{
            position: `${selectedImage.title === image.title ? 'relative' : 'fixed'}`,
            visibility: `${selectedImage.title === image.title ? 'visible' : 'hidden'}`,
        }}
            
         fluid={image.image} />) : <StyledImg fluid={selectedImage.image}/>}
        <p>{selectedImage.subtitle}</p>
    </div>
)