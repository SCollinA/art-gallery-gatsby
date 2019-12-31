import React from "react";

import LayoutContext from "../contexts/LayoutContext";

import ArtworkChoice from "./ArtworkChoice";
import GalleryChoice from "./GalleryChoice";
import GalleryMain from "./GalleryMain";

export default () =>
	<LayoutContext.Consumer>
		{({ selectArtwork, selectedArtwork, selectGallery, selectedGallery }: any) =>
			<div className="GalleryNavigator">
				<div className="galleryLocation">
					<div className="galleryLocationSpecific"
						onClick={() => selectGallery()}
					>
						{!!selectedGallery &&
							<h3>{`<`}</h3>}
						{!!selectedGallery ?
							<h3>{selectedGallery.name}</h3> :
							<h3>collections</h3>}
					</div>
					<div className="galleryLocationSpecific"
						onClick={() => selectArtwork()}
					>
						{!!selectedArtwork &&
							<h2>{`<`}</h2>}
						{!!selectedGallery && (!!selectedArtwork ?
							<h2>{selectedArtwork.title}</h2> :
							<h2>artworks</h2>)}
					</div>
				</div>
			</div>
		}
	</LayoutContext.Consumer>;
