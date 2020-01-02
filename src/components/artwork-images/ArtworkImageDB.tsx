import { useQuery } from "@apollo/react-hooks";
import { get, map } from "lodash/fp";
import React from "react";

import { ARTWORK_IMAGE } from "../../graphql/graphql";

import Loading from "../reusable/Loading";

export default ({
	artwork,
	imageRef,
	aspectRatio,
	fitToScreen,
}: {
	artwork: any,
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
	return (
		<Loading loading={loading} fitChild={true} preventClick={false}>
			<img ref={imageRef} className="ArtworkImage ArtworkImageDB"
			// display initially none to load actual size
			// in order to find aspect ratio and adjust size
				style={{ display: "none", margin: "auto" }}
				src={`data:image/jepg;base64,${get(["getArtwork", "image"], data) || ""}`}
				alt={`${artwork.title}`}
				onLoad={() => {
					const dbImage: any = imageRef.current;
					if (!!imageRef) {
						const imageAspectRatio = dbImage.width / dbImage.height;
						const correctedAspectRatio = imageAspectRatio / aspectRatio;
						const imageWidthPercent = correctedAspectRatio * 100;
						dbImage.style.width = `${fitToScreen ? `${imageWidthPercent}%` : "unset"}`;
					}
					dbImage.style.display = "inherit";
				}}
			/>
		</Loading>
	);
};
