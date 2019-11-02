import gql from "graphql-tag";
import React from "react";
import {  Mutation } from "react-apollo";

import { DB_CONTENT } from "../graphql/graphql";

import Loading from "./Loading";

export default () =>
	<Mutation mutation={ADD_GALLERY}
		update={(cache: any, { data: { addGallery } }: any) => {
			const { galleries, ...dbContent } = cache.readQuery({ query: DB_CONTENT });
			cache.writeQuery({
				data: {
					...dbContent,
					galleries: galleries.concat([addGallery]),
				},
				query: DB_CONTENT,
			});
		}}
	>
		{(addGallery: any, { loading }: any) =>
			<Loading loading={loading}>
				<div className="AddGalleries clickable"
					onClick={addGallery}
				>
					<div className="addGallery">
						<h3> + </h3>
					</div>
				</div>
			</Loading>
		}
	</Mutation>;

const ADD_GALLERY = gql`
	mutation {
		addGallery(input: { name: "new collection" }) {
			id
			name
		}
	}
`;
