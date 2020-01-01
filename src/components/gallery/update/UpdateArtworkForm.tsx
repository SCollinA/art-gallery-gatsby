import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { filter, find, get, map } from "lodash/fp";
import React, { useContext, useEffect, useState } from "react";

import AdminContext from "../../../contexts/AdminContext";
import LayoutContext from "../../../contexts/LayoutContext";
import {
	DB_CONTENT,
	GALLERY_ARTWORKS,
} from "../../../graphql/graphql";
import { scrubMetaData } from "../../../utils/utils";

import ArtworkImage from "../../artwork-images/ArtworkImage";
import Loading from "../../reusable/Loading";

const imageCanvas = React.createRef<any>();
const artworkImageRef = React.createRef<any>();

export default () => {
	const {
		updatingArtwork,
		updateArtwork,
		submitArtwork,
		resetArtwork,
		removeArtwork,
		cancelUpdate,
	}: any = useContext(AdminContext);
	const {
		selectArtwork,
		selectedArtwork,
		selectGallery,
		selectedGallery,
	}: any = useContext(LayoutContext);
	const [state, setState] = useState({
			imageFile: new Blob(),
			imageHeight: 0,
			imageLoaded: false,
			imageRemoved: false,
			imageReset: false,
			imageRotated: true,
			imageSubmitted: false,
			imageWidth: 0,
			windowHeight: 0,
			windowWidth: 0,
		});
	useEffect(() => {
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
				// convert canvas contents to blob
				imageCanvasNode.toBlob((imageBlob: any) => {
					setState({
						...state,
						imageFile: imageBlob,
					});
				}, "image/jpeg", 1.0);
			}
		}
	}, [state.imageRotated, state.imageFile]);
	useEffect(() => {
		if (artworkImageRef.current) {
			artworkImageRef.current.style.display = "block";
			const { imageWidth, imageHeight, windowHeight } = state;
			artworkImageRef.current.style.maxWidth =
				imageWidth / imageHeight >= 1 ? // is it wider than tall?
			"25%" : `${(windowHeight * .25) * imageWidth / imageHeight}px`;
		}
	},
		[state.imageWidth, state.imageHeight, state.windowWidth, state.windowHeight],
	);
	useEffect(
		() => state.imageRemoved ?
			updateArtwork({ ...updatingArtwork, image: null }) :
			undefined,
		[state.imageRemoved],
	);
	useEffect(
		() => state.imageReset ?
			resetArtwork() :
			undefined,
		[state.imageReset],
	);
	useEffect(
		() => state.imageSubmitted ?
			submitArtwork() :
			undefined,
		[state.imageSubmitted],
	);
	const updateWindowDimensions = () => {
		setState({
			...state,
			windowHeight: window.innerHeight,
			windowWidth: window.innerWidth,
		});
	};
	useEffect(() => {
		updateWindowDimensions();
		window.addEventListener("resize", updateWindowDimensions);
		if (updatingArtwork.image) {
			fetch(`data:image/jpeg;base64,${updatingArtwork.image}`)
				.then((res) => res.blob())
				.then((blob) => setState({
					...state,
					imageFile: blob,
					imageLoaded: true,
				}));
		}
		return () => {
			window.removeEventListener("resize", updateWindowDimensions);
		};
	}, [state.imageLoaded]);
	const [updateArtworkMutation, { loading }] = useMutation(UPDATE_ARTWORK, {
		update(cache: any, { data: { updateArtwork: updatedArtworkData }}: any) {
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
			selectArtwork(updatedArtwork);
		},
	});
	const { data: galleryNameData}: any = useQuery(GALLERY_NAMES);
	const [deleteArtwork] = useMutation(DELETE_ARTWORK, {
		update(cache: any) {
			const { getArtworks: galleryArtworks } = cache.readQuery({
				query: GALLERY_ARTWORKS,
				variables: {
					galleryId: updatingArtwork.galleryId,
				},
			});
			selectGallery({
				...selectedGallery,
				artworks: galleryArtworks.filter((artwork: any) =>
							artwork.id !== updatingArtwork.id),
			});
		},
	});
	console.log(updatingArtwork);
	return (
		<Loading loading={loading}>
			<form id="UpdateArtworkForm"
				onSubmit={(event) => {
					event.preventDefault();
					if (state.imageLoaded) {
						const imageCanvasNode = imageCanvas.current;
						const uploadedImageNode = artworkImageRef.current;
						const canvasContext = imageCanvasNode.getContext("2d");
						// draw image takes (img, x, y, w, h)
						// tslint:disable-next-line: max-line-length
						canvasContext.drawImage(uploadedImageNode, 0, 0, state.imageWidth, state.imageHeight);
						imageCanvasNode.toBlob((imageBlob: any) => {
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
									setState({
										...state,
										imageFile: new Blob(),
										imageLoaded: false,
										imageSubmitted: true,
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
							setState({
								...state,
								imageFile: new Blob(),
								imageLoaded: false,
								imageSubmitted: true,
							}),
						);
					}
				}}
				onReset={() =>
					setState({
						...state,
						imageFile: new Blob(),
						imageLoaded: false,
						imageReset: true,
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
								const imageLoaded = !!imageFile;
								setState({
									...state,
									imageHeight: 0,
									imageLoaded: false,
									imageWidth: 0,
								});
								setState({
									...state,
									imageFile,
								});
								setState({
									...state,
									imageLoaded,
								});
								if (!imageFile) {
									setState({
										...state,
										imageHeight: 0,
										imageWidth: 0,
									});
								}
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
								setState({
									...state,
									imageFile: new Blob(),
									imageHeight: 0,
									imageLoaded: false,
									imageRemoved: true,
									imageWidth: 0,
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
						{state.imageLoaded ?
							<img id="uploadedImage" ref={artworkImageRef}
								style={{ display: "none"}}
								alt="uploaded profile"
								onLoad={() => {
									if (!state.imageWidth) {
										setState({
											...state,
											imageHeight: artworkImageRef.current.height,
											imageWidth: artworkImageRef.current.width,
										});
									}
								}}
								src={blobUrl(state.imageFile)}
							/> :
							<ArtworkImage artwork={updatingArtwork}
								imageRef={artworkImageRef}
							/>
						}
					</div>
					<div className="rotateImage"
						onClick={() => {
							// have to get current image height and width
							setState({
								...state,
								imageHeight: state.imageWidth,
								imageRotated: true,
								imageWidth: state.imageHeight,
							});
							setState({
								...state,
								imageRotated: false,
							});
						}}
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
						onClick={() => cancelUpdate()}
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
