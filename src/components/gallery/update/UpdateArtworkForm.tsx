import { useMutation, useQuery } from "@apollo/react-hooks";
import React, { useContext, useEffect, useReducer } from "react";

import AdminContext from "../../../contexts/AdminContext";
import {
	DELETE_ARTWORK,
	GALLERY_NAMES,
	UPDATE_ARTWORK,
} from "../../../graphql/graphql";
import { scrubMetaData } from "../../../utils/utils";

import Loading from "../../reusable/Loading";

enum EArtworkUpdateActionType {
	Cancel = "CANCEL",
	LoadImage = "LOAD_IMAGE",
	RemoveImage = "REMOVE_IMAGE",
	ResetArtwork = "RESET_ARTWORK",
	ResizeImage = "RESIZE_IMAGE",
	ResizeWindow = "RESIZE_WINDOW",
	RotateImage = "ROTATE_IMAGE",
	SetImageVisible = "TOGGLE_IMAGE_VISIBLE",
	SetImageWidthPercent = "SET_IMAGE_WIDTH_PERCENT",
	SubmitArtwork = "SUBMIT_ARTWORK",
}
interface IArtworkUpdateState {
	artworkReset: boolean;
	artworkSubmitted: boolean;
	imageFile: File | Blob | undefined;
	imageHeight: number;
	imageRemoved: boolean;
	imageRotated: boolean;
	imageVisible: boolean;
	imageWidth: number;
	imageWidthPercent: number;
	windowHeight: number;
	windowWidth: number;
}
interface IArtworkUpdateAction extends Partial<IArtworkUpdateState> {
	type: EArtworkUpdateActionType;
}

const imageCanvas = React.createRef<any>();
const artworkImageRef = React.createRef<any>();

const artworkState = {
	artworkReset: false,
	artworkSubmitted: false,
	imageFile: undefined,
	imageHeight: 0,
	imageRemoved: false,
	imageRotated: false,
	imageVisible: false,
	imageWidth: 0,
	imageWidthPercent: 0,
	windowHeight: 0,
	windowWidth: 0,
};
const artworkReducer: React.Reducer<Partial<IArtworkUpdateState>, IArtworkUpdateAction> =
	(state: Partial<IArtworkUpdateState>, action: IArtworkUpdateAction) => {
		switch (action.type) {
			case EArtworkUpdateActionType.Cancel:
				return artworkState;
			case EArtworkUpdateActionType.LoadImage:
				return {
					...state,
					imageFile: action.imageFile,
					imageWidthPercent: 0,
				};
			case EArtworkUpdateActionType.RemoveImage:
				return {
					...state,
					imageFile: undefined,
					imageRemoved: action.imageRemoved,
				};
			case EArtworkUpdateActionType.ResetArtwork:
				return {
					...state,
					artworkReset: action.artworkReset,
				};
			case EArtworkUpdateActionType.ResizeImage:
				return {
					...state,
					imageHeight: action.imageHeight,
					imageWidth: action.imageWidth,
				};
			case EArtworkUpdateActionType.ResizeWindow:
				return {
					...state,
					windowHeight: action.windowHeight,
					windowWidth: action.windowWidth,
				};
			case EArtworkUpdateActionType.RotateImage:
				return {
					...state,
					imageHeight: state.imageWidth,
					imageRotated: action.imageRotated,
					imageWidth: state.imageHeight,
				};
			case EArtworkUpdateActionType.SetImageVisible:
				return {
					...state,
					imageVisible: action.imageVisible,
				};
			case EArtworkUpdateActionType.SetImageWidthPercent:
				return {
					...state,
					imageWidthPercent: action.imageWidthPercent,
				};
			case EArtworkUpdateActionType.SubmitArtwork:
				return {
					...state,
					artworkSubmitted: action.artworkSubmitted,
				};
			default:
				throw new Error("wtf");
		}
	};

