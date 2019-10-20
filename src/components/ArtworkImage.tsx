import React from "react";

import ArtworkImageDB from "./ArtworkImageDB";
import ArtworkImageFile from "./ArtworkImageFile";

export default ({ artwork, windowHeight, imageRef }: any) =>
	artwork.file ?
		<ArtworkImageFile artwork={artwork}
			imageRef={imageRef}
			windowHeight={windowHeight}
		/> :
		<ArtworkImageDB artwork={artwork}
			artworkRef={imageRef}
			windowHeight={windowHeight}
		/>;
