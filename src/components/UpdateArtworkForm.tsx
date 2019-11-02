import gql from "graphql-tag";
import { filter, find, get, map } from "lodash/fp";
import React from "react";
import { Mutation, Query } from "react-apollo";

import AdminContext from "../contexts/adminContext";
import {
	DB_CONTENT,
} from "../graphql/graphql";
import { scrubMetaData } from "../utils/utils";

import LayoutContext from "../contexts/layoutContext";

import { GALLERY_ARTWORKS } from "./AdminArtworks";
import ArtworkImage from "./ArtworkImage";
import Loading from "./Loading";

export default class UpdateArtworkForm extends React.Component<any, any, any> {

	public static contextType = AdminContext;

	public imageCanvas = React.createRef<any>();
	public artworkImageRef = React.createRef<any>();

	constructor(props: any) {
		super(props);
		this.state = {
			imageFile: null,
			imageHeight: 0,
			imageLoaded: false,
			imageWidth: 0,
			windowHeight: 0,
			windowWidth: 0,
		};
	}

	public componentDidMount() {
		this.updateWindowDimensions();
		window.addEventListener("resize", this.updateWindowDimensions);
		if (this.context.updatingArtwork.image) {
			fetch(`data:image/jpeg;base64,${this.context.updatingArtwork.image}`)
				.then((res) => res.blob())
				.then((blob) => this.setState({
					imageFile: blob,
					imageLoaded: true,
				}));
		}
	}

	public componentWillUnmount() {
		window.removeEventListener("resize", this.updateWindowDimensions);
	}

