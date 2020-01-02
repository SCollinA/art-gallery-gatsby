import { useQuery } from "@apollo/react-hooks";
import { useStaticQuery } from "gatsby";
import { filter, find, get, isEqual } from "lodash/fp";
import React, { useEffect, useState } from "react";

import LayoutContext from "../contexts/LayoutContext";
import {
	ALL_ARTWORKS,
	ALL_GALLERIES,
	ARTWORK_FILES,
} from "../graphql/graphql";

import Admin from "./Admin";
import "./layout.css";
import Footer from "./page-elements/Footer";
import GalleryHeader from "./page-elements/header";
import Loading from "./reusable/Loading";
import FullStoryHelmet from "./utils/FullStoryHelmet";

interface ILayoutState {
	selectedArtwork: any;
	selectedGallery: any;
}

const layoutState: ILayoutState = {
	selectedArtwork: undefined,
	selectedGallery: undefined,
};

const galleryMainRef = React.createRef<any>();
const artworkChoiceRef = React.createRef<any>();

export default ({ children }: {children: any}) => {
	const [state, setState] = useState(layoutState);
	const {
		data: { getAllGalleries: galleries = [] } = { getAllGalleries: [] },
		loading: galleriesLoading,
	}: any = useQuery(ALL_GALLERIES);
	const {
		data: { getAllArtworks: artworks = [] } = { getAllArtworks: [] },
		loading: artworksLoading,
	}: any = useQuery(ALL_ARTWORKS);
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
	if (!!state.selectedArtwork) {
		const selectedArtwork = find({id: state.selectedArtwork.id}, artworks);
		if (!isEqual(state.selectedArtwork, selectedArtwork)) {
			const selectedGallery = find({id: get("galleryId", selectedArtwork)}, galleriesWithArtworks);
			setState({
				...state,
				selectedArtwork,
				selectedGallery,
			});
		}
	} else if (!!state.selectedGallery) {
		const selectedGallery = find({id: state.selectedGallery.id}, galleriesWithArtworks);
		if (!isEqual(state.selectedGallery, selectedGallery)) {
			setState({
				...state,
				selectedGallery,
			});
		}
	}
	const loading = galleriesLoading || artworksLoading;
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
