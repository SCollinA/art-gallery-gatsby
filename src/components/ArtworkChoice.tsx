import { get } from "lodash/fp";
import React from "react";

import AdminContext from "../contexts/AdminContext";
import LayoutContext from "../contexts/LayoutContext";

import AddArtworks from "./AddArtworks";
import ArtworkImage from "./ArtworkImage";
import GalleryNavigator from "./GalleryNavigator";
import SectionWrapper from "./SectionWrapper";

export default () =>
	<LayoutContext.Consumer>
		{({ artworkChoiceRef, artworksWithoutGallery, selectArtwork, selectedArtwork, selectedGallery }: any) => {
			const artworks = get("artworks", selectedGallery) || [];
			return (
				<AdminContext.Consumer>
					{({ isLoggedIn }: any) => (
						<div className="ArtworkChoice" ref={artworkChoiceRef}>
							<SectionWrapper>
								<div id="artworkThumbs">
									{artworks.filter((artwork: any) =>
											isLoggedIn || artwork.image || artwork.file)
										.map((artwork: any, index: any) =>
											<ArtworkThumb key={index}
												artwork={artwork}
												selectArtwork={selectArtwork}
												selectedArtwork={selectedArtwork}
											></ArtworkThumb>,
									)}
									{isLoggedIn &&
										artworksWithoutGallery.map((artwork: any, index: any) =>
											<ArtworkThumb key={index}
												artwork={artwork}
												selectArtwork={selectArtwork}
												selectedArtwork={selectedArtwork}
											></ArtworkThumb>,
									)}
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

const ArtworkThumb = ({ artwork, selectArtwork, selectedArtwork }: any) =>
	<div // tslint:disable-next-line: max-line-length
		className={`artworkThumb${(selectedArtwork && artwork.id === selectedArtwork.id) ? " selectedArtwork" : ""} clickable`}
		onClick={() => selectArtwork(artwork)}
	>
		<ArtworkImage artwork={artwork}/>
		<p>{artwork.title}</p>
	</div>;
