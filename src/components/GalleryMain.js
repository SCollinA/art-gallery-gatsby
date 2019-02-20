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
                            <div key={index} className={`galleryArtwork${visibleArtworkTitle === artwork.name ? ' current' : ' hidden'}`}>
                                <Img  
                                    style={{
                                        display: `${visibleArtworkTitle === artwork.name ? 'block' : 'none'}`
                                    }} 
                                    fluid={artwork.childImageSharp.fluid} 
                                />
                            </div>
                        ))}
                        <p>stuff will go here</p>
                    </>
                )
            }}
        </galleryContext.Consumer>
    </div>
)