import React from "react";
import LayoutContext from "../contexts/layoutContext";
import ArtworkImage from "./ArtworkImage";
import SectionWrapper from "./SectionWrapper";

export default () => (
	<div className="Home">
		{/* random artwork */}
		<SectionWrapper>
			<div className="randomArtwork">
				<LayoutContext.Consumer>
					{({ galleries }: any) =>
							<ArtworkImage artwork={getRandomArtwork(galleries)}/>
						}
				</LayoutContext.Consumer>
			</div>
		</SectionWrapper>
		<SectionWrapper>
			<WelcomeMessage/>
		</SectionWrapper>
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
