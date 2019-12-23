import gql from "graphql-tag";
import React from "react";
import { Query } from "react-apollo";
import AdminContext from "../contexts/AdminContext";
import AddGalleries from "./AddGalleries";
import Loading from "./Loading";

export default () => {
	return (
		<AdminContext.Consumer>
			{({ selectGallery, selectedGallery, updatingGallery }: any) => (
				<div className="AdminGalleries">
					<h1>collections</h1>
					<Query query={ALL_GALLERIES}>
						{({ data, loading }: any) => (
							<Loading loading={loading}>
								<div className="currentGalleries">
									{!loading &&
										data.getAllGalleries.map((gallery: any) => (
											<div className={`
													currentGallery${
														(selectedGallery && gallery.id === selectedGallery.id) ?
														" selected" :
														""
													}
												`}
												key={gallery.id}
												onClick={(event) => {
													event.stopPropagation();
													selectGallery(gallery);
												}}
											>
												<h3>
													{updatingGallery.id === gallery.id ?
														updatingGallery.name :
														gallery.name}
												</h3>
											</div>
										))
									}
									<AddGalleries/>
								</div>
							</Loading>
						)}
					</Query>
				</div>
			)}
		</AdminContext.Consumer>
	);
};

export const ALL_GALLERIES = gql`
	{
		getAllGalleries {
			id
			name
		}
	}
`;
