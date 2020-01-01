import { useQuery } from "@apollo/react-hooks";
import { graphql, useStaticQuery } from "gatsby";
import { filter } from "lodash/fp";
import React, { useState } from "react";
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

const galleryMainRef = React.createRef<any>();
const artworkChoiceRef = React.createRef<any>();

export default ({ children }: {children: any}) => {
		const [state, setState] = useState({
			selectedArtwork: undefined,
			selectedGallery: undefined,
		});
		const {
			data: {
				galleries = [],
				artworks = [],
			} = {
				artworks: [],
				galleries: [],
			},
			loading,
		}: any = useQuery(DB_CONTENT);
		const { artworkFileData }: any = useStaticQuery(ARTWORK_FILES);
		const galleriesWithArtworks = getGalleries(artworks, artworkFileData, galleries);
		const context = {
			...state,
			artworkChoiceRef,
			artworksWithoutGalleries: filter(
				({ galleryId }: any) => !galleryId,
				artworks,
			),
			galleries: galleriesWithArtworks,
			galleryMainRef,
			selectArtwork: (selectedArtwork: any) => setState({
				...state,
				selectedArtwork,
			}),
			selectGallery: (selectedGallery: any) => setState({
				...state,
				selectedArtwork: undefined,
				selectedGallery,
			}),
		};
		console.log("rendering layout");
		return (
		<>
			<FullStoryHelmet/>
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
		</>
		);
	};

const getGalleries = (
	artworks: any[],
	artworkFileData: any[],
	galleries: any[],
) => {
	const artworkFiles = getArtworkFiles(artworkFileData);
	const galleriesWithFiles = matchGalleryArtworkToFile(galleries, artworks, artworkFiles);
	return galleriesWithFiles;
};


const matchGalleryArtworkToFile = (galleries: any[], artworks: any[], artworkFiles: any[]) => {
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
};

const getArtworkFiles = (artworkFiles: any) =>
	artworkFiles.edges.map((edge: any) => edge.node);

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
