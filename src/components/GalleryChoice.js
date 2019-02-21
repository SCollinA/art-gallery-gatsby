import React from 'react'

export default GalleryChoice = ({ galleries, selectGallery }) => {
    return (
        <div className='GalleryChoice'>
            <div className='galleryArrow' onClick={() => scrollThumbs(true)}>
                <FontAwesomeIcon size='4x' icon={['fas', 'angle-left']}/>
            </div>
            {/* <h1 className='galleryArrow'>{'<'}</h1> */}
            {/* <LayoutContext.Consumer>
                {({ artworks }) => ( */}
                    <div id='galleryThumbs'>
                        {selectedGallery.artworks.map((artwork, index) => (
                            <div key={index} 
                                className={`
                                    galleryThumb
                                    ${artwork.id === selectedArtwork.id ?
                                        ' selectedArtwork' : ''}
                                `}
                                onClick={() => selectArtwork(artwork.name)}
                            >
                                {(artwork.file && (
                                    <Img fluid={artwork.file.childImageSharp.fluid}/>
                                )) || (
                                    <img src={artwork.image} alt={artwork.title}/>
                                )}
                            </div>
                        ))[0]}
                    </div>
                {/* )} */}
            {/* </LayoutContext.Consumer> */}
            {/* <h1 className='galleryArrow'>{'>'}</h1> */}
            <div className='galleryArrow' onClick={() => scrollThumbs(false)}>
                <FontAwesomeIcon size='4x' icon={['fas', 'angle-right']}/>
            </div>
        </div>
    )
}