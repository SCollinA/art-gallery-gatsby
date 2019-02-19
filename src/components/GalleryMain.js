import React from 'react'
import Img from 'gatsby-image'
import { galleryContext } from './layout'

export default ({ selectedArtwork }) => (
    <div className='GalleryMain'>
        <galleryContext.Consumer>
            {({ artworks }) => {
                const visibleArtwork = selectedArtwork || artworks[0]
                console.log(artworks, visibleArtwork)
                return (
                    <>
                        <h1>{artworks && visibleArtwork.title}</h1>
                        {artworks.map((artwork, index) => (
                            <Img key={index} style={{
                                position: `${visibleArtwork.title === artwork.title ? 'relative' : 'fixed'}`,
                                visibility: `${visibleArtwork.title === artwork.title ? 'visible' : 'hidden'}`
                                }} 
                                fluid={artwork.childImageSharp.fluid} 
                                // alt='artwork'
                            />
                        ))}
                        <p>{visibleArtwork.medium}</p>
                    </>
                )
            }}
        </galleryContext.Consumer>
    </div>
)