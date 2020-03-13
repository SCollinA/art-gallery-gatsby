import { get } from "lodash/fp";
import React, { useContext } from "react";

import LayoutContext from "../../../contexts/LayoutContext";

import ArtworkChoice from "./ArtworkChoice";
import GalleryChoice from "./GalleryChoice";
import GalleryMain from "./GalleryMain";

export default () => {
	const {
		selectedArtwork,
		selectedGallery,
	}: any = useContext(LayoutContext);
	return (
		<div className="GallerySelection">
			{!selectedGallery && !selectedArtwork &&
				<GalleryChoice/>}
			{!!selectedGallery && !selectedArtwork &&
				<ArtworkChoice artworks={get("artworks", selectedGallery)}/>}
			{!!selectedArtwork &&
				<GalleryMain/>}
		</div>
	);
};
