import gql from "graphql-tag";
import { get, map } from "lodash/fp";
import React from "react";
import { Mutation } from "react-apollo";

import AdminContext from "../../../contexts/AdminContext";
import LayoutContext from "../../../contexts/LayoutContext";
import { DB_CONTENT } from "../../../graphql/graphql";

import Loading from "../../reusable/Loading";

export default () =>
<AdminContext.Consumer>
	{({ editArtwork }: any) => (
		<LayoutContext.Consumer>
			{({ selectArtwork, selectGallery, selectedGallery }: any) => (
				<Mutation mutation={ADD_ARTWORK}
					variables={{
						galleryId: selectedGallery ?
							selectedGallery.id :
							null,
					}}
					update={(cache: any, { data: { addArtwork } }: any) => {
						const { artworks, galleries } = cache.readQuery({ query: DB_CONTENT });
						const updatedArtworks = [...artworks, addArtwork];
						let updatedSelectedGallery;
						cache.writeQuery({
							data: {
								artworks: updatedArtworks,
								galleries: map((gallery) => {
									if (get("id", gallery) === get("id", selectedGallery)) {
										updatedSelectedGallery = {
											...selectedGallery,
											artworks: [...selectedGallery.artworks, addArtwork],
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
						selectArtwork(addArtwork);
						editArtwork();
					}}
				>
					{(addArtwork: any, { loading }: any) => (
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
					)}
				</Mutation>
			)}
		</LayoutContext.Consumer>
	)}
</AdminContext.Consumer>;

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