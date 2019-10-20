import React from "react";
import ArtworkImage from "./ArtworkImage";

export default ({ artworkChoiceRef, selectedGallery, selectArtwork, selectedArtwork }: any) => (
	<div className="ArtworkChoice" ref={artworkChoiceRef}>
		<h3>artworks</h3>
		<div id="artworkThumbs">
			{selectedGallery.artworks && selectedGallery.artworks.map((artwork: any, index: any) => (
				<div key={index}
					className={`artworkThumb${(selectedArtwork && artwork.id === selectedArtwork.id) ? " selectedArtwork" : ""}`}
					onClick={() => selectArtwork(artwork)}
				>
					<ArtworkImage artwork={artwork}/>
					<p>{artwork.title}</p>
				</div>
			))}
		</div>
	</div>
);
