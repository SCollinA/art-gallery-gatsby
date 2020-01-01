import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import React, { useContext } from "react";

import AdminContext from "../../../contexts/AdminContext";
import LayoutContext from "../../../contexts/LayoutContext";
import { DB_CONTENT } from "../../../graphql/graphql";

import Loading from "../../reusable/Loading";

export default () => {
	const {
		editGallery,
	}: any = useContext(AdminContext);
	const {
		selectGallery,
	}: any = useContext(LayoutContext);
	const [addGallery, { loading }] = useMutation(ADD_GALLERY, {
		update(cache: any, { data: { addGallery: addedGallery } }: any) {
			const { galleries, ...dbContent } = cache.readQuery({ query: DB_CONTENT });
			cache.writeQuery({
				data: {
					...dbContent,
					galleries: galleries.concat([addedGallery]),
				},
				query: DB_CONTENT,
			});
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

const ADD_GALLERY = gql`
	mutation {
		addGallery(input: { name: "new collection" }) {
			id
			name
		}
	}
`;
