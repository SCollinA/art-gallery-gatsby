import { useQuery } from "@apollo/react-hooks";
import { useStaticQuery } from "gatsby";
import { filter, find, get, isEqual } from "lodash/fp";
import React, { useReducer } from "react";

import LayoutContext from "../contexts/LayoutContext";
import {
	ALL_ARTWORKS,
	ALL_GALLERIES,
	ARTWORK_FILES,
} from "../graphql/graphql";
import { IArtwork } from "../models/artwork.model";
import { IGallery } from "../models/gallery.model";

import Admin from "./Admin";
import "./layout.css";
import Footer from "./page-elements/Footer";
import GalleryHeader from "./page-elements/header";
import Loading from "./reusable/Loading";
import FullStoryHelmet from "./utils/FullStoryHelmet";

interface ILayoutState {
	selectedArtwork?: IArtwork;
	selectedGallery?: IGallery;
}
interface ILayoutAction extends Partial<ILayoutState> {
	type: ELayoutActionType;
}
interface ILayoutContext extends ILayoutState {
	artworksWithoutGalleries: IArtwork[];
	galleries: IGallery[];
	selectArtwork: (artwork: IArtwork) => void;
	selectGallery: (gallery: IGallery) => void;
}
enum ELayoutActionType {
	SelectArtwork = "SELECT_ARTWORK",
	SelectGallery = "SELECT_GALLERY",
}

const layoutReducer =
	(state: ILayoutState, action: ILayoutAction): ILayoutState => {
		switch (action.type) {
			case ELayoutActionType.SelectArtwork:
				return {
					...state,
					selectedArtwork: action.selectedArtwork,
				};
			case ELayoutActionType.SelectGallery:
				return {
					...state,
					selectedArtwork: undefined,
					selectedGallery: action.selectedGallery,
				};
		}
	};
const layoutState: ILayoutState = {
	selectedArtwork: undefined,
	selectedGallery: undefined,
};

export default ({ children }: {children: any}) => {
	const [state, dispatch] = useReducer(layoutReducer, layoutState);
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
	const context: ILayoutContext = {
		...state,
		artworksWithoutGalleries: filter(
			({ galleryId }) => !galleryId,
			artworks,
		),
		galleries: galleriesWithArtworks,
		selectArtwork: (selectedArtwork: IArtwork) => dispatch({
			selectedArtwork,
			type: ELayoutActionType.SelectArtwork,
		}),
		selectGallery: (selectedGallery: IGallery) => dispatch({
			selectedGallery,
			type: ELayoutActionType.SelectGallery,
		}),
	};
	if (!!state.selectedArtwork) {
		const selectedArtwork = find({id: state.selectedArtwork.id}, artworks);
		if (!isEqual(state.selectedArtwork, selectedArtwork)) {
			const selectedGallery = find({id: get("galleryId", selectedArtwork)}, galleriesWithArtworks);
			dispatch({
				selectedGallery,
				type: ELayoutActionType.SelectGallery,
			});
			dispatch({
				selectedArtwork,
				type: ELayoutActionType.SelectArtwork,
			});
		}
	} else if (!!state.selectedGallery) {
		const selectedGallery = find({id: state.selectedGallery.id}, galleriesWithArtworks);
		if (!isEqual(state.selectedGallery, selectedGallery)) {
			dispatch({
				selectedGallery,
				type: ELayoutActionType.SelectGallery,
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
