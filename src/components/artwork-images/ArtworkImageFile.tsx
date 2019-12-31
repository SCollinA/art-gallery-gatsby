import Img from "gatsby-image";
import React from "react";

export default ({ artwork, imageRef, aspectRatio }: any) => {
	let imageWidthPercent = artwork.file.childImageSharp.fluid.aspectRatio <= 1 ?
		artwork.file.childImageSharp.fluid.aspectRatio * 100 / aspectRatio :
		75;
	imageWidthPercent = imageWidthPercent > 100 ?
		100 - imageWidthPercent : imageWidthPercent;
	return (
		<Img ref={imageRef}
			style={{
				margin: "auto",
				width: `${imageWidthPercent}%`,
			}}
			fluid={artwork.file.childImageSharp.fluid}
		/>
	);
};
