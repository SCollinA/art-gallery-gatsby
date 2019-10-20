import { get, isEmpty } from "lodash/fp";
import React from "react";

import LayoutContext from "../contexts/layoutContext";

import ArtworkChoice from "./ArtworkChoice";
import GalleryChoice from "./GalleryChoice";
import GalleryMain from "./GalleryMain";

export default class Gallery extends React.Component<any, any, any> {

	public galleryMain = React.createRef<any>();
	public artworkChoice = React.createRef<any>();

	constructor(props: any) {
		super(props);
		this.state = {
			selectedArtwork: {},
			selectedGallery: {
				artworks: [],
				id: null,
			},
		};
	}

	public componentDidMount() {
		let selectedGallery;
		let selectedArtwork;
		if (isEmpty(this.state.selectedGallery) ||
			isEmpty(this.state.selectedArtwork)
		) {
			selectedGallery = get(["galleries", "0"], this.context);
			selectedArtwork = get(["artworks", "0"], selectedGallery);
			this.setState({
				selectedArtwork,
				selectedGallery,
			});
		}
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

	public selectArtwork = (selectedArtwork: any) => this.setState({
		selectedArtwork,
	}, () => {
		const galleryMain = this.galleryMain.current;
		galleryMain.scrollIntoView({
			behavior: "smooth",
			block: "start",
		});
	})

	public render() {
		return (
			<div className="Gallery">
				<GalleryChoice
					galleries={this.context.galleries}
					selectGallery={this.selectGallery}
					selectedGallery={this.state.selectedGallery}
				/>
				<GalleryMain galleryMainRef={this.galleryMain}
					selectedGallery={this.state.selectedGallery}
					selectedArtwork={this.state.selectedArtwork}
				/>
				<ArtworkChoice artworkChoiceRef={this.artworkChoice}
					artworks={this.state.selectedGallery.artworks}
					selectArtwork={this.selectArtwork}
					selectedArtwork={this.state.selectedArtwork}
				/>
			</div>
		);
	}
}

Gallery.contextType = LayoutContext;
