import React from "react";

import LayoutContext from "../../../contexts/LayoutContext";

import ArtworkChoice from "./ArtworkChoice";
import GalleryChoice from "./GalleryChoice";
import GalleryMain from "./GalleryMain";

export default () =>
	<LayoutContext.Consumer>
		{({selectedArtwork, selectedGallery}: any) =>
			<div className="GallerySelection">
				{!selectedGallery && !selectedArtwork &&
					<GalleryChoice/>}
				{!!selectedGallery && !selectedArtwork &&
					<ArtworkChoice/>}
				{!!selectedArtwork &&
					<GalleryMain/>}
			</div>
		}
	</LayoutContext.Consumer>;
