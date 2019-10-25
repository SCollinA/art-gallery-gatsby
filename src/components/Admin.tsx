import { get } from "lodash/fp";
import React from "react";

import AdminContext from "../contexts/adminContext";
import LayoutContext from "../contexts/layoutContext";

import AdminArtworks from "./AdminArtworks";
import AdminGalleries from "./AdminGalleries";
import AdminLogin from "./AdminLogin";
import UpdateForm from "./UpdateForm";

export default class Admin extends React.Component<any, any, any> {

	public static contextType = LayoutContext;

	constructor(props: any) {
		super(props);
		this.state = {
			isLoggedIn: false,
			isUpdating: false,
			selectedArtwork: {},
			selectedGallery: {},
			setIsLoggedIn: (isLoggedIn: boolean) => this.setState({isLoggedIn}),
			updatingArtwork: {},
			updatingGallery: {},
		};
	}

	public componentDidMount() {
		this.initializeAdmin();
		if (localStorage.getItem("auth-token")) {
			this.setState({ isLoggedIn: true });
		}
	}

	public _login = () => {
		this.setState({ isLoggedIn: true });
		window.onbeforeunload = () => "are you sure you want to log out?";
		window.onunload = () => localStorage.removeItem("auth-token");
	}

	public _logout = () => {
		window.onbeforeunload = null;
		localStorage.removeItem("auth-token");
		this.setState({ isLoggedIn: false });
	}

	// select a gallery to update
	// when selecting, if one already exists, remove it
	public _selectGallery = (selectedGallery: any) => this.setState({
		isUpdating: this.state.selectedGallery.id === selectedGallery.id && true,
		selectedArtwork: {},
		selectedGallery,
		updatingArtwork: {},
		updatingGallery: this.state.selectedGallery.id === selectedGallery.id && selectedGallery,
	})

	// select an artwork to update
	// when selecting, if one already exists, remove it
	public _selectArtwork = (selectedArtwork: any) => this.setState({
		isUpdating: true,
		selectedArtwork,
		// selectedGallery: {},
		updatingArtwork: selectedArtwork,
		updatingGallery: {},
	})

	// update the gallery in state
	public _handleGalleryChange = (updatingGallery: any) => this.setState({ updatingGallery });

	// update the gallery in state
	public _handleArtworkChange = (updatingArtwork: any) =>
		this.setState({ updatingArtwork: { ...this.state.updatingArtwork, ...updatingArtwork } })

	// submission will be a mutation defined in the form
	public _submitGalleryChange = () => this.setState({
		isUpdating: false,
		selectedGallery: {},
		updatingGallery: {},
	})

	// submission will be a mutation defined in the form
	public _submitArtworkChange = () => this.setState({
		isUpdating: false,
		selectedArtwork: {},
		updatingArtwork: {},
	})

	public _resetGallery = () => this.setState({
		updatingGallery: this.state.selectedGallery,
	})

	public _resetArtwork = () => this.setState({
		updatingArtwork: this.state.selectedArtwork,
	})

	public _removeGallery = () => this._submitGalleryChange();

	public _removeArtwork = () => this._submitArtworkChange();

	public initializeAdmin = () => {
		const { galleries } = this.context;
		if (get("length", galleries)) {
			this._selectGallery(galleries[0]);
		}
	}

	public render() {
		const { isLoggedIn } = this.state;
		const { children } = this.props;
		// return !isLoggedIn ? <AdminLogin login={this._login}/> : (
			// <div className="Admin"
				// onClick={() => this.setState({
			// 		isUpdating: false,
			// 		selectedArtwork: {},
			// 		selectedGallery: {},
			// 		updatingArtwork: {},
			// 		updatingGallery: {},
			// 	})}
			// // >
		return (
				<AdminContext.Provider
					value={{
						...this.state,
						cancelUpdate: () => this.setState({
							isUpdating: false,
							selectedArtwork: {},
							selectedGallery: {},
							updatingArtwork: {},
							updatingGallery: {},
						}),
						changeArtwork: this._handleArtworkChange,
						changeGallery: this._handleGalleryChange,
						login: this._login,
						removeArtwork: this._removeArtwork,
						removeGallery: this._removeGallery,
						resetArtwork: this._resetArtwork,
						resetGallery: this._resetGallery,
						selectArtwork: this._selectArtwork,
						selectGallery: this._selectGallery,
						selectedArtwork: this.state.selectedArtwork,
						selectedGallery: this.state.selectedGallery,
						submitArtwork: this._submitArtworkChange,
						submitGallery: this._submitGalleryChange,
						updatingArtwork: this.state.updatingArtwork,
						updatingGallery: this.state.updatingGallery,
					}}
				>
					{children}
					{/* <AdminGalleries/>
					<AdminArtworks/>
					<UpdateForm/> */}
				</AdminContext.Provider>
		// {/* </div> */}
		);
	}
}
