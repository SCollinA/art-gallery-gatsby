import React, { useContext, useEffect, useReducer } from "react";

import AdminContext from "../contexts/AdminContext";
import LayoutContext from "../contexts/LayoutContext";

const adminReducer = (state: any, action: any) => {
	switch (action.type) {
		case "LOGIN":
			return {
				...state,
				isLoggedIn: true,
			};
		case "LOGOUT":
			return {
				...state,
				isLoggedIn: false,
			};
		case "LOGOUT":
			return {
				...state,
				isLoggedIn: false,
			};
		case "LOGOUT":
			return {
				...state,
				isLoggedIn: false,
			};
		case "EDIT_GALLERY":
			return {
				...state,
				isUpdating: true,
				updatingArtwork: undefined,
				updatingGallery: action.gallery,
			};
		case "EDIT_ARTWORK":
			return {
				...state,
				isUpdating: true,
				updatingArtwork: action.artwork,
				updatingGallery: undefined,
			};
		case "UPDATE_GALLERY":
			return {
				...state,
				updatingGallery: {
					...state.updatingGallery,
					...action.updatingGallery,
				},
			};
		case "UPDATE_ARTWORK":
			return {
				...state,
				updatingArtwork: {
					...state.updatingArtwork,
					...action.updatingArtwork,
				},
			};
		case "SUBMIT_GALLERY":
			return {
				...state,
				isUpdating: false,
				updatingGallery: undefined,
			};
		case "SUBMIT_ARTWORK":
			return {
				...state,
				isUpdating: false,
				updatingArtwork: undefined,
			};
		case "CANCEL_UPDATE":
			return {
				...state,
				isUpdating: false,
				updatingArtwork: undefined,
				updatingGallery: undefined,
			};
		default:
			throw new Error("holy cow");
	}
};
const adminState = {
	isLoggedIn: false,
	isUpdating: false,
	updatingArtwork: undefined,
	updatingGallery: undefined,
};

export default ({children}: {children: any}) => {
	const {
		selectArtwork,
		selectedArtwork,
		selectedGallery,
		selectGallery,
	}: any = useContext(LayoutContext);
	const [state, dispatch] = useReducer(adminReducer, adminState);
	const login = () => dispatch({ type: "LOGIN"});
	const logout = () => dispatch({ type: "LOGOUT"});
	const editGallery = () => dispatch({
		gallery: selectedGallery,
		type: "EDIT_GALLERY",
	});
	const editArtwork = () => dispatch({
		artwork: selectedArtwork,
		type: "EDIT_ARTWORK",
	});
	const updateGallery = (updatingGallery: any) =>
		dispatch({
			type: "UPDATE_GALLERY",
			updatingGallery,
		});
	const updateArtwork = (updatingArtwork: any) =>
		dispatch({
			type: "UPDATE_ARTWORK",
			updatingArtwork,
		});
	const submitGallery = () => {
		// selectGallery(state.updatingGallery);
		dispatch({ type: "SUBMIT_GALLERY" });
	};
	const submitArtwork = () => {
		// selectArtwork(state.updatingArtwork);
		dispatch({ type: "SUBMIT_ARTWORK" });
	};
	const cancelUpdate = () =>
		dispatch({ type: "CANCEL_UPDATE" });
	const resetGallery = () =>
		dispatch({
			type: "UPDATE_GALLERY",
			updatingGallery: selectedGallery,
		});
	const resetArtwork = () =>
		dispatch({
			type: "UPDATE_ARTWORK",
			updatingArtwork: selectedArtwork,
		});
	const removeGallery = () => {
		submitGallery();
		selectGallery();
	};
	const removeArtwork = () => {
		submitArtwork();
		selectArtwork();
	};
	useEffect(() => {
		if (!state.isLoggedIn && localStorage.getItem("auth-token")) {
			login();
		}
	});
	useEffect(() => {
		if (state.isLoggedIn) {
			window.onbeforeunload = () => "are you sure you want to log out?";
			window.onunload = () => localStorage.removeItem("auth-token");
		} else {
			selectArtwork();
			selectGallery();
			window.onbeforeunload = null;
			localStorage.removeItem("auth-token");
		}
	}, [state.isLoggedIn]);
	const context = {
		...state,
		cancelUpdate,
		editArtwork,
		editGallery,
		login,
		logout,
		removeArtwork,
		removeGallery,
		resetArtwork,
		resetGallery,
		submitArtwork,
		submitGallery,
		updateArtwork,
		updateGallery,
	};
	return (
		<AdminContext.Provider value={context}>
			{children}
		</AdminContext.Provider>
	);
};
