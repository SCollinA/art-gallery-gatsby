import { graphql, StaticQuery } from "gatsby";
import { filter } from "lodash/fp";
import React from "react";
import {
	Query,
} from "react-apollo";

import LayoutContext from "../contexts/LayoutContext";
import {
	DB_CONTENT,
} from "../graphql/graphql";

import Admin from "./Admin";
import "./layout.css";
import Footer from "./page-elements/Footer";
import GalleryHeader from "./page-elements/header";
import Loading from "./reusable/Loading";
import FullStoryHelmet from "./utils/FullStoryHelmet";

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
		<>
			<FullStoryHelmet/>
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
											<div className="Layout">
												<GalleryHeader/>
												<div className="layoutChildren">
													{children}
												</div>
												<Footer/>
											</div>
										</Loading>
									</Admin>
								</LayoutContext.Provider>
							);
						}}
					/>
				)}
			</Query>
		</>
		);
	}

	private selectArtwork = (selectedArtwork: any) =>
		this.setState({
			selectedArtwork,
		}, () => {
			if (!!selectedArtwork) {
				const galleryMain = this.galleryMainRef.current;
				galleryMain.scrollIntoView({
					behavior: "smooth",
					block: "start",
				});
			}
		})

	private selectGallery = (selectedGallery: any) =>
		this.setState({
			selectedArtwork: undefined,
			selectedGallery,
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
