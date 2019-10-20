import Img from "gatsby-image";
import React from "react";

export default ({ artwork, imageRef, aspectRatio }: any) => (
	<Img ref={imageRef}
		style={{
			maxWidth: artwork.file.childImageSharp.fluid.aspectRatio <= 1 ?
				`${artwork.file.childImageSharp.fluid.aspectRatio * 100 / aspectRatio}%` :
				`100%`,
		}}
		fluid={artwork.file.childImageSharp.fluid}
	/>
);
