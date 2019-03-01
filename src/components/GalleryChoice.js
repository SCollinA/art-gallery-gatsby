import React from 'react'
import Img from 'gatsby-image'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import LayoutContext from '../contexts/LayoutContext'

export default ({ galleries, selectGallery, selectedGallery }) => {
    const randomGalleryImages = galleries.map(gallery => gallery.artworks[0])
        // Math.floor(Math.random() * gallery.artworks.length)])
    return (
        <div className='GalleryChoice'>
            {/* <div className='galleryArrow' onClick={() => scrollThumbs(true)}>
                <FontAwesomeIcon size='4x' icon={['fas', 'angle-left']}/>
            </div> */}
            {/* <h1 className='galleryArrow'>{'<'}</h1> */}
            {/* <LayoutContext.Consumer>
                {({ artworks }) => ( */}
                <h3>collections</h3>
                    <div id='galleryThumbs'>
                        {/* map galleries to their first artwork image */}
                        {galleries.map((gallery, index) => {
                            const randomArtwork = randomGalleryImages[index] || 
                                { file: false, image: false }
                            return !gallery.artworks.length || (
                                <div key={index} 
                                    className={`galleryThumb${gallery.id === selectedGallery.id ? ' selectedGallery' : ''}`}
                                    onClick={() => selectGallery(gallery)}
                                >
                                    {(randomArtwork.file && (
                                        <Img fluid={randomArtwork.file.childImageSharp.fluid}/>
                                        )) || (
                                    randomArtwork.image && (
                                        <img src={`data:image/jpeg;base64,${randomArtwork.image}`} alt={randomArtwork.title}/>
                                    ))}
                                    <p>{gallery.name}</p>
                                </div>
                            )
                        })}
                    </div>
                {/* )} */}
            {/* </LayoutContext.Consumer> */}
            {/* <h1 className='galleryArrow'>{'>'}</h1> */}
            {/* <div className='galleryArrow' onClick={() => scrollThumbs(false)}>
                <FontAwesomeIcon size='4x' icon={['fas', 'angle-right']}/>
            </div> */}
        </div>
    )
}

// function scrollThumbs(isScrollingLeft) {
//     const galleryThumbs = document.getElementById('galleryThumbs')
//     galleryThumbs.scrollTo({
//         top: 0,
//         left: galleryThumbs.scrollLeft + (isScrollingLeft ? -100 : 100),
//         behavior: 'smooth',
//     })
//         // galleryThumbs.scrollLeft + (isScrollingLeft ? -100 : 100), 0)
// }