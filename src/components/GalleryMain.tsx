import Img from 'gatsby-image'
import React from 'react'
import LayoutContext from '../contexts/layoutContext'

export default ({ galleryMainRef, selectedGallery, selectedArtwork, windowHeight }: any) => {
    return (
    <div className="GalleryMain" ref={galleryMainRef}>
        <LayoutContext.Consumer>
            {({ galleries }: any) => {
                // const artworkRef = React.createRef()
                return selectedArtwork && (
                    <div className="selectedGallery">
                        <div className="galleryTitle">
                            <h2>{selectedGallery.name}</h2>
                            <h1>{selectedArtwork.title}</h1>
                        </div>
                        <div className="galleryImage">
                            {galleries.map(({ artworks }: any) => artworks.map((artwork: any, index: any) => {
                                const artworkRef = React.createRef<any>();
                                // console.log('gallery artwork', artwork)
                                return (
                                <div key={index}
                                    className={`galleryArtwork${selectedArtwork.id === artwork.id ? " current" : " hidden"}`}
                                >
                                    {(artwork.image && (
                                        <img ref={artworkRef}
                                        // display initially none to load actual size
                                        // in order to find aspect ratio and adjust size
                                            style={{ display: "none", margin: "auto" }}
                                            src={`data:image/jepg;base64,${artwork.image}`}
                                            alt={`${artwork.title}`}
                                            onLoad={() => {
                                                const dbImage: any = artworkRef.current;
                                                dbImage.style.maxWidth = dbImage.width / dbImage.height <= 1 ?
                                                    `${(windowHeight * .75) * (dbImage.width / dbImage.height)}px` :
                                                    "100%"
                                                dbImage.style.display = "inherit"
                                            }}
                                        />
                                    )) || (artwork.file && (
                                        <Img className="galleryGatsbyImage"
                                            style={{
                                                maxWidth: artwork.file.childImageSharp.fluid.aspectRatio <= 2 ?
                                                    `${(windowHeight * .75) * artwork.file.childImageSharp.fluid.aspectRatio}px` :
                                                    `100%`,
                                                margin: "auto",
                                            }}
                                            fluid={artwork.file.childImageSharp.fluid}
                                        />
                                    ))}
                                </div>
                            );}))}
                        </div>
                        <div className="galleryCaption">
                            {!(selectedArtwork.width && selectedArtwork.height) || <p>{`W ${selectedArtwork.width} x H ${selectedArtwork.height}`}</p>}
                            <p>{selectedArtwork.medium}</p>
                            {selectedArtwork.framed && <p>framed</p>}
                            {!selectedArtwork.price || <p>{`$${selectedArtwork.price}`}</p>}
                            {selectedArtwork.sold && <p>sold</p>}
                            {/* this one will be a caption */}
                        </div>
                    </div>
                );
            }}
        </LayoutContext.Consumer>
    </div>
);
};