import { isEqual } from "lodash/fp";
import React, { useEffect, useReducer } from "react";

import { IArtwork } from "../../models/artwork.model";

import Placeholder from "../reusable/Placeholder";

import ArtworkImageDB from "./ArtworkImageDB";
import ArtworkImageFile from "./ArtworkImageFile";

interface IArtworkImageState {
	artwork?: IArtwork;
	aspectRatio: number;
	fitToScreen: boolean;
}
interface IArtworkImageAction extends Partial<IArtworkImageState> {
	type: EArtworkImageActionType;
}
enum EArtworkImageActionType {
	ResizeWindow = "RESIZE_WINDOW",
	SetArtwork = "SET_ARTWORK",
}

const artworkImageReducer =
	(state: IArtworkImageState, action: IArtworkImageAction): IArtworkImageState => {
		switch (action.type) {
			case EArtworkImageActionType.ResizeWindow:
				return {
					...state,
					aspectRatio: action.aspectRatio || 1,
				};
			case EArtworkImageActionType.SetArtwork:
				return {
					...state,
					artwork: action.artwork,
				};
		}
	};

export default ({
	artwork,
	fitToScreen = false,
	imageRef = React.createRef<any>(),
}: {
	artwork?: IArtwork,
	fitToScreen?: boolean,
	imageRef?: any;
}) => {
	const artworkImageState: IArtworkImageState = {
		artwork,
		aspectRatio: 0,
		fitToScreen,
	};
	const [state, dispatch] = useReducer(artworkImageReducer, artworkImageState);
	useEffect(() => {
		if (!isEqual(state.artwork, artwork)) {
			dispatch({
				artwork,
				type: EArtworkImageActionType.SetArtwork,
			});
		}
	});
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
	if (!state.artwork) {
		return <Placeholder text="No image found"/>;
	} else if (
		state.artwork.recentlyupdatedimage ||
		!!state.artwork.image
	) {
		return <ArtworkImageDB artwork={state.artwork}
			imageRef={imageRef}
			aspectRatio={state.aspectRatio}
			fitToScreen={state.fitToScreen}
		/>;
	} else if (!!state.artwork.file) {
		return <ArtworkImageFile artwork={state.artwork}
			imageRef={imageRef}
			aspectRatio={state.aspectRatio}
			fitToScreen={state.fitToScreen}
		/>;
	} else {
		return <Placeholder text="No image found"/>;
	}
};
