import React,
{
	useContext,
	useEffect,
	useReducer,
} from "react";

import AdminContext from "../contexts/AdminContext";
import LayoutContext from "../contexts/LayoutContext";
import {
	EAdminReducerActionType,
	IAdminReducerAction,
	IAdminReducerState,
} from "../models/admin.model";
import { IArtwork } from "../models/artwork.model";
import { IGallery } from "../models/gallery.model";

const adminReducer: React.Reducer<IAdminReducerState, IAdminReducerAction> =
	(state: IAdminReducerState, action: IAdminReducerAction): IAdminReducerState => {
		switch (action.type) {
			case EAdminReducerActionType.Login:
				return {
					...state,
					isLoggedIn: true,
				};
			case EAdminReducerActionType.Logout:
				return {
					...state,
					isLoggedIn: false,
				};
			case EAdminReducerActionType.EditGallery:
				return {
					...state,
					isUpdating: true,
					updatingArtwork: undefined,
					updatingGallery: action.updatingGallery,
				};
			case EAdminReducerActionType.EditArtwork:
				return {
					...state,
					isUpdating: true,
					updatingArtwork: action.updatingArtwork,
					updatingGallery: undefined,
				};
			case EAdminReducerActionType.UpdateGallery:
				return {
					...state,
					updatingGallery: {
						...state.updatingGallery,
						...action.updatingGallery,
					},
				};
			case EAdminReducerActionType.UpdateArtwork:
				return {
					...state,
					updatingArtwork: {
						...state.updatingArtwork,
						...action.updatingArtwork,
					},
				};
			case EAdminReducerActionType.SubmitGallery:
				return {
					...state,
					isUpdating: false,
					updatingGallery: undefined,
				};
			case EAdminReducerActionType.SubmitArtwork:
				return {
					...state,
					isUpdating: false,
					updatingArtwork: undefined,
				};
			case EAdminReducerActionType.CancelUpdate:
				return {
					...state,
					isUpdating: false,
					updatingArtwork: undefined,
					updatingGallery: undefined,
				};
		}
	};
const adminState: IAdminReducerState = {
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
	const login = () => dispatch({ type: EAdminReducerActionType.Login});
	const logout = () => dispatch({ type: EAdminReducerActionType.Logout});
	const editGallery = (updatingGallery = selectedGallery) => dispatch({
		type: EAdminReducerActionType.EditGallery,
		updatingGallery,
	});
	const editArtwork = (updatingArtwork = selectedArtwork) => dispatch({
		type: EAdminReducerActionType.EditArtwork,
		updatingArtwork,
	});
	const updateGallery = (updatingGallery: IGallery) =>
		dispatch({
			type: EAdminReducerActionType.UpdateGallery,
			updatingGallery,
		});
	const updateArtwork = (updatingArtwork: IArtwork) =>
		dispatch({
			type: EAdminReducerActionType.UpdateArtwork,
			updatingArtwork,
		});
	const submitGallery = () =>
		dispatch({ type: EAdminReducerActionType.SubmitGallery });
	const submitArtwork = () =>
		dispatch({ type: EAdminReducerActionType.SubmitArtwork });
	const cancelUpdate = () =>
		dispatch({ type: EAdminReducerActionType.CancelUpdate });
	const resetGallery = () =>
		dispatch({
			type: EAdminReducerActionType.UpdateGallery,
			updatingGallery: selectedGallery,
		});
	const resetArtwork = () =>
		dispatch({
			type: EAdminReducerActionType.UpdateArtwork,
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
