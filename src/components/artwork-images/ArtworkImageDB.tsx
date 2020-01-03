import { useQuery } from "@apollo/react-hooks";
import { get, map } from "lodash/fp";
import React, { useState } from "react";

import { ARTWORK_IMAGE } from "../../graphql/graphql";
import { IArtwork } from "../../models/artwork.model";

import Loading from "../reusable/Loading";

export default ({
	artwork,
	imageRef,
	aspectRatio,
	fitToScreen,
}: {
	artwork: IArtwork,
	imageRef: any,
	aspectRatio: number,
	fitToScreen: boolean,
}) => {
	const {
		data,
		loading,
	}: any = useQuery(ARTWORK_IMAGE, {
		fetchPolicy: "cache-first",
		variables: artwork,
	});
	const [imageWidthPercent, setImageWidthPercent] = useState(0);
	return (
		<Loading loading={loading} fitChild={true} preventClick={false}>
			<img ref={imageRef} className="ArtworkImage ArtworkImageDB"
			// display initially none to load actual size
			// in order to find aspect ratio and adjust size
				style={{
					display: !!imageWidthPercent ?
						"block" : "none",
					width: fitToScreen ?
						`${imageWidthPercent}%` : "unset",
				}}
				src={`data:image/jepg;base64,${get(["getArtwork", "image"], data) || ""}`}
				alt={`${artwork.title}`}
				onLoad={() => {
					const dbImage = imageRef.current;
					if (!!dbImage) {
						const imageAspectRatio = dbImage.width / dbImage.height;
						const correctedAspectRatio = imageAspectRatio / aspectRatio;
						const newImageWidthPercent = correctedAspectRatio * 100;
						setImageWidthPercent(newImageWidthPercent);
					}
				}}
			/>
		</Loading>
	);
};
