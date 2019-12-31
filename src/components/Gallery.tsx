import React from "react";

import LayoutContext from "../contexts/LayoutContext";

import ArtworkChoice from "./ArtworkChoice";
import GalleryChoice from "./GalleryChoice";
import GalleryMain from "./GalleryMain";
import GalleryNavigator from "./GalleryNavigator";
import UpdateFormWrapper from "./UpdateFormWrapper";

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
