import React from 'react'
import Img from 'gatsby-image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import LayoutContext from '../contexts/LayoutContext'

export default ({ galleries, selectGallery, selectedGallery }) => {
    return (
        <div className='GalleryChoice'>
            <div className='galleryArrow' onClick={() => scrollThumbs(true)}>
                <FontAwesomeIcon size='4x' icon={['fas', 'angle-left']}/>
            </div>
            {/* <h1 className='galleryArrow'>{'<'}</h1> */}
            {/* <LayoutContext.Consumer>
                {({ artworks }) => ( */}
                    <div id='galleryThumbs'>
                        {/* map galleries to their first artwork image */}
                        {galleries.map((gallery, index) => gallery.artworks.map((artwork) => (
                            <div key={index} 
                                className={`
                                    galleryThumb
                                    ${artwork.id === selectedGallery.id ?
                                        ' selectedGallery' : ''}
                                `}
                                onClick={() => selectGallery(gallery)}
                            >
                                {(artwork.file && (
                                    <Img fluid={artwork.file.childImageSharp.fluid}/>
                                )) || (
                                    <img src={artwork.image} alt={artwork.title}/>
                                )}
                                <h6>{gallery.name}</h6>
                            </div>
                        ))[0])}
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

function scrollThumbs(isScrollingLeft) {
    const galleryThumbs = document.getElementById('galleryThumbs')
    galleryThumbs.scrollTo({
        top: 0,
        left: galleryThumbs.scrollLeft + (isScrollingLeft ? -100 : 100),
        behavior: 'smooth',
    })
        // galleryThumbs.scrollLeft + (isScrollingLeft ? -100 : 100), 0)
}