import React from "react";

import AdminContext from "../../../contexts/AdminContext";
import LayoutContext from "../../../contexts/LayoutContext";

import ArtworkImage from "../../artwork-images/ArtworkImage";
import SectionWrapper from "../../reusable/SectionWrapper";

import AddGalleries from "../create/AddGalleries";

export default () => (
	<div className="GalleryChoice">
		<SectionWrapper>
			<LayoutContext.Consumer>
				{({ galleries, selectGallery, selectedGallery }: any) =>
					<AdminContext.Consumer>
						{({ isLoggedIn }: any) =>
							<div id="galleryThumbs">
								{/* map galleries a random artwork image */}
								{galleries.filter(({ artworks }: any) =>
									isLoggedIn ||
									artworks.find(({ image, file }: any) => image || file))
								.map((gallery: any, index: any) => {
									const filteredArtworks = gallery.artworks.filter(
										({ image, file }: any) => (image || file),
									);
									const randomIndex = Math.floor(Math.random() * filteredArtworks.length);
									const randomArtwork = filteredArtworks[randomIndex];
									return (
										<div key={index}
											className={`galleryThumb${
												selectedGallery &&
													gallery.id === selectedGallery.id ?
														" selectedGallery" :
														""
												} clickable`
											}
											onClick={() => selectGallery(gallery)}
										>
											{randomArtwork &&
												<ArtworkImage artwork={randomArtwork}/>}
											<p>{gallery.name}</p>
										</div>
									);
								})}
								{isLoggedIn &&
									<AddGalleries/>}
							</div>
						}
					</AdminContext.Consumer>
				}
			</LayoutContext.Consumer>
		</SectionWrapper>
	</div>
);

