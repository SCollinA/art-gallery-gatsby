import gql from "graphql-tag";
import React from "react";
import { Mutation } from "react-apollo";

import AdminContext from "../../../contexts/AdminContext";
import LayoutContext from "../../../contexts/LayoutContext";
import {
	ALL_GALLERIES,
	DB_CONTENT,
} from "../../../graphql/graphql";
import { scrubGallery } from "../../../utils/utils";

import Loading from "../../reusable/Loading";

export default () =>
		<LayoutContext.Consumer>
			{({ selectGallery, selectedGallery }: any) =>
			<AdminContext.Consumer>
				{({ cancelUpdate, updateGallery, updatingGallery, resetGallery, removeGallery, submitGallery }: any) => (
					<Mutation mutation={UPDATE_GALLERY}
						onCompleted={({ updateGallery: updatedGallery }: any) =>
							selectGallery({
								...selectedGallery,
								...updatedGallery,
							})
						}
					>
						{(updateGalleryMutation: any, { loading }: any) => (
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
							</Loading>
						)}
					</Mutation>
				)}
			</AdminContext.Consumer>
		}
	</LayoutContext.Consumer>;

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
