import React from "react";

import adminContext from "../contexts/adminContext";

import UpdateArtworkForm from "./UpdateArtworkForm";
import UpdateGalleryForm from "./UpdateGalleryForm";

export default () => (
	<adminContext.Consumer>
		{({ updatingArtwork, updatingGallery, cancelUpdate }: any) =>
			(updatingGallery.id || updatingArtwork.id) &&
				<div className="updateForm"
					onClick={cancelUpdate}
				>
					{((updatingGallery.id &&
						<UpdateGalleryForm/>) ||
						(updatingArtwork.id &&
							<UpdateArtworkForm/>))}
				</div>
		}
	</adminContext.Consumer>
);