export default () => {
	const {
		updatingArtwork,
		updateArtwork,
		submitArtwork,
		resetArtwork,
		removeArtwork,
		cancelUpdate,
	}: any = useContext(AdminContext);
	const [state, dispatch] = useReducer(artworkReducer, artworkState);
	useEffect(loadInitialArtworkImage(updatingArtwork, state, dispatch), [state.imageFile]);
	useEffect(resizeWindow(dispatch), [state.windowHeight, state.windowWidth]);
	useEffect(() => dispatch({
		imageVisible: false,
		type: EArtworkUpdateActionType.SetImageVisible,
	}), [state.imageFile]);
	useEffect(resizeArtwork(state, dispatch), [
		state.imageVisible,
		state.windowWidth,
		state.windowHeight,
		state.imageHeight,
		state.imageWidth,
	]);
	useEffect(() => {
		if (!!state.imageWidthPercent) {
			dispatch({
				imageVisible: true,
				type: EArtworkUpdateActionType.SetImageVisible,
			});
		}
	}, [state.imageWidthPercent]);
	useEffect(rotateImage(state, dispatch), [state.imageRotated]);
	useEffect(removeImage(updateArtwork, state, dispatch), [state.imageRemoved]);
	useEffect(resetArtworkEffect(resetArtwork, state, dispatch), [state.artworkReset]);
	useEffect(submitArtworkEffect(submitArtwork, state, dispatch), [state.artworkSubmitted]);
	const { data: galleryNameData}: any = useQuery(GALLERY_NAMES);
	const [updateArtworkMutation, { loading }] = useMutation(UPDATE_ARTWORK);
	const [deleteArtwork] = useMutation(DELETE_ARTWORK);
	return (
		<Loading loading={loading}>
			<form id="UpdateArtworkForm"
				onSubmit={(event) => {
					event.preventDefault();
					if (!!state.imageFile) {
						const imageCanvasNode = imageCanvas.current;
						const uploadedImageNode = artworkImageRef.current;
						const canvasContext = imageCanvasNode.getContext("2d");
						// draw image takes (img, x, y, w, h)
						// tslint:disable-next-line: max-line-length
						canvasContext.drawImage(uploadedImageNode, 0, 0, state.imageWidth, state.imageHeight);
						imageCanvasNode.toBlob((imageBlob: Blob) => {
							const fr = new FileReader();
							fr.onload = () => {
								const image = btoa(`${fr.result}`);
								if (image) {
									updatingArtwork.image = image;
									updatingArtwork.recentlyupdatedimage = true;
								}
								// updating artwork values will match form values
								updateArtworkMutation({ variables: {
									id: updatingArtwork.id,
									input: scrubMetaData(updatingArtwork),
								}})
								.then(() => {
									dispatch({
										artworkSubmitted: true,
										type: EArtworkUpdateActionType.SubmitArtwork,
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
						.then(() =>
							dispatch({
								artworkSubmitted: true,
								type: EArtworkUpdateActionType.SubmitArtwork,
							}),
						);
					}
				}}
				onReset={() => dispatch({
					artworkReset: true,
					type: EArtworkUpdateActionType.ResetArtwork,
				})}
				onClick={(event) => event.stopPropagation()}
			>
				<label>gallery
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
								event.currentTarget.value = "";
							}}
							onChange={(event: any) => {
								const imageFile = event.target.files[0];
								dispatch({
									imageFile,
									type: EArtworkUpdateActionType.LoadImage,
								});
							}}
						/>
					</label>
					<label>remove image
						<input type="button" value="remove image"
							onClick={(event) => {
								const artworkForm = event.currentTarget.form;
								if (!!artworkForm) {
									artworkForm.image.value = "";
								}
								dispatch({
									imageRemoved: true,
									type: EArtworkUpdateActionType.RemoveImage,
								});
							}}
						/>
					</label>
					<canvas id="imageCanvas" ref={imageCanvas}
						width={state.imageWidth}
						height={state.imageHeight}
						style={{ display: "none" }}
					/>
					<div className="uploadedImage">
						{!!state.imageFile &&
							<img id="uploadedImage" ref={artworkImageRef}
								style={{
									display: state.imageVisible ?
										"block" : "none",
									width: `${state.imageWidthPercent}%`,
								}}
								alt="uploaded profile"
								onLoad={() => {
									if (!state.imageVisible) {
										dispatch({
											imageHeight: artworkImageRef.current.height,
											imageWidth: artworkImageRef.current.width,
											type: EArtworkUpdateActionType.ResizeImage,
										});
									}
								}}
								src={blobUrl(state.imageFile)}
							/>}
					</div>
					<div className="rotateImage"
						onClick={() => dispatch({
							imageRotated: true,
							type: EArtworkUpdateActionType.RotateImage,
						})}
					>
						rotate right
					</div>
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
						onClick={() => {
							dispatch({ type: EArtworkUpdateActionType.Cancel });
							cancelUpdate();
						}}
					/>
					<input type="button" value="remove"
						onClick={() =>
							window.confirm("are you sure you want to remove this artwork?") &&
								deleteArtwork({
									variables: { id: updatingArtwork.id },
								}).then(() => removeArtwork())}
					/>
				</div>
			</form>
		</Loading>
	);
};

const loadInitialArtworkImage =
	(updatingArtwork: any, state: Partial<IArtworkUpdateState>, dispatch: React.Dispatch<IArtworkUpdateAction>) =>
		() => {
			if (!state.imageFile && !state.imageRemoved) {
				if (!!updatingArtwork.image) {
					fetch(`data:image/jpeg;base64,${updatingArtwork.image}`)
						.then((res) => res.blob())
						.then((stuff) => {
							return stuff;
						})
						.then((imageFile) => dispatch({
							imageFile,
							type: EArtworkUpdateActionType.LoadImage,
						}));
				}
			}
		};

const resizeWindow = (dispatch: React.Dispatch<IArtworkUpdateAction>) => {
	const updateWindowDimensions = () => dispatch({
		type: EArtworkUpdateActionType.ResizeWindow,
		windowHeight: window.innerHeight,
		windowWidth: window.innerWidth,
	});
	return () => {
		updateWindowDimensions();
		window.addEventListener("resize", updateWindowDimensions);
		return () => {
			window.removeEventListener("resize", updateWindowDimensions);
		};
	};
};

const resizeArtwork =
	(state: Partial<IArtworkUpdateState>, dispatch: React.Dispatch<IArtworkUpdateAction>) =>
		() => {
			const { imageWidth, imageHeight, windowWidth, windowHeight } = state;
			if (!state.imageVisible &&
				!!imageWidth && !!imageHeight &&
				!!windowWidth && !!windowHeight
			) {
				const imageAspectRatio = imageWidth / imageHeight;
				const screenAspectRatio = windowWidth / windowHeight;
				const correctedImageAspectRatio = imageAspectRatio / screenAspectRatio;
				const imageWidthPercent = correctedImageAspectRatio * 100;
				dispatch({
					imageWidthPercent,
					type: EArtworkUpdateActionType.SetImageWidthPercent,
				});
			}
		};

const rotateImage =
	(state: Partial<IArtworkUpdateState>, dispatch: React.Dispatch<IArtworkUpdateAction>) =>
		() => {
			if (state.imageRotated) {
				// get canvas and image elements from page
				const imageCanvasNode = imageCanvas.current;
				const rotatingImage = artworkImageRef.current;
				const canvasContext = imageCanvasNode.getContext("2d");
				// get whichever element actually exists
				// rotate the canvas, draw the image, and rotate the canvas back
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
						state.imageHeight,
						state.imageWidth,
					);
					canvasContext.restore();
					imageCanvasNode.toBlob((imageBlob: any) => {
						dispatch({
							imageFile: imageBlob,
							type: EArtworkUpdateActionType.LoadImage,
						});
					}, "image/jpeg", 1.0);
				}
			}
		};

const removeImage =
	(updateArtwork: any, state: Partial<IArtworkUpdateState>, dispatch: React.Dispatch<IArtworkUpdateAction>) =>
		() => {
			if (state.imageRemoved) {
				updateArtwork({
					file: null,
					image: null,
					recentlyupdatedimage: false,
				});
				dispatch({
					imageRemoved: false,
					type: EArtworkUpdateActionType.RemoveImage,
				});
			}
		};

const resetArtworkEffect =
	(resetArtwork: any, state: Partial<IArtworkUpdateState>, dispatch: React.Dispatch<IArtworkUpdateAction>) =>
		() => {
			if (state.artworkReset) {
				resetArtwork();
				dispatch({
					artworkReset: false,
					type: EArtworkUpdateActionType.ResetArtwork,
				});
			}
		};

const submitArtworkEffect =
	(submitArtwork: any, state: Partial<IArtworkUpdateState>, dispatch: React.Dispatch<IArtworkUpdateAction>) =>
		() => {
			if (state.artworkSubmitted) {
				submitArtwork();
				dispatch({
					artworkSubmitted: false,
					type: EArtworkUpdateActionType.SubmitArtwork,
				});
			}
		};

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
