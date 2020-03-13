import React, { useContext } from "react";

import AdminContext from "../../../contexts/AdminContext";
import LayoutContext from "../../../contexts/LayoutContext";

import ArtworkImage from "../../artwork-images/ArtworkImage";
import SectionWrapper from "../../reusable/SectionWrapper";

import AddGalleries from "../create/AddGalleries";
import ArtworkChoice from "./ArtworkChoice";

export default () => {
	const {
		artworksWithoutGalleries,
		galleries,
		selectGallery,
		selectedGallery,
	}: any = useContext(LayoutContext);
	const { isLoggedIn }: any = useContext(AdminContext);
	return (
		<div className="GalleryChoice">
			<SectionWrapper>
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
									<ArtworkImage artwork={randomArtwork}
										fitToScreen={true}
									/>}
								<p>{gallery.name}</p>
							</div>
						);
					})}
					{isLoggedIn &&
						<AddGalleries/>}
				</div>
			</SectionWrapper>
			{isLoggedIn &&
				<div className="orphanedArtworks">
					<h3>artworks without galleries</h3>
					<ArtworkChoice artworks={artworksWithoutGalleries}/>
				</div>}
		</div>
	);
};
