import React from 'react'
import Img from 'gatsby-image'
import LayoutContext from '../contexts/LayoutContext'

export default ({ selectedGallery, selectedArtwork }) => (
    <div className='GalleryMain'>
        <LayoutContext.Consumer>
            {({ galleries }) => {
                return selectedArtwork && (
                    <div className='selectedGallery'>
                        <div className='galleryImage'>
                            {galleries.map(({ artworks }) => artworks.map((artwork, index) => (
                                <div key={index} 
                                className={`galleryArtwork${selectedArtwork.id === artwork.id ? ' current' : ' hidden'}`}
                                >
                                    {(artwork.file && (
                                        <Img fluid={artwork.file.childImageSharp.fluid}/>
                                    )) || (
                                    artwork.image && (
                                        <img 
                                            src={`data:image/jepg;base64,${artwork.image}`} 
                                            alt={`${artwork.title}`}
                                        />
                                    ))}
                                </div>
                            )))}
                        </div>
                        <div className='galleryCaption'>
                            <p>{selectedArtwork.medium}</p>
                            <p>{`${selectedArtwork.price ? `$${selectedArtwork.price}` : 'no price'}`}</p>
                            <p>{selectedArtwork.sold && 'sold'}</p>
                            {/* this one will be a caption */}
                            <p>{selectedArtwork.medium}</p>
                        </div>
                        <div className='galleryTitle'>
                            <h2>{selectedGallery.name}</h2>
                            <h1>{selectedArtwork.title}</h1>
                        </div>
                    </div>
                )
            }}
        </LayoutContext.Consumer>
    </div>
)