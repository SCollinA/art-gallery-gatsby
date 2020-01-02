import { useMutation } from "@apollo/react-hooks";
import React, { useContext } from "react";

import AdminContext from "../../../contexts/AdminContext";
import LayoutContext from "../../../contexts/LayoutContext";
import { ADD_GALLERY } from "../../../graphql/graphql";

import Loading from "../../reusable/Loading";

export default () => {
	const {
		editGallery,
	}: any = useContext(AdminContext);
	const {
		selectGallery,
	}: any = useContext(LayoutContext);
	const [addGallery, { loading }] = useMutation(ADD_GALLERY, {
		onCompleted({ addGallery: addedGallery }: any) {
			selectGallery(addedGallery);
			editGallery();
		},
	});
	return (
		<Loading loading={loading}>
			<div className="AddGalleries clickable"
				onClick={() => addGallery()}
			>
				<div className="addGallery">
					<h3> + </h3>
				</div>
			</div>
		</Loading>
	);
};
