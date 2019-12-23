import React from "react";

import AdminContext from "../contexts/AdminContext";
import LayoutContext from "../contexts/LayoutContext";

export default class Admin extends React.Component<any, any, any> {

	public static contextType = LayoutContext;

	constructor(props: any) {
		super(props);
		this.state = {
			cancelUpdate: this.cancelUpdate,
			editArtwork: this.editArtwork,
			editGallery: this.editGallery,
			isLoggedIn: false,
			isUpdating: false,
			login: this.login,
			logout: this.logout,
			removeArtwork: this.removeArtwork,
			removeGallery: this.removeGallery,
			resetArtwork: this.resetArtwork,
			resetGallery: this.resetGallery,
			submitArtwork: this.submitArtwork,
			submitGallery: this.submitGallery,
			updateArtwork: this.updateArtwork,
			updateGallery: this.updateGallery,
			updatingArtwork: undefined,
			updatingGallery: undefined,
		};
	}

	public componentDidMount() {
		// TODO: verify if this is a sufficient check
		if (localStorage.getItem("auth-token")) {
			this.login();
		}
	}

	public render() {
		const { children } = this.props;
		return (
			<AdminContext.Provider value={this.state}>
				{children}
			</AdminContext.Provider>
		);
	}

	private login = () =>
		this.setState({
			isLoggedIn: true,
		}, () => {
			window.onbeforeunload = () => "are you sure you want to log out?";
			window.onunload = () => localStorage.removeItem("auth-token");
		})

	private logout = () =>
		this.setState({
			isLoggedIn: false,
		}, () => {
			this.context.selectArtwork();
			this.context.selectGallery();
			window.onbeforeunload = null;
			localStorage.removeItem("auth-token");
		})

	private editGallery = () =>
		this.setState({
			isUpdating: true,
			updatingArtwork: undefined,
			updatingGallery: this.context.selectedGallery,
		})

	private editArtwork = () =>
		this.setState({
			isUpdating: true,
			updatingArtwork: this.context.selectedArtwork,
			updatingGallery: undefined,
		})

	private updateGallery = (updatingGallery: any) =>
		this.setState({
			updatingGallery: {
				...this.state.updatingGallery,
				...updatingGallery,
			},
		})

	private updateArtwork = (updatingArtwork: any) =>
		this.setState({
			updatingArtwork: {
				...this.state.updatingArtwork,
				...updatingArtwork,
			},
		})

	private submitGallery = () =>
		this.setState({
			isUpdating: false,
			updatingGallery: undefined,
		})

	private submitArtwork = () =>
		this.setState({
			isUpdating: false,
			updatingArtwork: undefined,
		})

	private cancelUpdate = () =>
		this.setState({
			isUpdating: false,
			updatingArtwork: undefined,
			updatingGallery: undefined,
		})

	private resetGallery = () =>
		this.setState({
			updatingGallery: this.context.selectedGallery,
		})

	private resetArtwork = () =>
		this.setState({
			updatingArtwork: this.context.selectedArtwork,
		})

	private removeGallery = () => {
		this.submitGallery();
		this.context.selectGallery();
	}

	private removeArtwork = () => {
		this.submitArtwork();
		this.context.selectArtwork();
	}
}
