import { faChevronLeft, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";

import AdminContext from "../../../contexts/AdminContext";
import LayoutContext from "../../../contexts/LayoutContext";


export default () => {
	const {
		selectArtwork,
		selectedArtwork,
		selectGallery,
		selectedGallery,
	}: any = useContext(LayoutContext);
	const {
		isLoggedIn,
		editArtwork,
		editGallery,
	}: any = useContext(AdminContext);
	return (
		<div className="GalleryNavigator">
			<div className="galleryLocation">
				<div className="galleryLocationSpecific">
					{!!selectedGallery &&
						<FontAwesomeIcon className="galleryNavIcon clickable"
							icon={faChevronLeft} size="2x"
							onClick={() => selectGallery()}
						/>}
					{!!selectedGallery ?
						<h3>{selectedGallery.name}</h3> :
						(!selectedArtwork && <h3>collections</h3>)}
					{!!isLoggedIn && !!selectedGallery &&
						<FontAwesomeIcon className="galleryEditIcon clickable"
							icon={faEdit} size="2x"
							onClick={() => editGallery()}
						/>}
				</div>
				<div className="galleryLocationSpecific">
					{!!selectedArtwork &&
						<FontAwesomeIcon className="artworkNavIcon clickable"
							icon={faChevronLeft} size="2x"
							onClick={() => selectArtwork()}
						/>}
					{!!selectedArtwork ?
						<h2>{selectedArtwork.title}</h2> :
						(!!selectedGallery && <h2>artworks</h2>)}
					{!!isLoggedIn && !!selectedArtwork &&
						<FontAwesomeIcon className="artworkEditIcon clickable"
							icon={faEdit} size="2x"
							onClick={() => editArtwork()}
						/>}
				</div>
			</div>
		</div>
	);
};
