import React from 'react'
import Img from 'gatsby-image'
import LayoutContext from '../contexts/LayoutContext'

export default ({ selectedGallery, selectedArtwork }) => (
    <div className='GalleryMain'>
        <LayoutContext.Consumer>
            {({ galleries }) => {
                const visibleGallery = galleries.find(gallery => gallery.id === selectedGallery.id) || 
                    galleries[0] || { id: 'none', name: 'no galleries', artworks: [{ id: 'nada', title: 'no galleries #1'}] }
                const visibleArtwork = selectedArtwork || visibleGallery.artworks[0]
                return (
                    <>
                        <h2>{visibleGallery.name}</h2>
                        <h1>{visibleArtwork.title}</h1>
                        {galleries.map(({ artworks }) => artworks.map((artwork, index) => (
                            <div key={index} className={`galleryArtwork${visibleArtwork.title === artwork.title ? ' current' : ' hidden'}`}>
                                {(artwork.file && (
                                    <Img  
                                        // style={{
                                        //     display: `${visibleArtworkTitle === artwork.name ? 'block' : 'none'}`
                                        // }} 
                                        fluid={artwork.file.childImageSharp.fluid} 
                                    />
                                )) || (
                                artwork.image && (
                                    <img 
                                        src={`data:image/jepg;base64,${artwork.image}`} 
                                        alt={`${artwork.title}`}
                                    />
                                ))}
                            </div>
                        )))}
                        <p>stuff will go here</p>
                    </>
                )
            }}
        </LayoutContext.Consumer>
    </div>
)