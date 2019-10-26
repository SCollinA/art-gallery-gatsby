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
		// TODO: verify if this is a sufficient check
		if (localStorage.getItem("auth-token")) {
			this.setState({ isLoggedIn: true });
		}
	}

	public login = () => {
		this.setState({ isLoggedIn: true });
		window.onbeforeunload = () => "are you sure you want to log out?";
		window.onunload = () => localStorage.removeItem("auth-token");
	}

	public logout = () => {
		window.onbeforeunload = null;
		localStorage.removeItem("auth-token");
		this.setState({ isLoggedIn: false });
	}

	// select a gallery to update
	// when selecting, if one already exists, remove it
	public selectGallery = (selectedGallery: any) => this.setState({
		isUpdating: this.state.selectedGallery.id === selectedGallery.id && true,
		selectedArtwork: {},
		selectedGallery,
		updatingArtwork: {},
		updatingGallery: this.state.selectedGallery.id === selectedGallery.id && selectedGallery,
	})

	// select an artwork to update
	// when selecting, if one already exists, remove it
	public editArtwork = (selectedArtwork: any) => this.setState({
		isUpdating: true,
		selectedArtwork,
		// selectedGallery: {},
		updatingArtwork: selectedArtwork,
		updatingGallery: {},
	})

	// update the gallery in state
	public handleGalleryChange = (updatingGallery: any) => this.setState({ updatingGallery });

	// update the gallery in state
	public handleArtworkChange = (updatingArtwork: any) =>
		this.setState({ updatingArtwork: { ...this.state.updatingArtwork, ...updatingArtwork } })

	// submission will be a mutation defined in the form
	public submitGalleryChange = () => this.setState({
		isUpdating: false,
		selectedGallery: {},
		updatingGallery: {},
	})

	// submission will be a mutation defined in the form
	public submitArtworkChange = () => this.setState({
		isUpdating: false,
		selectedArtwork: {},
		updatingArtwork: {},
	})

	public resetGallery = () => this.setState({
		updatingGallery: this.state.selectedGallery,
	})

	public resetArtwork = () => this.setState({
		updatingArtwork: this.state.selectedArtwork,
	})

	public removeGallery = () => this.submitGalleryChange();

	public removeArtwork = () => this.submitArtworkChange();

	public initializeAdmin = () => {
		const { galleries } = this.context;
		if (get("length", galleries)) {
			this.selectGallery(galleries[0]);
		}
	}

	public render() {
		const { children } = this.props;
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
						changeArtwork: this.handleArtworkChange,
						changeGallery: this.handleGalleryChange,
						editArtwork: this.editArtwork,
						login: this.login,
						removeArtwork: this.removeArtwork,
						removeGallery: this.removeGallery,
						resetArtwork: this.resetArtwork,
						resetGallery: this.resetGallery,
						selectGallery: this.selectGallery,
						selectedArtwork: this.state.selectedArtwork,
						selectedGallery: this.state.selectedGallery,
						submitArtwork: this.submitArtworkChange,
						submitGallery: this.submitGalleryChange,
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
