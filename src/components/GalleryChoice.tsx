import React from "react";

import AdminContext from "../contexts/adminContext";
import LayoutContext from "../contexts/layoutContext";

import AddGalleries from "./AddGalleries";
import ArtworkImage from "./ArtworkImage";
import SectionWrapper from "./SectionWrapper";

export default () => (
	<div className="GalleryChoice">
		<h3>collections</h3>
		<SectionWrapper>
			<LayoutContext.Consumer>
				{({ galleries, selectGallery, selectedGallery }: any) =>
					<AdminContext.Consumer>
						{({ isLoggedIn }: any) =>
							<div id="galleryThumbs">
								{/* map galleries a random artwork image */}
								{galleries.map((gallery: any, index: any) => {
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

// function scrollThumbs(isScrollingLeft) {
//     const galleryThumbs = document.getElementById('galleryThumbs')
//     galleryThumbs.scrollTo({
//         top: 0,
//         left: galleryThumbs.scrollLeft + (isScrollingLeft ? -100 : 100),
//         behavior: 'smooth',
//     })
//         // galleryThumbs.scrollLeft + (isScrollingLeft ? -100 : 100), 0)
// }
