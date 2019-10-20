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
		};
		if (!!props.imageRef) {
			this.imageRef = props.imageRef;
		}
	}

	public componentDidMount() {
		this.updateWindowDimensions();
		window.addEventListener("resize", this.updateWindowDimensions);
	}

	public componentWillUnmount() {
		window.removeEventListener("resize", this.updateWindowDimensions);
	}

	public updateWindowDimensions = () =>
		this.setState({ aspectRatio:  window.innerWidth / window.innerHeight })

	public render = () =>
		this.state.artwork.file && !this.state.artwork.image ?
			<ArtworkImageFile artwork={this.state.artwork}
				imageRef={this.imageRef}
				aspectRatio={this.state.aspectRatio}
			/> :
			<ArtworkImageDB artwork={this.state.artwork}
				imageRef={this.imageRef}
				aspectRatio={this.state.aspectRatio}
			/>
}
