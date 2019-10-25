import { get } from "lodash/fp";
import React from "react";
import LayoutContext from "../contexts/layoutContext";
import ArtworkImage from "./ArtworkImage";
import PageBreak from "./PageBreak";

export default () => (
	<div className="Home">
		{/* random artwork */}
		<LayoutContext.Consumer>
			{({ galleries }: any) =>
				<div className="randomArtwork">
					{!!get("length", galleries) &&
						<ArtworkImage artwork={getRandomArtwork(galleries)}/>}
				</div>
			}
		</LayoutContext.Consumer>
		<PageBreak/>
		<WelcomeMessage/>
	</div>
);

const getRandomArtwork = (galleries: any) => {
	const randomGallery = galleries[Math.floor(Math.random() * galleries.length)];
	const randomArtwork = randomGallery.artworks[
		Math.floor(Math.random() * randomGallery.artworks.length)
	];
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
