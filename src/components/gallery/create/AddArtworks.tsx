import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { get, map } from "lodash/fp";
import React, { useContext } from "react";

import AdminContext from "../../../contexts/AdminContext";
import LayoutContext from "../../../contexts/LayoutContext";
import { DB_CONTENT } from "../../../graphql/graphql";

import Loading from "../../reusable/Loading";

export default () => {
	const {
		selectArtwork,
		selectGallery,
		selectedGallery,
	}: any = useContext(LayoutContext);
	const {
		editArtwork,
	}: any = useContext(AdminContext);
	const [addArtwork, { loading }] = useMutation(
		ADD_ARTWORK,
		{
			variables: {
				galleryId: selectedGallery ?
					selectedGallery.id :
					null,
			},
			update(cache: any, { data: { addArtwork: addedArtwork } }: any) {
				const { artworks, galleries } = cache.readQuery({ query: DB_CONTENT });
				const updatedArtworks = [...artworks, addedArtwork];
				let updatedSelectedGallery;
				cache.writeQuery({
					data: {
						artworks: updatedArtworks,
						galleries: map((gallery) => {
							if (get("id", gallery) === get("id", selectedGallery)) {
								updatedSelectedGallery = {
									...selectedGallery,
									artworks: [...selectedGallery.artworks, addedArtwork],
								};
								return updatedSelectedGallery;
							} else {
								return gallery;
							}
						}, galleries),
					},
					query: DB_CONTENT,
				});
				selectGallery(updatedSelectedGallery);
				selectArtwork(addedArtwork);
				editArtwork();
			},
		},
	);
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

const ADD_ARTWORK = gql`
	mutation AddArtwork($galleryId: ID){
		addArtwork(input: { title: "new artwork", galleryId: $galleryId }) {
			id
			galleryId
			title
			width
			height
			image
			medium
			price
			sold
			framed
			recentlyupdatedimage
		}
	}
`;
