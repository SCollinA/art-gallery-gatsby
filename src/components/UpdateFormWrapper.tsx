import React from "react";

import AdminContext from "../contexts/AdminContext";

import UpdateArtworkForm from "./UpdateArtworkForm";
import UpdateGalleryForm from "./UpdateGalleryForm";

export default () =>
	<AdminContext.Consumer>
		{({ updatingArtwork, updatingGallery, cancelUpdate }: any) =>
			(updatingArtwork || updatingGallery) &&
				<div className="updateFormWrapper"
					onClick={cancelUpdate}
				>
					{updatingGallery &&
						<UpdateGalleryForm/>}
					{updatingArtwork &&
						<UpdateArtworkForm/>}
				</div>
		}
	</AdminContext.Consumer>;
