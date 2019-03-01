import React from 'react'
import Img from 'gatsby-image'
import LayoutContext from '../contexts/LayoutContext'

export default ({ galleryMainRef, selectedGallery, selectedArtwork }) => (
    <div className='GalleryMain' ref={galleryMainRef}>
        <LayoutContext.Consumer>
            {({ galleries }) => {
                console.log(galleries)
                return selectedArtwork && (
                    <div className='selectedGallery'>
                        <div className='galleryTitle'>
                            <h2>{selectedGallery.name}</h2>
                            <h1>{selectedArtwork.title}</h1>
                        </div>
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
                            {!(selectedArtwork.width && selectedArtwork.height) || <p>{`W ${selectedArtwork.width} x H ${selectedArtwork.height}`}</p>}
                            {!selectedArtwork.price || <p>{`$${selectedArtwork.price}`}</p>}
                            {selectedArtwork.sold && <p>sold</p>}
                            {/* this one will be a caption */}
                            <p>{selectedArtwork.medium}</p>
                        </div>
                    </div>
                )
            }}
        </LayoutContext.Consumer>
    </div>
)