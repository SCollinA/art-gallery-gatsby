import gql from "graphql-tag";
import React from "react";
import {  Mutation } from "react-apollo";

import AdminContext from "../contexts/adminContext";
import LayoutContext from "../contexts/layoutContext";
import { DB_CONTENT } from "../graphql/graphql";

import Loading from "./Loading";

export default () =>
<AdminContext.Consumer>
	{({ editGallery }: any) => (
		<LayoutContext.Consumer>
			{({ selectGallery }: any) => (
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
						selectGallery(addGallery);
						editGallery();
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
				</Mutation>
			)}
		</LayoutContext.Consumer>
	)}
</AdminContext.Consumer>;

const ADD_GALLERY = gql`
	mutation {
		addGallery(input: { name: "new collection" }) {
			id
			name
		}
	}
`;
