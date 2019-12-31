import React from "react";

import LayoutContext from "../contexts/LayoutContext";

import ArtworkChoice from "./ArtworkChoice";
import GalleryChoice from "./GalleryChoice";
import GalleryMain from "./GalleryMain";

export default () =>
	<LayoutContext.Consumer>
		{({ selectArtwork, selectedArtwork, selectGallery, selectedGallery }: any) =>
			<div className="GalleryNavigator">
				{!!selectedGallery &&
					<h3 onClick={() => selectGallery()}>{`<`}</h3>}
				{!!selectedGallery ?
					<h3>{selectedGallery.name}</h3> :
					<h3>select gallery</h3>}
				{!!selectedArtwork &&
					<h2 onClick={() => selectArtwork()}>{`<`}</h2>}
				{!!selectedGallery && (!!selectedArtwork ?
					<h2>{selectedArtwork.title}</h2> :
					<h3>select artwork</h3>)}
				{!selectedGallery &&
					<GalleryChoice/>}
				{!!selectedGallery && !selectedArtwork &&
					<ArtworkChoice/>}
				{!!selectedGallery && !!selectedArtwork &&
					<GalleryMain/>}
			</div>
		}
	</LayoutContext.Consumer>;
