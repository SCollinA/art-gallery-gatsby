import { useMutation } from "@apollo/react-hooks";
import React, { useContext } from "react";

import AdminContext from "../../../contexts/AdminContext";
import {
	DELETE_GALLERY,
	UPDATE_GALLERY,
} from "../../../graphql/graphql";
import { scrubGallery } from "../../../utils/utils";

import Loading from "../../reusable/Loading";

export default () => {
	const {
		cancelUpdate,
		updateGallery,
		updatingGallery,
		resetGallery,
		removeGallery,
		submitGallery,
	}: any = useContext(AdminContext);
	const [updateGalleryMutation, { loading }] = useMutation(UPDATE_GALLERY);
	const [deleteGallery] = useMutation(DELETE_GALLERY);
	return (
		<Loading loading={loading}>
			<form id="UpdateGalleryForm"
				onSubmit={(event) => {
					event.preventDefault();
					updateGalleryMutation({variables: {
						id: updatingGallery.id,
						input: scrubGallery(updatingGallery),
					}});
					submitGallery();
				}}
				onReset={() => resetGallery()}
				onClick={(event) => event.stopPropagation()}
			>
				<input autoFocus type="text" name="name"
					value={updatingGallery.name}
					onChange={(event) => updateGallery({
						...updatingGallery,
						name: event.target.value,
					})}
				/>
				<div className="updateGalleryButtons">
					<input type="submit" value="submit"/>
					<input type="reset" value="reset"/>
					<input type="button" value="cancel"
						onClick={() => cancelUpdate()}
					/>
					<input type="button" value="remove"
						onClick={() => {
							window.confirm("are you sure you want to remove this gallery?");
							deleteGallery({
								variables: {
									id: updatingGallery.id,
								},
							})
							.then(() => removeGallery());
						}}
					/>
				</div>
			</form>
		</Loading>
	);
};
