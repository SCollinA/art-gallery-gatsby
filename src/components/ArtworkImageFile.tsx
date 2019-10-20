import Img from "gatsby-image";
import React from "react";

export default ({ artwork, imageRef, windowHeight }: any) => (
	<Img ref={imageRef}
		style={{
			maxWidth: artwork.file.childImageSharp.fluid.aspectRatio <= 1 ?
				`${(windowHeight * .75) * artwork.file.childImageSharp.fluid.aspectRatio}px` :
				`100%`,
		}}
		fluid={artwork.file.childImageSharp.fluid}
	/>
);
