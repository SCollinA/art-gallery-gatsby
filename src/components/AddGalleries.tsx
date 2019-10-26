import gql from "graphql-tag";
import React from "react";
import {  Mutation } from "react-apollo";

import LayoutContext from "../contexts/layoutContext";
import { DB_CONTENT } from "../graphql/graphql";

export default () =>
	<LayoutContext.Consumer>
		{({ selectGallery }: any) =>
			<Mutation mutation={ADD_GALLERY}
				update={(cache: any, { data: { addGallery } }: any) => {
					// immediately select the gallery for updating
					const { id, name } = addGallery;
					// select once to get artwork
					selectGallery({
						id,
						name,
					});
					// select again to make available for editing
					selectGallery({
						id,
						name,
					});
					const { galleries, artworks } = cache.readQuery({ query: DB_CONTENT });
					cache.writeQuery({
						data: {
							artworks,
							galleries: galleries.concat([addGallery]),
						},
						query: DB_CONTENT,
					});
				}}
			>
				{(addGallery: any, { data, loading, error }: any) =>
					<div className="AddGalleries clickable"
						onClick={addGallery}
					>
						<div className="addGallery">
							<h3> + </h3>
						</div>
					</div>
				}
			</Mutation>
		}
	</LayoutContext.Consumer>;

const ADD_GALLERY = gql`
	mutation {
		addGallery(input: { name: "new collection" }) {
			id
			name
		}
	}
`;
