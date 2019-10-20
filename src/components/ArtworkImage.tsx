import React from "react";

import ArtworkImageDB from "./ArtworkImageDB";
import ArtworkImageFile from "./ArtworkImageFile";

export default class ArtworkImage extends React.Component<any, any, any> {

	public imageRef = React.createRef<any>();

	constructor(props: any) {
		super(props);
		this.state = {
			artwork: props.artwork,
			aspectRatio: 0,
			windowHeight: 0,
			windowWidth: 0,
		};
		console.log(this.state.artwork);
	}

	public componentDidMount() {
		this.updateWindowDimensions();
		window.addEventListener("resize", this.updateWindowDimensions);
	}

	public componentWillUnmount() {
		window.removeEventListener("resize", this.updateWindowDimensions);
	}

	public updateWindowDimensions = () =>
		this.setState({ windowWidth: window.innerWidth, windowHeight: window.innerHeight })

	public render = () =>
		this.state.artwork.file ?
			<ArtworkImageFile artwork={this.state.artwork}
				imageRef={this.imageRef}
				windowHeight={this.state.windowHeight}
			/> :
			<ArtworkImageDB artwork={this.state.artwork}
				imageRef={this.imageRef}
				windowHeight={this.state.windowHeight}
			/>
}
