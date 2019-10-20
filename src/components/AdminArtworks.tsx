import Img from "gatsby-image";
import gql from "graphql-tag";
import React from "react";
import { Query } from "react-apollo";

import AdminContext from "../contexts/adminContext";

import AddArtworks from "./AddArtworks";
import ArtworkImage from "./ArtworkImage";

export default () => (
	<AdminContext.Consumer>
		{({ selectedGallery, selectArtwork, updatingArtwork }: any) => (
			<div className="AdminArtworks">
				<h1>artworks</h1>
				<Query query={GALLERY_ARTWORKS}
					variables={{
						galleryId: selectedGallery.id || null,
					}}
				>
					{({ data }: any) => (
						<div className="currentArtworks">
							{(!!data && data.getArtworks) &&
								data.getArtworks.map((artwork: any) => (
									<div className="currentArtwork" key={artwork.id}
										onClick={(event) => {
											event.stopPropagation();
											selectArtwork({
												framed: artwork.framed,
												galleryId: artwork.galleryId,
												height: artwork.height,
												id: artwork.id,
												image: artwork.image,
												medium: artwork.medium,
												price: artwork.price,
												sold: artwork.sold,
												title: artwork.title,
												width: artwork.width,
											});
									}}
									>
										{/* artwork title */}
										<h3>
											{updatingArtwork.id === artwork.id ?
											updatingArtwork.title :
											artwork.title}
										</h3>
										{/* artwork gallery name */}
										{((updatingArtwork.id === artwork.id &&
											updatingArtwork.galleryId) ||
										(updatingArtwork.id !== artwork.id &&
											artwork.galleryId)) && (
											<Query query={GET_GALLERY}
												variables={{
													id: updatingArtwork.id === artwork.id ?
													updatingArtwork.galleryId :
													artwork.galleryId,
												}}
											>
												{({ data: { getGallery } }: any) => (
													<h5>
														{getGallery ? getGallery.name : ""}
													</h5>
												)}
											</Query>
										)}
										{/* artwork image */}
										<ArtworkImage artwork={artwork}/>
										<h5>
											{`$${updatingArtwork.id === artwork.id ?
												updatingArtwork.price :
												artwork.price}`}
										</h5>
										<h5>
											{`${(updatingArtwork.id === artwork.id ?
												updatingArtwork.sold :
												artwork.sold) ?
													"sold" :
													"unsold"
												}
											`}
										</h5>
									</div>
								))
							}
							<AddArtworks/>
						</div>
					)}
				</Query>
			</div>
		)}
	</AdminContext.Consumer>
);

export const GALLERY_ARTWORKS = gql`
	query GetArtworksForGallery($galleryId: ID) {
		getArtworks(input: { galleryId: $galleryId }) {
			id
			galleryId
			title
			width
			height
			medium
			image
			price
			sold
			framed
		}
	}
`;

export const GET_GALLERY = gql`
	query GetGallery($id: ID!) {
		getGallery(id: $id) {
			name
		}
	}
`;
