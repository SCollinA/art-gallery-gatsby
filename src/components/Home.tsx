import GatsbyImage from "gatsby-image";
import React, { RefObject } from "react";
import LayoutContext from "../contexts/layoutContext";
import ArtworkImage from "./ArtworkImage";

export default class Home extends React.Component<any, any, any> {

	public image: React.RefObject<any>;

	constructor(props: any) {
		super(props);
		this.state = {
			aspectRatio: 0,
			height: 0,
			width: 0,
		};
		this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
		this.image = React.createRef();
	}

	public componentDidMount() {
		this.updateWindowDimensions();
		window.addEventListener("resize", this.updateWindowDimensions);
	}

	public componentWillUnmount() {
		window.removeEventListener("resize", this.updateWindowDimensions);
	}

	public updateWindowDimensions() {
		this.setState({ width: window.innerWidth, height: window.innerHeight });
	}

	public render() {
		return (
			<div className="Home">
				{/* random artwork */}
				<div className="randomArtwork">
					<LayoutContext.Consumer>
						{({ galleries }: any) => {
							const randomArtwork = getRandomArtwork(galleries);
							return <ArtworkImage artwork={randomArtwork}
									windowHeight={this.state.height}
									imageRef={this.image}
								/>;
						}}
					</LayoutContext.Consumer>
				</div>
				<WelcomeMessage/>
			</div>
		);
	}
}

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
