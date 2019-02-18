import React from 'react'
import Img from 'gatsby-image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default ({images, selectImage}) => (
    <div className='GalleryThumbs'>
        <div className='galleryArrow' onClick={() => scrollThumbs(true)}>
            <FontAwesomeIcon size='4x' icon={['fas', 'angle-left']}/>
        </div>
        {/* <h1 className='galleryArrow'>{'<'}</h1> */}
        <div id='galleryThumbs'>
            {images.map((image, index) => (
                <div key={index} className='galleryThumb'
                onClick={() => selectImage(image)}
                >
                    <Img fluid={image.image}/>
                </div>
            ))}
        </div>
        {/* <h1 className='galleryArrow'>{'>'}</h1> */}
        <div className='galleryArrow' onClick={() => scrollThumbs(false)}>
            <FontAwesomeIcon size='4x' icon={['fas', 'angle-right']}/>
        </div>
    </div>
)

function scrollThumbs(isScrollingLeft) {
    const galleryThumbs = document.getElementById('galleryThumbs')
    galleryThumbs.scrollTo(galleryThumbs.scrollLeft + (isScrollingLeft ? -100 : 100), 0)
}