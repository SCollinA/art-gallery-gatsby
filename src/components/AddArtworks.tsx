import gql from "graphql-tag";
import React from "react";
import { Mutation } from "react-apollo";

import layoutContext from "../contexts/layoutContext";
import { DB_CONTENT } from "../graphql/graphql";

import { GALLERY_ARTWORKS } from "./AdminArtworks";
import Loading from "./Loading";

export default () => {
	return (
		<layoutContext.Consumer>
			{({ selectedGallery }: any) => (
				<Mutation mutation={ADD_ARTWORK}
					variables={{
						galleryId: selectedGallery ?
							selectedGallery.id :
							null,
					}}
					update={(cache: any, { data: { addArtwork } }: any) => {
						const { galleries, artworks } = cache.readQuery({ query: DB_CONTENT });
						cache.writeQuery({
							data: { galleries, artworks: [...artworks, addArtwork] },
							query: DB_CONTENT,
						});
					}}
					refetchQueries={[{
						query: GALLERY_ARTWORKS,
						variables: {
							galleryId: null,
						},
					}]}
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
		</layoutContext.Consumer>
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
		}
	}
`;
