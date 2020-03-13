import React, { useContext } from "react";

import LayoutContext from "../../../contexts/LayoutContext";

import ArtworkImage from "../../artwork-images/ArtworkImage";
import SectionWrapper from "../../reusable/SectionWrapper";

export default () => {
	const {
		selectedArtwork,
	}: any = useContext(LayoutContext);
	return (
		<div className="GalleryMain">
			<SectionWrapper>
				<div className="galleryImage">
					<ArtworkImage artwork={selectedArtwork}
						fitToScreen={true}
					/>
				</div>
			</SectionWrapper>
			{!!selectedArtwork &&
				<div className="galleryCaption">
					{!(selectedArtwork.width || selectedArtwork.height) ||
						<p>{`W ${selectedArtwork.width} x H ${selectedArtwork.height}`}</p>}
					<p>{selectedArtwork.medium}</p>
					{selectedArtwork.framed && <p>framed</p>}
					{!selectedArtwork.price || <p>{`$${selectedArtwork.price}`}</p>}
					{selectedArtwork.sold && <p>sold</p>}
				</div>}
		</div>
	);
};
