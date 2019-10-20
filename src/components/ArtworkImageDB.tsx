import { get } from "lodash/fp";
import React from "react";
import { Query } from "react-apollo";

import { ARTWORK_IMAGE } from "../graphql/graphql";

export default ({ artwork, artworkRef, windowHeight }: any) => (
	<Query query={ARTWORK_IMAGE} variables={artwork}>
		{({ data }: any) => (
			<img ref={artworkRef}
			// display initially none to load actual size
			// in order to find aspect ratio and adjust size
				style={{ display: "none", margin: "auto" }}
				src={`data:image/jepg;base64,${get(["getArtworkImage", "image"], data) || ""}`}
				alt={`${artwork.title}`}
				onLoad={() => {
					if (!!artworkRef) {
						const dbImage: any = artworkRef.current;
						dbImage.style.maxWidth = dbImage.width / dbImage.height <= 1 ?
							`${(windowHeight * .75) * (dbImage.width / dbImage.height)}px` :
							"100%";
						dbImage.style.display = "inherit";
					}
				}}
			/>
		)}
	</Query>
);
