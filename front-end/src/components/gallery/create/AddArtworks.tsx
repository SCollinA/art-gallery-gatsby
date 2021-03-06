import { useMutation } from "@apollo/react-hooks";
import React, { useContext } from "react";

import AdminContext from "../../../contexts/AdminContext";
import LayoutContext from "../../../contexts/LayoutContext";
import { ADD_ARTWORK, ALL_ARTWORKS } from "../../../graphql/graphql";

import Loading from "../../reusable/Loading";

export default () => {
	const {
		selectArtwork,
		selectedGallery,
	}: any = useContext(LayoutContext);
	const {
		editArtwork,
	}: any = useContext(AdminContext);
	const [addArtwork, { loading }] = useMutation(ADD_ARTWORK, {
		onCompleted({ addArtwork: addedArtwork }: any) {
			selectArtwork(addedArtwork);
			editArtwork(addedArtwork);
		},
		refetchQueries: [{
			query: ALL_ARTWORKS,
		}],
		variables: {
			galleryId: selectedGallery ?
				selectedGallery.id :
				null,
		},
	});
	return (
		<Loading loading={loading}>
			<div className="AddArtworks clickable"
				onClick={(event) => {
					event.stopPropagation();
					addArtwork();
				}}
			>
				<div className="addArtwork">
					<h3> + </h3>
				</div>
			</div>
		</Loading>
	);
};
