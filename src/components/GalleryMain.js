import React from 'react'
// import Img from 'gatsby-image'
import { galleryContext } from './layout'

export default ({ selectedArtwork }) => (
    <div className='GalleryMain'>
        <galleryContext.Consumer>
            {(value) => {
                console.log(value)
                return (
                    <>
                        {/* <h1>{artworks && selectedArtwork.title}</h1>
                        {artworks ? artworks.map((artwork, index) => (
                            <Img key={index} style={{
                                position: `${selectedArtwork.title === artwork.title ? 'relative' : 'fixed'}`,
                                visibility: `${selectedArtwork.title === artwork.title ? 'visible' : 'hidden'}`
                                }} 
                                fluid={artwork.image} 
                            />
                        )) : <Img fluid={selectedArtwork.image}/>}
                        <p>{selectedArtwork.medium}</p> */}
                    </>
                )
            }}
        </galleryContext.Consumer>
    </div>
)