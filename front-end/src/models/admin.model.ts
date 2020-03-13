import { IArtwork } from "./artwork.model";
import { IGallery } from "./gallery.model";

export interface IAdminReducerState {
	isLoggedIn: boolean;
	isUpdating: boolean;
	updatingArtwork?: Partial<IArtwork>;
	updatingGallery?: Partial<IGallery>;
}
export interface IAdminReducerAction extends Partial<IAdminReducerState> {
	type: EAdminReducerActionType;
}
export enum EAdminReducerActionType {
	Login = "LOGIN",
	Logout = "LOGOUT",
	EditGallery = "EDIT_GALLERY",
	EditArtwork = "EDIT_ARTWORK",
	UpdateGallery = "UPDATE_GALLERY",
	UpdateArtwork = "UPDATE_ARTWORK",
	SubmitGallery = "SUBMIT_GALLERY",
	SubmitArtwork = "SUBMIT_ARTWORK",
	CancelUpdate = "CANCEL_UPDATE",
}
