import { get } from "lodash/fp";
import React from "react";
import ArtworkImage from "./ArtworkImage";
import SectionWrapper from "./SectionWrapper";

export default ({
	artworkChoiceRef,
	selectArtwork,
	selectedArtwork,
	selectedGallery,
}: any) => {
	const artworks = get("artworks", selectedGallery) || [];
	return (
		<div className="ArtworkChoice" ref={artworkChoiceRef}>
			<div className="artworksTitle">
				<h3>{selectedGallery.name}</h3>
				<h3>artworks</h3>
			</div>
			<SectionWrapper>
				<div id="artworkThumbs">
					{artworks.map((artwork: any, index: any) => (
						<div key={index}
							className={`artworkThumb${(selectedArtwork && artwork.id === selectedArtwork.id) ? " selectedArtwork" : ""}`}
							onClick={() => selectArtwork(artwork)}
						>
							<ArtworkImage artwork={artwork}/>
							<p>{artwork.title}</p>
						</div>
					))}
				</div>
			</SectionWrapper>
		</div>
	);
};
