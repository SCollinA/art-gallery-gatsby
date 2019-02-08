import React from 'react'
import Img from 'gatsby-image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default ({images, selectImage}) => (
    <div className='GalleryThumbs'>
        <div className='galleryArrow'>
            <FontAwesomeIcon size='2x' icon={['fas', 'angle-left']}/>
        </div>
        {/* <h1 className='galleryArrow'>{'<'}</h1> */}
        <div className='galleryThumbs'>
            {images.map((image, index) => (
                <div key={index} className='galleryThumb'
                onClick={() => selectImage(image)}
                >
                    <Img fluid={image.image}/>
                </div>
            ))}
        </div>
        {/* <h1 className='galleryArrow'>{'>'}</h1> */}
        <div className='galleryArrow'>
            <FontAwesomeIcon size='2x' icon={['fas', 'angle-right']}/>
        </div>
    </div>
)