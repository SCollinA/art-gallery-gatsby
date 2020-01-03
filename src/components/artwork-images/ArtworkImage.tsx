import { isEqual } from "lodash/fp";
import React, { Ref, useEffect, useReducer } from "react";

import { IArtwork } from "../../models/artwork.model";

import Placeholder from "../reusable/Placeholder";

import ArtworkImageDB from "./ArtworkImageDB";
import ArtworkImageFile from "./ArtworkImageFile";

interface IArtworkImageState {
	artwork: IArtwork;
	aspectRatio: number;
	fitToScreen: boolean;
}
interface IArtworkImageAction extends Partial<IArtworkImageState> {
	type: EArtworkImageActionType;
}
enum EArtworkImageActionType {
	ResizeWindow = "RESIZE_WINDOW",
}
const defaultImageRef = React.createRef<any>();

const artworkImageReducer =
	(state: IArtworkImageState, action: IArtworkImageAction): IArtworkImageState => {
		switch (action.type) {
			case EArtworkImageActionType.ResizeWindow:
				return {
					...state,
					aspectRatio: action.aspectRatio || 1,
				};
		}
	};

export default ({
	artwork,
	fitToScreen,
	imageRef = defaultImageRef,
}: {
	artwork: IArtwork,
	fitToScreen: boolean,
	imageRef?: any;
}) => {
	const artworkImageState: IArtworkImageState = {
		artwork,
		aspectRatio: 0,
		fitToScreen,
	};
	const [state, dispatch] = useReducer(artworkImageReducer, artworkImageState);
	useEffect(() => {
		const updateWindowDimensions = () =>
			dispatch({
				aspectRatio: window.innerWidth / window.innerHeight,
				type: EArtworkImageActionType.ResizeWindow,
			});
		updateWindowDimensions();
		window.addEventListener("resize", updateWindowDimensions);
		return () => {
			window.removeEventListener("resize", updateWindowDimensions);
		};
	}, [state.aspectRatio]);
	return !!state.artwork &&
		(state.artwork.recentlyupdatedimage || !!state.artwork.image ?
			<ArtworkImageDB artwork={state.artwork}
				imageRef={imageRef}
				aspectRatio={state.aspectRatio}
				fitToScreen={state.fitToScreen}
			/> :
			state.artwork.file ?
				<ArtworkImageFile artwork={state.artwork}
					imageRef={imageRef}
					aspectRatio={state.aspectRatio}
					fitToScreen={state.fitToScreen}
				/> :
				<Placeholder text="No image found"/>);
};
