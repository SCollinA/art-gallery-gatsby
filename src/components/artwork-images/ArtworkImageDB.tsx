import { get, map } from "lodash/fp";
import React from "react";
import { Query } from "react-apollo";

import { client } from "../../apollo/client";
import { ARTWORK_IMAGE, DB_CONTENT } from "../../graphql/graphql";

import Loading from "../reusable/Loading";

export default ({ artwork, imageRef, aspectRatio }: any) => (
	<Query query={ARTWORK_IMAGE} variables={artwork} fetchPolicy={"cache-first"}
		onCompleted={({ getArtwork }: any) => {
			const { artworks, ...rest }: any = client.readQuery({
				query: DB_CONTENT,
			});
			const updatedArtworks = map(
				(dbArtwork) =>
					get("id", dbArtwork) === get("id", getArtwork) ?
						({ ...dbArtwork, ...getArtwork }) :
						dbArtwork,
				artworks,
			);
			client.writeQuery({
				data: {
					...rest,
					artworks: updatedArtworks,
				},
				query: DB_CONTENT,
			});
		}}
	>
		{({ data, loading }: any) =>
			<Loading loading={loading}>
				<img ref={imageRef}
				// display initially none to load actual size
				// in order to find aspect ratio and adjust size
					style={{ display: "none", margin: "auto" }}
					src={`data:image/jepg;base64,${get(["getArtwork", "image"], data) || ""}`}
					alt={`${artwork.title}`}
					onLoad={() => {
						const dbImage: any = imageRef.current;
						if (!!imageRef) {
							const imageWidthPercent = (dbImage.width / dbImage.height) * 100 / aspectRatio;
							dbImage.style.maxWidth = `${imageWidthPercent}%`;
						}
						dbImage.style.display = "inherit";
					}}
				/>
			</Loading>
		}
	</Query>
);
