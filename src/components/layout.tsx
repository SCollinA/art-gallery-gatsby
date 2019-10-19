import { StaticQuery } from "gatsby";
import React from "react";
import {
	Query,
} from "react-apollo";

import LayoutContext from "../contexts/layoutContext";
import {
	ARTWORK_FILES,
	ARTWORK_IMAGE,
	DB_CONTENT,
} from "../graphql/graphql";

import Footer from "./Footer";
import FullStoryHelmet from "./FullStoryHelmet";
import GalleryHeader from "./header";
import "./layout.css";

export default class Layout extends React.Component<any, any, any> {
	constructor(props: any) {
		super(props);
		this.state = {
			artworkImages: [],
		};
	}

	public render() {
		const { children } = this.props;
		return (
			<div className="Layout">
				<FullStoryHelmet/>
				<GalleryHeader/>
				<div className="Content">
					<Query query={DB_CONTENT}>
						{({ data: { galleries = [], artworks = []} }: any) => (
							<StaticQuery query={ARTWORK_FILES}
								render={(artworkFileData: any) => {
									const {
										artworkImages,
										galleriesWithFiles,
									} = initializeArtworkImages(artworks, artworkFileData, galleries, this.state.artworkImages);
									return (
										<LayoutContextProvider
											artworkImages={artworkImages}
											children={children}
											galleriesWithFiles={galleriesWithFiles}
											updateDbImageFunction={(id: string) => updateDbImage(id, artworkImages)}
										/>
									);
								}}
							/>
						)}
					</Query>
					<Footer/>
				</div>
			</div>
		);
	}
}

// this function checks if artwork id is in array
// if not it adds it to array
const updateDbImage = ( id: string, artworkImages: any[] ) => {
	const artworkImagesCopy = [...artworkImages];
	if (!artworkImagesCopy.find((artworkImage) => artworkImage.id === id)) {
		artworkImagesCopy.push({ id });
	}
	return artworkImagesCopy;
};

const getGalleriesWithFiles = (galleries: any[], artworks: any[], artworkImages: any[], artworkFiles: any[]) => {
	return galleries.length > 0 ?
		galleries.map((gallery: any) => {
			const galleryArtworks = artworks.filter((artwork: any) => artwork.galleryId === gallery.id);
			return {
				artworks: galleryArtworks.length > 0 ?
					// tslint:disable-next-line: max-line-length
					galleryArtworks.map(({ id, galleryId, title, width, height, medium, price, sold, framed }: any) => {
					// tslint:disable-next-line: max-line-length
					const artworkImage = artworkImages.find((galleryArtworkImage: any) =>
						id === galleryArtworkImage.id);
					// if an artwork file exist add it
					// will check if file is there to determine proper element for image
					return {
						file: artworkFiles.find((artworkFile: any) => artworkFile.name === `${id}-${title}`),
						framed,
						galleryId,
						height,
						id,
						image: artworkImage ? artworkImage.image : "",
						medium,
						price,
						sold,
						title,
						width,
					};
					}) :
					[{ id: "nada", title: "no artworks"}],
				id: gallery.id,
				name: gallery.name,
			};
		}) : [{
			artworks: [{ id: "nada", title: "no galleries #1"}],
			id: "none",
			name: "no galleries",
		}];
};

const getArtworkFiles = (artworkFileData: any) => {
	return artworkFileData.artworkFiles ?
		artworkFileData.artworkFiles.edges.map((edge: any) => edge.node) :
		[];
};

const initializeArtworkImages = (
	artworks: any[],
	artworkFileData: any,
	galleries: any,
	artworkImages: any[],
) => {
	const artworkFiles = getArtworkFiles(artworkFileData);
	const galleriesWithFiles = getGalleriesWithFiles(galleries, artworks, artworkImages, artworkFiles);
	if (!artworkImages.length) {
		artworkImages.push(...getArtworkImages(galleriesWithFiles));
	}
	artworkImages.forEach((artworkImage, index) => {
		getArtworkData({index, artworkImage, artworkImages});
	});
	return {
		artworkImages,
		galleriesWithFiles,
	};
};

const getArtworkImages = (galleriesWithFiles: any) => {
	const artworkImages: any[] = [];
	galleriesWithFiles.forEach((galleryWithFile: any) => {
		galleryWithFile.artworks.forEach((galleryArtwork: any) => {
		if (!galleryArtwork.file && galleryArtwork.id !== "nada") {
			artworkImages.push({
				id: galleryArtwork.id,
			});
		}
		});
	});
	return artworkImages;
};

const getArtworkData = ({ index, artworkImage, artworkImages }: any) => (
	<Query key={index} query={ARTWORK_IMAGE} variables={{ id: artworkImage.id }} fetchPolicy={"cache-first"}>
		{({ data: artworkData }: any) => {
			const foundImage = artworkImages.find((dbImage: any) => dbImage.id === artworkImage.id);
			if (!!foundImage) {
			foundImage.image = artworkData &&
				artworkData.getArtwork &&
				artworkData.getArtwork.image;
			}
			return null;
		}}
	</Query>
);

const LayoutContextProvider = ({
	artworkImages,
	children,
	galleriesWithFiles,
	updateDbImageFunction,
}: any) => (
	<LayoutContext.Provider
		value={{
		// if galleries has a gallery, add it's artworks
		galleries: galleriesWithFiles.map((galleryWithFile: any) => {
			// console.log('artworkImages', artworkImages)
			return {
			...galleryWithFile,
			artworks: galleryWithFile.artworks.map((galleryArtwork: any) => {
				const artworkImage = artworkImages.find(
					(galleryArtworkImage: any) =>
						galleryArtworkImage.id === galleryArtwork.id);
				return {
					...galleryArtwork,
					image: artworkImage ?
						artworkImage.image :
						galleryArtwork.image,
				};
			}),
			};
		}),
		updateDbImage: updateDbImageFunction,
		}}
	>
		{children}
	</LayoutContext.Provider>
);
