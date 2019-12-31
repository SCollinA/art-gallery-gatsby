import React from "react";

import LayoutContext from "../contexts/LayoutContext";
import UpdateFormWrapper from "./gallery/update/UpdateFormWrapper";

import ArtworkChoice from "./gallery/retrieve/ArtworkChoice";
import GalleryChoice from "./gallery/retrieve/GalleryChoice";
import GalleryMain from "./gallery/retrieve/GalleryMain";
import GalleryNavigator from "./gallery/retrieve/GalleryNavigator";

export default () =>
	<LayoutContext.Consumer>
		{({selectedArtwork, selectedGallery}: any) =>
			<div className="Gallery">
				<GalleryNavigator></GalleryNavigator>
				<UpdateFormWrapper></UpdateFormWrapper>
				<div className="gallerySelection">
					{!selectedGallery &&
						<GalleryChoice/>}
					{!!selectedGallery && !selectedArtwork &&
						<ArtworkChoice/>}
					{!!selectedGallery && !!selectedArtwork &&
						<GalleryMain/>}
				</div>
			</div>
		}
	</LayoutContext.Consumer>;
