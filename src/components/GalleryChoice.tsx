import React from "react";
import ArtworkImage from "./ArtworkImage";
import SectionWrapper from "./SectionWrapper";

export default ({ galleries, selectGallery, selectedGallery }: any) => {
	const randomGalleryImages = galleries.map((gallery: any) => {
		const randomIndex = Math.floor(Math.random() * gallery.artworks.length);
		return gallery.artworks[randomIndex];
	});
	return (
		<div className="GalleryChoice">
			<h3>collections</h3>
			<SectionWrapper>
				<div id="galleryThumbs">
					{/* map galleries to their first artwork image */}
					{galleries.map((gallery: any, index: any) => {
						const randomArtwork = randomGalleryImages[index] ||
							{ file: false, image: false };
						return !gallery.artworks.length || (
							<div key={index}
								className={`galleryThumb${gallery.id === selectedGallery.id ? " selectedGallery" : ""}`}
								onClick={() => selectGallery(gallery)}
							>
								<ArtworkImage artwork={randomArtwork}/>
								<p>{gallery.name}</p>
							</div>
						);
					})}
				</div>
			</SectionWrapper>
		</div>
	);
};

// function scrollThumbs(isScrollingLeft) {
//     const galleryThumbs = document.getElementById('galleryThumbs')
//     galleryThumbs.scrollTo({
//         top: 0,
//         left: galleryThumbs.scrollLeft + (isScrollingLeft ? -100 : 100),
//         behavior: 'smooth',
//     })
//         // galleryThumbs.scrollLeft + (isScrollingLeft ? -100 : 100), 0)
// }
