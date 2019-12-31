import Img from "gatsby-image";
import React from "react";

export default ({ artwork, imageRef, aspectRatio }: any) => {
	const correctedAspectRatio = artwork.file.childImageSharp.fluid.aspectRatio / aspectRatio;
	const imageWidthPercent = correctedAspectRatio * 100;
	return (
		<Img ref={imageRef} className="ArtworkImageFile"
			style={{
				margin: "auto",
				width: `${imageWidthPercent}%`,
			}}
			fluid={artwork.file.childImageSharp.fluid}
		/>
	);
};
