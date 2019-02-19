import React from 'react'
import Img from 'gatsby-image'
import { galleryContext } from './layout'

export default ({ selectedArtworkTitle }) => (
    <div className='GalleryMain'>
        <galleryContext.Consumer>
            {({ artworks }) => {
                const visibleArtworkTitle = selectedArtworkTitle || artworks[0].name
                return (
                    <>
                        <h1>{artworks && visibleArtworkTitle}</h1>
                        {artworks.map((artwork, index) => (
                            <Img key={index} style={{
                                position: `${visibleArtworkTitle === artwork.name ? 'relative' : 'fixed'}`,
                                visibility: `${visibleArtworkTitle === artwork.name ? 'visible' : 'hidden'}`
                                }} 
                                fluid={artwork.childImageSharp.fluid} 
                                // alt='artwork'
                            />
                        ))}
                        <p>stuff will go here</p>
                    </>
                )
            }}
        </galleryContext.Consumer>
    </div>
)