import { get } from "lodash/fp";
import React from "react";
import LayoutContext from "../contexts/LayoutContext";
import ArtworkImage from "./artwork-images/ArtworkImage";
import PageBreak from "./reusable/PageBreak";

export default () => (
	<div className="Home">
		{/* random artwork */}
		<LayoutContext.Consumer>
			{({ galleries }: any) => {
				const randomArtwork = getRandomArtwork(galleries);
				return (
					<div className="randomArtwork">
						{!!randomArtwork &&
							<ArtworkImage artwork={randomArtwork}/>}
					</div>
				);
			}}
		</LayoutContext.Consumer>
		<PageBreak vertical={true}/>
		<WelcomeMessage/>
	</div>
);

const getRandomArtwork = (galleries: any) => {
	const randomGallery = galleries[Math.floor(Math.random() * galleries.length)];
	const randomArtwork = randomGallery ?
		randomGallery.artworks[
			Math.floor(Math.random() * randomGallery.artworks.length)
		] :
		undefined;
	return randomArtwork;
};

const WelcomeMessage = () => (
	<div className="welcomeMessage">
		<h4>Welcome!</h4>
		<p>
			Thank you for your interest in my art.
			I work in oil, watercolor, and pastels creating inspired work and commissions.
			Browse the gallery and let me hear from you! I'm always interested in your feedback.
		</p>
	</div>
);
