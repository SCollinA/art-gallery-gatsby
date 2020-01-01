import { get } from "lodash/fp";
import React from "react";

import AdminContext from "../../../contexts/AdminContext";
import LayoutContext from "../../../contexts/LayoutContext";

import ArtworkImage from "../../artwork-images/ArtworkImage";
import SectionWrapper from "../../reusable/SectionWrapper";

import AddArtworks from "../create/AddArtworks";

export default ({ artworks = [] }: { artworks?: any[]}) =>
	<LayoutContext.Consumer>
		{({ artworkChoiceRef, selectArtwork, selectedArtwork }: any) =>
			<AdminContext.Consumer>
				{({ isLoggedIn }: any) => (
					<div className="ArtworkChoice" ref={artworkChoiceRef}>
						<SectionWrapper>
							<div id="artworkThumbs">
								{!!artworks && artworks.filter((artwork: any) =>
										isLoggedIn || artwork.image || artwork.file)
									.map((artwork: any, index: any) =>
										<ArtworkThumb key={index}
											artwork={artwork}
											selectArtwork={selectArtwork}
											selectedArtwork={selectedArtwork}
										></ArtworkThumb>,
								)}
								{isLoggedIn &&
									<AddArtworks/>}
							</div>
						</SectionWrapper>
					</div>
				)}
			</AdminContext.Consumer>
		}
	</LayoutContext.Consumer>;

const ArtworkThumb = ({ artwork, selectArtwork, selectedArtwork }: any) =>
	<div // tslint:disable-next-line: max-line-length
		className={`artworkThumb${(selectedArtwork && artwork.id === selectedArtwork.id) ? " selectedArtwork" : ""} clickable`}
		onClick={() => selectArtwork(artwork)}
	>
		<ArtworkImage artwork={artwork}
			fitToScreen={true}
		/>
		<p>{artwork.title}</p>
	</div>;
