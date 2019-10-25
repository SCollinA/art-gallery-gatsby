import { get } from "lodash/fp";
import React from "react";

import LayoutContext from "../contexts/layoutContext";

import ArtworkChoice from "./ArtworkChoice";
import GalleryChoice from "./GalleryChoice";
import GalleryMain from "./GalleryMain";
import PageBreak from "./PageBreak";

export default class Gallery extends React.Component<any, any, any> {

	public static contextType = LayoutContext;
	public galleryMain = React.createRef<any>();
	public artworkChoice = React.createRef<any>();

	constructor(props: any) {
		super(props);
		this.state = {
			selectedArtwork: undefined,
			selectedGallery: undefined,
		};
	}

	public componentDidMount = () => {
		this.initializeGallery();
		console.log("initializing gallery");
	}

	public componentDidUpdate = () => {
		this.initializeGallery();
		console.log("updating gallery");
	}

	public selectGallery = (selectedGallery: any) => this.setState({
		selectedArtwork: selectedGallery.artworks[0],
		selectedGallery,
	}, () => {
		const artworkChoice = this.artworkChoice.current;
		artworkChoice.scrollIntoView({
			behavior: "smooth",
			block: "start",
		});
	})

	public selectArtwork = (selectedArtwork: any) =>
		this.setState({
			selectedArtwork,
		}, () => {
			const galleryMain = this.galleryMain.current;
			galleryMain.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
		})


	public initializeGallery = () => {
		const { galleries } = this.context;
		if (get("length", galleries)) {
			this.selectGallery(galleries[0]);
		}
	}

	public render() {
		return (
			<div className="Gallery">
				{!!this.state.selectedGallery &&
					!!this.state.selectedArtwork &&
					<GalleryMain galleryMainRef={this.galleryMain}
						selectedGallery={this.state.selectedGallery}
						selectedArtwork={this.state.selectedArtwork}
					/>}
				<PageBreak/>
				{!!this.state.selectedGallery &&
					<GalleryChoice
						selectGallery={this.selectGallery}
						selectedGallery={this.state.selectedGallery}
					/>}
				{!!this.state.selectedGallery &&
					!!this.state.selectedArtwork &&
					<ArtworkChoice artworkChoiceRef={this.artworkChoice}
						selectArtwork={this.selectArtwork}
						selectedArtwork={this.state.selectedArtwork}
						selectedGallery={this.state.selectedGallery}
					/>}
			</div>
		);
	}
}

