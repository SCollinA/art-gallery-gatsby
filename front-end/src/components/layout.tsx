import { useQuery } from "@apollo/react-hooks";
import { graphql, useStaticQuery } from "gatsby";
import { filter, find, get, isEqual, map } from "lodash/fp";
import React, { useReducer } from "react";

import LayoutContext from "../contexts/LayoutContext";
import {
	ALL_ARTWORKS,
	ALL_GALLERIES,
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
	const artworksWithFiles = addFilesToArtworks(artworks, artworkFileData);
	const galleriesWithArtworks = getGalleries(galleries, artworksWithFiles);
	const context: ILayoutContext = {
		...state,
		artworksWithoutGalleries: filter(
			({ galleryId }) => !galleryId,
			artworksWithFiles,
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
		const selectedArtwork = find({id: state.selectedArtwork.id}, artworksWithFiles);
		const isNewArtwork = !selectedArtwork;
		if (!isNewArtwork && !isEqual(state.selectedArtwork, selectedArtwork)) {
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
		const isNewGallery = !selectedGallery;
		if (!isNewGallery && !isEqual(state.selectedGallery, selectedGallery)) {
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

const addFilesToArtworks = (artworks: IArtwork[], artworkFileData: any[]) => {
	const artworkFiles = getArtworkFiles(artworkFileData);
	return map((artwork) => {
		const { id, title } = artwork;
		return {
			...artwork,
			file: find(({ name }) =>
				name === `${id}-${title}`,
				artworkFiles,
			),
		};
	}, artworks);
};

const getGalleries = (
	galleries: IGallery[],
	artworksWithFiles: IArtwork[],
) => {
	return galleries.map((gallery) => {
		const artworks = filter((artwork) =>
			artwork.galleryId === gallery.id,
			artworksWithFiles,
		);
		return {
			...gallery,
			artworks,
		};
	});
};

const getArtworkFiles = (artworkFiles: any) =>
	artworkFiles.edges.map((edge: any) => edge.node);

export const ARTWORK_FILES = graphql`
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
