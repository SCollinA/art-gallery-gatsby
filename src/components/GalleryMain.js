import React from 'react'
import Img from 'gatsby-image'
import LayoutContext from '../contexts/LayoutContext'

export default ({ selectedGallery, selectedArtwork }) => (
    <div className='GalleryMain'>
        <LayoutContext.Consumer>
            {({ galleries }) => {
                return selectedArtwork && (
                    <>
                        <h2>{selectedGallery.name}</h2>
                        <h1>{selectedArtwork.title}</h1>
                            {galleries.map(({ artworks }) => artworks.map((artwork, index) => (
                                <div key={index} 
                                    className={`
                                        galleryArtwork
                                        ${selectedArtwork.title === artwork.title ?
                                            ' current' : ' hidden'}
                                    `}
                                >
                                    {(artwork.file && (
                                        <Img  
                                            // style={{
                                            //     display: `${selectedArtworkTitle === artwork.name ? 'block' : 'none'}`
                                            // }} 
                                            fluid={artwork.file.childImageSharp.fluid} 
                                        />
                                    )) || (
                                    artwork.image && (
                                        <img 
                                            src={`data:image/jepg;base64,${artwork.image}`} 
                                            alt={`${artwork.title}`}
                                        />
                                    ))}
                                </div>
                            )))}
                        <p>stuff will go here</p>
                    </>
                )
            }}
        </LayoutContext.Consumer>
    </div>
)