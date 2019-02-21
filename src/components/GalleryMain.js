import React from 'react'
import Img from 'gatsby-image'
import LayoutContext from '../contexts/LayoutContext'

export default ({ selectedArtworkTitle }) => (
    <div className='GalleryMain'>
        <LayoutContext.Consumer>
            {({ artworks }) => {
                const visibleArtworkTitle = selectedArtworkTitle || artworks[0].name
                return (
                    <>
                        <h1>{artworks && visibleArtworkTitle}</h1>
                        {artworks.map((artwork, index) => (
                            <div key={index} className={`galleryArtwork${visibleArtworkTitle === artwork.name ? ' current' : ' hidden'}`}>
                                {artwork.artworkFile && (
                                    <Img  
                                        // style={{
                                        //     display: `${visibleArtworkTitle === artwork.name ? 'block' : 'none'}`
                                        // }} 
                                        fluid={artwork.childImageSharp.fluid} 
                                    />
                                ) || (
                                    <img 
                                        src={`data:image/jepg;base64,${artwork.image}`} 
                                        alt={`${artwork.medium}`}
                                    />
                                )}
                            </div>
                        ))}
                        <p>stuff will go here</p>
                    </>
                )
            }}
        </LayoutContext.Consumer>
    </div>
)