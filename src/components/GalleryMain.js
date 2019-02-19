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
                        <h1>{artworks && visibleArtwork.name}</h1>
                        {artworks.map((artwork, index) => (
                            <Img key={index} style={{
                                position: `${visibleArtwork.name === artwork.name ? 'relative' : 'fixed'}`,
                                visibility: `${visibleArtwork.name === artwork.name ? 'visible' : 'hidden'}`
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