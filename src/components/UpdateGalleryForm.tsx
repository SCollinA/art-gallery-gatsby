import gql from "graphql-tag";
import React from "react";
import { Mutation } from "react-apollo";

import AdminContext from "../contexts/adminContext";
import { DB_CONTENT } from "../graphql/graphql";

import { GALLERY_ARTWORKS, GET_GALLERY } from "./AdminArtworks";
import { ALL_GALLERIES } from "./AdminGalleries";
import Loading from "./Loading";

export default () => {
	return (
		<AdminContext.Consumer>
			{({ updatingGallery, changeGallery, submitGallery, resetGallery, removeGallery, cancelUpdate }: any) => (
				<Mutation mutation={UPDATE_GALLERY}
					refetchQueries={[{
						query: GALLERY_ARTWORKS,
						variables: { galleryId: updatingGallery.id },
					},
					{
						query: GET_GALLERY,
						variables: { id: updatingGallery.id },
					}]}
				>
					{(updateGallery: any, { loading }: any) => (
						<>
						{loading && <Loading/>}
						<form id="UpdateGalleryForm"
							onSubmit={(event) => {
								event.preventDefault();
								submitGallery();
								updateGallery({variables: {
									id: updatingGallery.id,
									input: updatingGallery,
								}});
							}}
							onReset={() => resetGallery()}
							onClick={(event) => event.stopPropagation()}
						>
							<input autoFocus type="text" name="name"
								value={updatingGallery.name}
								onChange={(event) => changeGallery({
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
								<Mutation mutation={DELETE_GALLERY}
									update={(cache: any) => {
										const { galleries, artworks } = cache.readQuery({ query: DB_CONTENT });
										cache.writeQuery({
											data: {
												artworks,
												galleries: galleries.filter((gallery: any) =>
													gallery.id !== updatingGallery.id),
											},
											query: DB_CONTENT,
										});
									}}
									refetchQueries={[{
										query: ALL_GALLERIES,
									}]}
								>
								{(deleteGallery: any) => (
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
								)}
								</Mutation>
							</div>
						</form>
						</>
					)}
				</Mutation>
			)}
		</AdminContext.Consumer>
	);
};

const UPDATE_GALLERY = gql`
	mutation UpdateGallery($id: ID!, $input: GalleryInput!) {
		updateGallery(id: $id, input: $input) {
			id
			name
		}
	}
`;

const DELETE_GALLERY = gql`
	mutation DeleteGallery($id: ID!) {
		deleteGallery(id: $id)
	}
`;