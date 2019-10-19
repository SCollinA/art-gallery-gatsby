import Img from "gatsby-image";
import React from "react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import LayoutContext from '../contexts/LayoutContext'

export default ({ galleries, selectGallery, selectedGallery }: any) => {
    const randomGalleryImages = galleries.map((gallery: any) => {
        // const randomIndex = Math.floor(Math.random() * gallery.artworks.length)
        return gallery.artworks[0];
    });
    return (
        <div className="GalleryChoice">
            {/* <div className='galleryArrow' onClick={() => scrollThumbs(true)}>
                <FontAwesomeIcon size='4x' icon={['fas', 'angle-left']}/>
            </div> */}
            {/* <h1 className='galleryArrow'>{'<'}</h1> */}
            {/* <LayoutContext.Consumer>
                {({ artworks }) => ( */}
                <h3>collections</h3>
                    <div id="galleryThumbs">
                        {/* map galleries to their first artwork image */}
                        {galleries.map((gallery: any, index: any) => {
                            const randomArtwork = randomGalleryImages[index] ||
                                { file: false, image: false };
                            return !gallery.artworks.length || (
                                <div key={index}
                                    className={`galleryThumb${gallery.id === selectedGallery.id ? " selectedGallery" : ""}`}
                                    onClick={() => selectGallery(gallery)}
                                >
                                    {(
                                    randomArtwork.image && (
                                        <img src={`data:image/jpeg;base64,${randomArtwork.image}`} alt={randomArtwork.title}/>
                                    )) || (randomArtwork.file && (
                                        <Img fluid={randomArtwork.file.childImageSharp.fluid}/>
                                        ))}
                                    <p>{gallery.name}</p>
                                </div>
                            );
                        })}
                    </div>
                {/* )} */}
            {/* </LayoutContext.Consumer> */}
            {/* <h1 className='galleryArrow'>{'>'}</h1> */}
            {/* <div className='galleryArrow' onClick={() => scrollThumbs(false)}>
                <FontAwesomeIcon size='4x' icon={['fas', 'angle-right']}/>
            </div> */}
        </div>
    );
};

// function scrollThumbs(isScrollingLeft) {
//     const galleryThumbs = document.getElementById('galleryThumbs')
//     galleryThumbs.scrollTo({
//         top: 0,
//         left: galleryThumbs.scrollLeft + (isScrollingLeft ? -100 : 100),
//         behavior: 'smooth',
//     })
//         // galleryThumbs.scrollLeft + (isScrollingLeft ? -100 : 100), 0)
// }
