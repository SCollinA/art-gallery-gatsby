import React from 'react'
import Img from 'gatsby-image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import LayoutContext from '../contexts/LayoutContext'

export default ({ selectArtwork }) => (
    <div className='GalleryThumbs'>
        <div className='galleryArrow' onClick={() => scrollThumbs(true)}>
            <FontAwesomeIcon size='4x' icon={['fas', 'angle-left']}/>
        </div>
        {/* <h1 className='galleryArrow'>{'<'}</h1> */}
        <LayoutContext.Consumer>
            {({ artworks }) => (
                <div id='galleryThumbs'>
                    {artworks.map((artwork, index) => (
                        <div key={index} className='galleryThumb'
                        onClick={() => selectArtwork(artwork.name)}
                        >
                            <Img fluid={artwork.childImageSharp.fluid}/>
                        </div>
                    ))}
                </div>
            )}
        </LayoutContext.Consumer>
        {/* <h1 className='galleryArrow'>{'>'}</h1> */}
        <div className='galleryArrow' onClick={() => scrollThumbs(false)}>
            <FontAwesomeIcon size='4x' icon={['fas', 'angle-right']}/>
        </div>
    </div>
)

function scrollThumbs(isScrollingLeft) {
    const galleryThumbs = document.getElementById('galleryThumbs')
    galleryThumbs.scrollTo({
        top: 0,
        left: galleryThumbs.scrollLeft + (isScrollingLeft ? -100 : 100),
        behavior: 'smooth',
    })
        // galleryThumbs.scrollLeft + (isScrollingLeft ? -100 : 100), 0)
}