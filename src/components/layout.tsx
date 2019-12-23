import { graphql, StaticQuery } from "gatsby";
import { filter, get } from "lodash/fp";
import React from "react";
import {
	Query,
} from "react-apollo";

import LayoutContext from "../contexts/LayoutContext";
import {
	DB_CONTENT,
} from "../graphql/graphql";

import Admin from "./Admin";
import Footer from "./Footer";
import FullStoryHelmet from "./FullStoryHelmet";
import GalleryHeader from "./header";
import "./layout.css";
import Loading from "./Loading";

export default class Layout extends React.Component<any, any, any> {

	private galleryMainRef = React.createRef<any>();
	private artworkChoiceRef = React.createRef<any>();

	constructor(props: any) {
		super(props);
		this.state = {
			artworkChoiceRef: this.artworkChoiceRef,
			galleryMainRef: this.galleryMainRef,
			selectArtwork: this.selectArtwork,
			selectGallery: this.selectGallery,
			selectedArtwork: undefined,
			selectedGallery: undefined,
		};
	}

	public render() {
		const { children } = this.props;
		return (
		<div className="Layout">
			<FullStoryHelmet/>
			<GalleryHeader/>
			<Query query={DB_CONTENT}>
				{({ data: { galleries = [], artworks = [] } = { galleries: [], artworks: [] }, loading }: any) => (
					<StaticQuery query={ARTWORK_FILES}
						render={({ artworkFileData }: any) => {
							const galleriesWithArtworks = this.getGalleries(artworks, artworkFileData, galleries);
							const context = {
								...this.state,
								artworksWithoutGallery: filter(
									({ galleryId }: any) => !galleryId,
									artworks,
								),
								galleries: galleriesWithArtworks,
							};
							return (
								<LayoutContext.Provider value={context}>
									<Admin>
										<Loading loading={loading}>
											{children}
											<Footer/>
										</Loading>
									</Admin>
								</LayoutContext.Provider>
							);
						}}
					/>
				)}
			</Query>
		</div>
		);
	}

	private selectArtwork = (selectedArtwork: any) =>
		get("id", selectedArtwork) === get("id", this.state.selectedArtwork) ?
			this.setState({
				selectedArtwork: undefined,
			}) :
			this.setState({
				selectedArtwork,
			}, () => {
				const galleryMain = this.galleryMainRef.current;
				galleryMain.scrollIntoView({
					behavior: "smooth",
					block: "start",
				});
			})

	private selectGallery = (selectedGallery: any) =>
		get("id", selectedGallery) === get("id", this.state.selectedGallery) ?
			this.setState({
				selectedGallery: undefined,
			}) :
			this.setState({
				selectedGallery,
			}, () => {
				const artworkChoice = this.artworkChoiceRef.current;
				artworkChoice.scrollIntoView({
					behavior: "smooth",
					block: "start",
				});
			})

	private getGalleries = (
		artworks: any[],
		artworkFileData: any[],
		galleries: any[],
	) => {
		const artworkFiles = this.getArtworkFiles(artworkFileData);
		const galleriesWithFiles = this.matchGalleryArtworkToFile(galleries, artworks, artworkFiles);
		return galleriesWithFiles;
	}


	private matchGalleryArtworkToFile = (galleries: any[], artworks: any[], artworkFiles: any[]) => {
		return galleries.map((gallery: any) => {
			// match up artworks from db to gallery
			let galleryArtworks = artworks.filter((artwork: any) =>
				artwork.galleryId === gallery.id);
			// map those to files for display throughout site
			galleryArtworks = galleryArtworks.map(({
					id,
					title,
					...remainingArtwork
				}: any) => {
					// if an artwork file exist add it
					// will check if file is there to determine proper element for image
					const file = artworkFiles.find((artworkFile: any) => artworkFile.name === `${id}-${title}`);
					const galleryArtwork = {
						file,
						id,
						title,
						...remainingArtwork,
					};
					return galleryArtwork;
				});
			const galleryWithArtworks = {
				artworks: galleryArtworks,
				...gallery,
			};
			return galleryWithArtworks;
		});
	}

	private getArtworkFiles = (artworkFiles: any) =>
		artworkFiles.edges.map((edge: any) => edge.node)
}

const ARTWORK_FILES = graphql`
  {
    artworkFileData: allFile(filter: {
        relativeDirectory: { eq: "artworks" },
        extension: { eq: "jpeg" }
    }) {
      edges {
        node {
          name
          ...fluidImage
        }
      }
    }
  }
`;
