import React from "react";

import AdminContext from "../../../contexts/AdminContext";
import LayoutContext from "../../../contexts/LayoutContext";

import ArtworkImage from "../../artwork-images/ArtworkImage";
import SectionWrapper from "../../reusable/SectionWrapper";

export default () =>
	<LayoutContext.Consumer>
		{({ galleryMainRef, selectedArtwork  }: any) =>
			<div className="GalleryMain" ref={galleryMainRef}>
				<SectionWrapper>
					<div className="galleryImage">
						<ArtworkImage artwork={selectedArtwork}/>
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
		}
	</LayoutContext.Consumer>;
