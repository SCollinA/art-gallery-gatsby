import Img from "gatsby-image";
import React, { useState } from "react";
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
	const correctedAspectRatio = artwork.file.childImageSharp.fluid.aspectRatio / aspectRatio;
	const imageWidthPercent = correctedAspectRatio * 100;
	const [loading, setLoading] = useState(false);
	return (
		<Loading loading={loading} fitChild={true} preventClick={false}>
			<Img ref={imageRef} className="ArtworkImage ArtworkImageFile"
				onLoad={() => setLoading(false)}
				onStartLoad={() => setLoading(true)}
				style={{
					margin: "auto",
					width: `${fitToScreen ? `${imageWidthPercent}%` : "unset"}`,
				}}
				fluid={artwork.file.childImageSharp.fluid}
			/>
		</Loading>
	);
};
