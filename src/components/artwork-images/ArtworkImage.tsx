import { isEqual } from "lodash/fp";
import React from "react";

import ArtworkImageDB from "./ArtworkImageDB";
import ArtworkImageFile from "./ArtworkImageFile";
import Placeholder from "../reusable/Placeholder";

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

	public componentDidUpdate() {
		const updatedState = {...this.state};
		if (!isEqual(this.props.artwork, this.state.artwork)) {
			updatedState.artwork = this.props.artwork;
		}
		if (!isEqual(this.state, updatedState)) {
			this.setState(updatedState);
		}
	}

	public componentWillUnmount() {
		window.removeEventListener("resize", this.updateWindowDimensions);
	}

	public updateWindowDimensions = () =>
		this.setState({ aspectRatio:  window.innerWidth / window.innerHeight })

	public render = () =>
		this.state.artwork.recentlyupdatedimage || this.state.artwork.image ?
			<ArtworkImageDB artwork={this.state.artwork}
				imageRef={this.imageRef}
				aspectRatio={this.state.aspectRatio}
			/> :
			this.state.artwork.file ?
				<ArtworkImageFile artwork={this.state.artwork}
					imageRef={this.imageRef}
					aspectRatio={this.state.aspectRatio}
				/> :
				<Placeholder text="No image found"/>
}
