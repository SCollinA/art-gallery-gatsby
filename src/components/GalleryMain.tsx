import React from "react";

import AdminContext from "../contexts/adminContext";
import LayoutContext from "../contexts/layoutContext";

import ArtworkImage from "./ArtworkImage";
import SectionWrapper from "./SectionWrapper";

export default () =>
	<LayoutContext.Consumer>
		{({ artworksWithoutGallery, galleries, selectedGallery, galleryMainRef, selectedArtwork  }: any) =>
			<AdminContext.Consumer>
				{({ isLoggedIn, editArtwork, editGallery }: any) =>
					<div className="GalleryMain" ref={galleryMainRef}>
						<div className="galleryTitle">
							{selectedGallery ?
								<h2 className={`${isLoggedIn && selectedGallery ? "clickable" : ""}`}
									onClick={() => isLoggedIn && editGallery(selectedGallery)}
								>
									{selectedGallery.name}
								</h2> :
								<h2>select a gallery</h2>}
							{selectedArtwork ?
								<h1 className={`${isLoggedIn && selectedGallery ? "clickable" : ""}`}
									onClick={() => editArtwork(selectedArtwork)}
								>
									{selectedArtwork.title}
								</h1> :
								<h1>select an artwork</h1>}
						</div>
						<SectionWrapper>
							<div className="galleryImage">
							{galleries.map(({ artworks }: any) =>
								artworks.map((artwork: any, index: any) =>
									<GalleryArtwork key={index}
										artwork={artwork}
										selectedArtwork={selectedArtwork}
									></GalleryArtwork>,
							))}
							{isLoggedIn &&
								artworksWithoutGallery.map((artwork: any, index: number) =>
									<GalleryArtwork key={index}
										artwork={artwork}
										selectedArtwork={selectedArtwork}
									></GalleryArtwork>,
								)}
						</div>
						</SectionWrapper>
						{selectedArtwork &&
							<div className="galleryCaption">
								{!(selectedArtwork.width || selectedArtwork.height) ||
									<p>{`W ${selectedArtwork.width} x H ${selectedArtwork.height}`}</p>}
								<p>{selectedArtwork.medium}</p>
								{selectedArtwork.framed && <p>framed</p>}
								{!selectedArtwork.price || <p>{`$${selectedArtwork.price}`}</p>}
								{selectedArtwork.sold && <p>sold</p>}
								</div>}
					</div>
				}
			</AdminContext.Consumer>
		}
	</LayoutContext.Consumer>;

const GalleryArtwork = ({ artwork, selectedArtwork }: any) =>
	<div
		className={`galleryArtwork${
				selectedArtwork &&
					selectedArtwork.id === artwork.id ?
						" current" :
						" hidden"
			}`
		}
	>
		<ArtworkImage artwork={artwork}/>
	</div>;
