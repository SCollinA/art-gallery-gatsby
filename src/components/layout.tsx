import { graphql, StaticQuery } from "gatsby";
import React from "react";
import {
	Query,
} from "react-apollo";

import LayoutContext from "../contexts/layoutContext";
import {
	DB_CONTENT,
} from "../graphql/graphql";

import Footer from "./Footer";
import FullStoryHelmet from "./FullStoryHelmet";
import GalleryHeader from "./header";
import "./layout.css";
import Loading from "./Loading";

export default ({ children }: any) =>
	<div className="Layout">
		<FullStoryHelmet/>
		<GalleryHeader/>
		<Query query={DB_CONTENT}>
			{({ data: { galleries = [], artworks = [] }, loading }: any) => (
				<StaticQuery query={ARTWORK_FILES}
					render={(artworkFileData: any) => {
						return (
							<LayoutContext.Provider value={getContext(
								artworks,
								artworkFileData,
								galleries,
							)}>
								<Loading loading={loading}>
									{children}
								</Loading>
							</LayoutContext.Provider>
						);
					}}
				/>
			)}
		</Query>
		<Footer/>
	</div>;

const getContext = (
	artworks: any[],
	artworkFileData: any[],
	galleries: any[],
) => {
	const artworkFiles = getArtworkFiles(artworkFileData);
	const galleriesWithFiles = matchGalleryArtworkToFile(galleries, artworks, artworkFiles);
	return {
		galleries: galleriesWithFiles,
	};
};

const ARTWORK_FILES = graphql`
  {
    artworkFiles: allFile(filter: {
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

const matchGalleryArtworkToFile = (galleries: any[], artworks: any[], artworkFiles: any[]) => {
	const placeholderArtwork = [{
		id: "nada",
		title: "no artworks",
	}];
	const placeholderGallery = [{
		id: "none",
		name: "no galleries",
	}];
	if (!galleries.length) {
		galleries = placeholderGallery;
	}
	return galleries.map((gallery: any) => {
		// match up artworks from db to gallery
		let galleryArtworks = artworks.filter((artwork: any) =>
			artwork.galleryId === gallery.id);
		if (!galleryArtworks.length) {
			galleryArtworks = placeholderArtwork;
		}
		// map those to files for display throughout site
		galleryArtworks = galleryArtworks.map(({
				id,
				title,
				...remainingArtwork
			}: any) => {
				// if an artwork file exist add it
				// will check if file is there to determine proper element for image
				const file = artworkFiles.find((artworkFile: any) => artworkFile.name === `${id}-${title}`);
				return {
					file,
					id,
					title,
					...remainingArtwork,
				};
			});
		return {
			artworks: galleryArtworks,
			...gallery,
		};
	});
};

const getArtworkFiles = (artworkFileData: any) => {
	return artworkFileData.artworkFiles ?
		artworkFileData.artworkFiles.edges.map((edge: any) => edge.node) :
		[];
};
