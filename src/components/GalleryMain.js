import React from 'react'
import Img from 'gatsby-image'
import LayoutContext from '../contexts/LayoutContext'

export default ({ galleryMainRef, selectedGallery, selectedArtwork, selectedArtworkRef, windowHeight }) => {
    return (
    <div className='GalleryMain' ref={galleryMainRef}>
        <LayoutContext.Consumer>
            {({ galleries }) => {
                return selectedArtwork && (
                    <div className='selectedGallery'>
                        <div className='galleryTitle'>
                            <h2>{selectedGallery.name}</h2>
                            <h1>{selectedArtwork.title}</h1>
                        </div>
                        <div className='galleryImage'>
                            {galleries.map(({ artworks }) => artworks.map((artwork, index) => {
                                console.log(windowHeight, 'herro')
                                return (
                                <div key={index} 
                                    className={`galleryArtwork${selectedArtwork.id === artwork.id ? ' current' : ' hidden'}`}
                                >
                                    {(artwork.file && (
                                        <Img 
                                            style={{
                                                maxWidth: artwork.file.childImageSharp.fluid.aspectRatio <= 1 ?
                                                `${(windowHeight * .75) * artwork.file.childImageSharp.fluid.aspectRatio}px` :
                                                '100%',
                                                margin: 'auto',
                                            }}
                                            fluid={artwork.file.childImageSharp.fluid}
                                        />
                                    )) || (
                                    artwork.image && (
                                        <img ref={selectedArtworkRef}
                                            style={{ display: 'none' }}
                                            src={`data:image/jepg;base64,${artwork.image}`} 
                                            alt={`${artwork.title}`}
                                            onLoad={() => {
                                                console.log('adjust recently added image in gallery')
                                                const dbImage = selectedArtworkRef.current
                                                dbImage.style.maxWidth = dbImage.width / dbImage.height <= 1 ?
                                                    `${(windowHeight * .75) * dbImage.width}px` :
                                                    '100%'
                                            }}
                                        />
                                    ))}
                                </div>
                            )}))}
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
}