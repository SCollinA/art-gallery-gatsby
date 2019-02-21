import React from 'react'
import Img from 'gatsby-image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import LayoutContext from '../contexts/LayoutContext'

export default ({ selectedGallery, selectArtwork, selectedArtwork }) => (
    <div className='ArtworkChoice'>
        <div className='galleryArrow' onClick={() => scrollThumbs(true)}>
            <FontAwesomeIcon size='4x' icon={['fas', 'angle-left']}/>
        </div>
        <div id='artworkThumbs'>
            {selectedGallery.artworks && selectedGallery.artworks.map((artwork, index) => (
                <div key={index} 
                    className={`artworkThumb${(selectedArtwork && artwork.id === selectedArtwork.id) ? ' selectedArtwork' : ''}`}
                    onClick={() => selectArtwork(artwork)}
                >
                    {(artwork.file && (
                        <Img fluid={artwork.file.childImageSharp.fluid}/>
                    )) || (
                    artwork.image && (
                        <img src={artwork.image} alt={artwork.title}/>
                    ))}
                    <p>{artwork.title}</p>
                </div>
            ))}
        </div>
        <div className='galleryArrow' onClick={() => scrollThumbs(false)}>
            <FontAwesomeIcon size='4x' icon={['fas', 'angle-right']}/>
        </div>
    </div>
)

function scrollThumbs(isScrollingLeft) {
    const artworkThumbs = document.getElementById('artworkThumbs')
    artworkThumbs.scrollTo({
        top: 0,
        left: artworkThumbs.scrollLeft + (isScrollingLeft ? -100 : 100),
        behavior: 'smooth',
    })
        // galleryThumbs.scrollLeft + (isScrollingLeft ? -100 : 100), 0)
}