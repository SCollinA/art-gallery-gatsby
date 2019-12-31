import Img from "gatsby-image";
import React from "react";

export default ({ artwork, imageRef, aspectRatio }: any) => {
	const imageWidthPercent = artwork.file.childImageSharp.fluid.aspectRatio * 100 / aspectRatio;
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
