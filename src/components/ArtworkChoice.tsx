import { get } from "lodash/fp";
import React from "react";

import AdminContext from "../contexts/adminContext";
import LayoutContext from "../contexts/layoutContext";

import AddArtworks from "./AddArtworks";
import ArtworkImage from "./ArtworkImage";
import SectionWrapper from "./SectionWrapper";

export default () =>
	<LayoutContext.Consumer>
		{({artworkChoiceRef, selectArtwork, selectedArtwork, selectedGallery}: any) => {
			const artworks = get("artworks", selectedGallery) || [];
			return (
				<AdminContext.Consumer>
					{({ isLoggedIn }: any) => (
						<div className="ArtworkChoice" ref={artworkChoiceRef}>
							<div className="artworksTitle">
								{selectedGallery ?
									<h3>{selectedGallery.name}</h3> :
									<h3>select a gallery</h3>}
								<h3>artworks</h3>
							</div>
							<SectionWrapper>
								<div id="artworkThumbs">
									{artworks.map((artwork: any, index: any) => (
										<div key={index}
											className={`artworkThumb${(selectedArtwork && artwork.id === selectedArtwork.id) ? " selectedArtwork" : ""} clickable`}
											onClick={() => selectArtwork(artwork)}
										>
											<ArtworkImage artwork={artwork}/>
											<p>{artwork.title}</p>
										</div>
									))}
									{isLoggedIn &&
										<AddArtworks/>}
								</div>
							</SectionWrapper>
						</div>
					)}
				</AdminContext.Consumer>
			);
		}}
	</LayoutContext.Consumer>;