	public updateWindowDimensions = () => {
		this.setState({ windowWidth: window.innerWidth, windowHeight: window.innerHeight });
	}
	public render() {
		const {
			updatingArtwork,
			updateArtwork,
			submitArtwork,
			resetArtwork,
			removeArtwork,
			cancelUpdate,
		} = this.context;
		// const { imageWidth, imageHeight, windowHeight } = this.state
		return (
			<LayoutContext.Consumer>
				{({ selectArtwork, selectedArtwork, selectGallery, selectedGallery }: any) =>
					<Mutation mutation={UPDATE_ARTWORK}
						update={(cache: any, { data: { updateArtwork: updatedArtworkData }}: any) => {
							const updatedArtwork = {
								...selectedArtwork,
								...updatedArtworkData,
							};
							const { artworks, galleries } = cache.readQuery({ query: DB_CONTENT });
							const updatedArtworks = map(
								(artwork) =>
									get("id", artwork) === get("id", updatedArtwork) ?
										updatedArtwork :
										artwork,
								artworks,
							);
							const artworkGallery = find(
								(gallery) => get("id", gallery) === get("galleryId", updatedArtwork),
								galleries,
							);
							let updatedGallery: any;
							if (artworkGallery) {
								updatedGallery = {
									...artworkGallery,
									artworks: map((artwork) =>
										get("id", artwork) === get("id", updatedArtwork) ?
											updatedArtwork :
											artwork,
										get("artworks", selectedGallery),
									),
								};
							} else {
								updatedGallery = {
									...selectedGallery,
									artworks: filter((artwork) =>
										get("id", artwork) !== get("id", updatedArtwork),
										get("artworks", selectedGallery),
									),
								};
							}
							const updatedGalleries = map((gallery) =>
								get("id", gallery) === get("galleryId", selectedArtwork) ?
									updatedGallery :
									gallery,
								galleries,
							);
							cache.writeQuery({
								data: {
									artworks: updatedArtworks,
									galleries: updatedGalleries,
								},
								query: DB_CONTENT,
							});
							selectGallery({
								...selectedGallery,
								...updatedGallery,
							});
							selectArtwork(
								artworkGallery ?
									updatedArtwork :
									undefined,
							);
						}}
					>
						{(updateArtworkMutation: any, { loading }: any) =>
							<Loading loading={loading}>
								<form id="UpdateArtworkForm"
									onSubmit={(event) => {
										event.preventDefault();
										if (this.state.imageLoaded) {
											const imageCanvasNode = this.imageCanvas.current;
											const uploadedImageNode = this.artworkImageRef.current;
											const canvasContext = imageCanvasNode.getContext("2d");
											// draw image takes (img, x, y, w, h)
											// tslint:disable-next-line: max-line-length
											canvasContext.drawImage(uploadedImageNode, 0, 0, this.state.imageWidth, this.state.imageHeight);
											imageCanvasNode.toBlob((imageBlob: any) => {
												const fr = new FileReader();
												fr.onload = () => {
													const image = btoa(`${fr.result}`);
													// updating artwork values will match form values
													updateArtworkMutation({ variables: {
														id: updatingArtwork.id,
														input: {
															...scrubMetaData(updatingArtwork),
															image,
															recentlyupdatedimage: true,
														},
													}})
													.then(() => {
														this.setState({
															imageFile: null,
															imageLoaded: false,
														}, () => {
															submitArtwork();
														});
													});
												};
												fr.readAsBinaryString(imageBlob);
											}, "image/jpeg");
										} else {
											// updating artwork values will match form values
											updateArtworkMutation({ variables: {
												id: updatingArtwork.id,
												input: scrubMetaData(updatingArtwork),
											}})
											.then(() => {
												this.setState({
													imageFile: null,
													imageLoaded: false,
												}, () => {
													submitArtwork();
												});
											});
										}
									}}
									onReset={() => this.setState({ imageFile: null, imageLoaded: false }, () => resetArtwork())}
									onClick={(event) => event.stopPropagation()}
								>
									<label>gallery
										<Query query={GALLERY_NAMES}>
											{({ data: galleryNameData }: any) => (
												<select name="galleryId"
													value={updatingArtwork.galleryId || ""}
													onChange={(event) => updateArtwork({
														galleryId: event.target.value || null,
													})}
												>
													<option value={""}>
														-
													</option>
													{galleryNameData.getAllGalleries.map((gallery: any) => (
														<option key={gallery.id}
															value={gallery.id}
														>
															{gallery.name}
														</option>
													))}
												</select>
											)}
										</Query>
									</label>
									<label>title
										<input autoFocus type="text" name="title"
											value={updatingArtwork.title}
											onChange={(event) => updateArtwork({
												title: event.target.value,
											})}
										/>
									</label>
									<div className="changeImage">
										<label>image
											<input type="file" name="image" accept="image/*"
												onClick={(event) => {
													event.target.value = "";
												}}
												onChange={(event: any) => {
													const imageFile = event.target.files[0];
													const imageLoaded = imageFile && true;
													this.setState({
														imageHeight: 0,
														imageLoaded: false,
														imageWidth: 0,
													}, () => this.setState({
														imageFile,
														// imageLoaded: false,
													}, () => this.setState({
														imageLoaded,
													}, () => !imageFile && this.setState({
														imageHeight: 0,
														imageWidth: 0,
													}))));
												}}
											/>
										</label>
										<label>remove image
											<input type="button" value="remove image"
												onClick={(event) => {
													event.target.form.image.value = "";
													this.setState({
														imageFile: null,
														imageHeight: 0,
														imageLoaded: false,
														imageWidth: 0,
													}, () => {
														updateArtwork({ ...updatingArtwork, image: null });
													});
												}}
											/>
										</label>
										<canvas id="imageCanvas" ref={this.imageCanvas}
											width={this.state.imageWidth}
											height={this.state.imageHeight}
											style={{ display: "none" }}
										/>
										<div className="uploadedImage">
											{this.state.imageLoaded ?
												<img id="uploadedImage" ref={this.artworkImageRef}
													style={{ display: "none"}}
													alt="uploaded profile"
													onLoad={() => {
														if (!this.state.imageWidth) {
															this.setState({
																imageHeight: this.artworkImageRef.current.height,
																imageWidth: this.artworkImageRef.current.width,
															}, () => {
																this.artworkImageRef.current.style.display = "block";
																const { imageWidth, imageHeight, windowHeight } = this.state;
																this.artworkImageRef.current.style.maxWidth =
																	imageWidth / imageHeight >= 1 ? // is it wider than tall?
																"25%" : `${(windowHeight * .25) * imageWidth / imageHeight}px`;
															});
														}
													}}
													src={blobUrl(this.state.imageFile)}
												/> :
												<ArtworkImage artwork={updatingArtwork}
													imageRef={this.artworkImageRef}
												/>
											}
										</div>
										{<div className="rotateImage"
											onClick={() => {
												// have to get current image height and width
												this.setState({
													imageHeight: this.state.imageWidth,
													imageWidth: this.state.imageHeight,
												}, () => {
												// get canvas and image elements from page
													const imageCanvasNode = this.imageCanvas.current;
													const rotatingImage = this.artworkImageRef.current;
													const canvasContext = imageCanvasNode.getContext("2d");
													// get whichever element actually exists
													// rotate the canvas, draw the image, and rotate the canvas back
													// canvasContext.clearRect(0, 0, imageCanvasNode.width, imageCanvasNode.height)
													if (rotatingImage) {
														canvasContext.save();
														canvasContext.translate(
															imageCanvasNode.width / 2,
															imageCanvasNode.height / 2,
														);
														canvasContext.rotate(Math.PI / 2);
														canvasContext.translate(
															(-1 * imageCanvasNode.height / 2),
															(-1 * imageCanvasNode.width / 2),
														);
														canvasContext.drawImage(
															rotatingImage,
															0,
															0,
															this.state.imageHeight,
															this.state.imageWidth,
														);
														canvasContext.restore();
														// imageCanvasNode.width = this.state.imageHeight
														// imageCanvasNode.height = this.state.imageWidth
														// convert canvas contents to blob
														imageCanvasNode.toBlob((imageBlob: any) => {
															this.setState({
																imageFile: imageBlob,
															});
														}, "image/jpeg", 1.0);
													}
												});
											}}
										>
											rotate right
										</div>}
									</div>
									<label>width
										<input type="number" name="width"
											value={updatingArtwork.width || ""}
											onChange={(event) => updateArtwork({
												width: parseInt(event.target.value, 10),
											})}
										/>
									</label>
									<label>height
										<input type="number" name="height"
											value={updatingArtwork.height || ""}
											onChange={(event) => updateArtwork({
												height: parseInt(event.target.value, 10),
											})}/>
									</label>
									<label>medium
										<input type="text" name="medium"
											value={updatingArtwork.medium || ""}
											onChange={(event) => updateArtwork({
												medium: event.target.value,
											})}
										/>
									</label>
									<div className="artworkFramedButtons">
										<label>framed
											<input type="radio" name="framed"
												value="framed"
												checked={updatingArtwork.framed}
												onChange={(event) => updateArtwork({
													framed: event.target.checked,
												})}
											/>
										</label>
										<label>unframed
											<input type="radio" name="framed"
												value="unframed"
												checked={!updatingArtwork.framed}
												onChange={(event) => updateArtwork({
													framed: !event.target.checked,
												})}
											/>
										</label>
									</div>
									<label>price
										<input type="number" name="price"
											value={updatingArtwork.price || ""}
											onChange={(event) => updateArtwork({
												price: parseInt(event.target.value, 10),
											})}/>
									</label>
									<div className="artworkSoldButtons">
										<label>sold
											<input type="radio" name="sold"
												value="sold"
												checked={updatingArtwork.sold}
												onChange={(event) => updateArtwork({
													sold: event.target.checked,
												})}
											/>
										</label>
										<label>unsold
											<input type="radio" name="sold"
												value="unsold"
												checked={!updatingArtwork.sold}
												onChange={(event) => updateArtwork({
													sold: !event.target.checked,
												})}
											/>
										</label>
									</div>
									<div className="updateArtworkButtons">
										<input type="submit" value="submit"/>
										<input type="reset" value="reset"/>
										<input type="button" value="cancel"
											onClick={() => cancelUpdate()}
										/>
										<Mutation mutation={DELETE_ARTWORK}
											update={(cache: any) => {
												const { galleries, artworks } = cache.readQuery({ query: DB_CONTENT });
												cache.writeQuery({
													data: {
														artworks: artworks.filter((artwork: any) =>
															artwork.id !== updatingArtwork.id),
														galleries,
													},
													query: DB_CONTENT,
												});
											}}
											refetchQueries={[{
												query: GALLERY_ARTWORKS,
												variables: {
													galleryId: updatingArtwork.galleryId,
												},
											}, {
												query: GALLERY_ARTWORKS,
											}]}
										>
										{(deleteArtwork: any) => (
											<input type="button" value="remove"
												onClick={() =>
													window.confirm("are you sure you want to remove this artwork?") &&
														deleteArtwork(
															{ variables: { id: updatingArtwork.id } },
														).then(() => removeArtwork())}
											/>
										)}
										</Mutation>
									</div>
								</form>
							</Loading>
						}
					</Mutation>
				}
			</LayoutContext.Consumer>
		);
	}
}

const UPDATE_ARTWORK = gql`
	mutation UpdateArtwork($id: ID!, $input: ArtworkInput) {
		updateArtwork(id: $id, input: $input) {
			id
			galleryId
			title
			width
			height
			medium
			image
			price
			sold
			framed
			recentlyupdatedimage
		}
	}
`;

const DELETE_ARTWORK = gql`
	mutation DeleteArtwork($id: ID!) {
		deleteArtwork(id: $id)
	}
`;

const GALLERY_NAMES = gql`
	{
		getAllGalleries {
			id
			name
		}
	}
`;

// For the image uploading
const urls = new WeakMap();

const blobUrl = (blob: any) => {
	if (urls.has(blob)) {
		return urls.get(blob);
		} else {
		const url = URL.createObjectURL(blob);
		urls.set(blob, url);
		return url;
	}
};
