import React from "react";

import LayoutContext from "../contexts/layoutContext";

import ArtworkImage from "./ArtworkImage";

export default ({ galleryMainRef, selectedGallery, selectedArtwork }: any) => {
	return (
	<div className="GalleryMain" ref={galleryMainRef}>
		<LayoutContext.Consumer>
			{({ galleries }: any) => (
				<div className="selectedGallery">
					<div className="galleryTitle">
						<h2>{selectedGallery.name}</h2>
						<h1>{selectedArtwork.title}</h1>
					</div>
					<div className="galleryImage">
						{galleries.map(({ artworks }: any) =>
							artworks.map((artwork: any, index: any) =>
								<div key={index}
									className={`galleryArtwork${selectedArtwork.id === artwork.id ? " current" : " hidden"}`}
								>
									<ArtworkImage artwork={artwork}/>
								</div>,
						))}
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
			)}
		</LayoutContext.Consumer>
	</div>
);
};
