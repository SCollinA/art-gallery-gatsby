import React, { useContext } from "react";

import AdminContext from "../../../contexts/AdminContext";

import UpdateArtworkForm from "./UpdateArtworkForm";
import UpdateGalleryForm from "./UpdateGalleryForm";

export default () => {
	const {
		updatingArtwork,
		updatingGallery,
		cancelUpdate,
	}: any = useContext(AdminContext);
	return (!!updatingArtwork || !!updatingGallery) ?
		<div className="updateFormWrapper"
			onClick={() => cancelUpdate()}
		>
			{!!updatingGallery &&
				<UpdateGalleryForm/>}
			{!!updatingArtwork &&
				<UpdateArtworkForm/>}
		</div> :
		null;
};
