import { get } from "lodash/fp";
import React from "react";
import { Query } from "react-apollo";

import { ARTWORK_IMAGE } from "../graphql/graphql";
import Loading from "./Loading";

export default ({ artwork, imageRef, aspectRatio }: any) => (
	<Query query={ARTWORK_IMAGE} variables={artwork} fetchPolicy={"cache-first"}>
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
							dbImage.style.maxWidth = dbImage.width / dbImage.height <= 1 ?
								`${(dbImage.width / dbImage.height) * 100 / aspectRatio}%` :
								"100%";
						}
						dbImage.style.display = "inherit";
					}}
				/>
			</Loading>
		}
	</Query>
);
