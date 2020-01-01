import React, { useContext, useEffect, useState } from "react";

import AdminContext from "../contexts/AdminContext";
import LayoutContext from "../contexts/LayoutContext";

export default ({children}: {children: any}) => {
	const login = () =>
		setState({
			...state,
			isLoggedIn: true,
		});
	const logout = () =>
		setState({
			...state,
			isLoggedIn: false,
		});
	const editGallery = () =>
		setState({
			...state,
			isUpdating: true,
			updatingArtwork: undefined,
			updatingGallery: selectedGallery,
		});
	const editArtwork = () =>
		setState({
			...state,
			isUpdating: true,
			updatingArtwork: selectedArtwork,
			updatingGallery: undefined,
		});
	const updateGallery = (updatingGallery: any) =>
		setState({
			...state,
			updatingGallery,
		});
	const updateArtwork = (updatingArtwork: any) =>
		setState({
			...state,
			updatingArtwork: {
				...(state.updatingArtwork || {}),
				...updatingArtwork,
			},
		});
	const submitGallery = () =>
		setState({
			...state,
			isUpdating: false,
			updatingGallery: undefined,
		});
	const submitArtwork = () =>
		setState({
			...state,
			isUpdating: false,
			updatingArtwork: undefined,
		});
	const cancelUpdate = () =>
		setState({
			...state,
			isUpdating: false,
			updatingArtwork: undefined,
			updatingGallery: undefined,
		});
	const resetGallery = () =>
		setState({
			...state,
			updatingGallery: selectedGallery,
		});
	const resetArtwork = () =>
		setState({
			...state,
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
	const {
		selectArtwork,
		selectedArtwork,
		selectedGallery,
		selectGallery,
	}: any = useContext(LayoutContext);
	const [state, setState] = useState({
		isLoggedIn: false,
		isUpdating: false,
		updatingArtwork: undefined,
		updatingGallery: undefined,
	});
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
