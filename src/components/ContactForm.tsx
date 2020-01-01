import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { find, get, pipe } from "lodash/fp";
import React, { useState } from "react";
import { Mutation } from "react-apollo";

import LayoutContext from "../contexts/LayoutContext";

import ArtworkImage from "./artwork-images/ArtworkImage";
import Loading from "./reusable/Loading";
import SectionWrapper from "./reusable/SectionWrapper";

export default () => {
	const [selectedArtwork, setSelectedArtwork] = useState(undefined);
	const [contactArtist, { loading }] = useMutation(CONTACT_MUTATION);
	return (
		<LayoutContext.Consumer>
			{({ galleries }: any) =>
				<div className="Contact">
					<Loading loading={loading} fitChild={true}>
						<SectionWrapper>
							<form className="contactForm"
								onSubmit={(event: any) => {
									event.preventDefault();
									const artwork = findSelectedArtworkPipe(
										event.target.artwork.value,
										get("title"),
									)(galleries);
									contactArtist({ variables: {
										artwork,
										contactEmail: event.target.email.value,
										message: event.target.message.value,
										name: event.target.name.value,
									}})
									.then((result: any) => result && window.alert("Thank you for contacting me!"));
									event.target.reset();
								}}
							>
								<label className="clickable">name
									<input type="text" name="name" id="name"/>
								</label>
								<label className="clickable">e-mail
									<input type="text" name="email" id="email"/>
								</label>
								<label className="contactMessage clickable">message
									<textarea name="message" id="message"></textarea>
								</label>
								<label className="clickable">artwork
									<select name="artwork" id="artwork"
										onChange={({target: {value: id}}: any) => {
											const selectedArtworkOption = findSelectedArtworkPipe(id)(galleries);
											setSelectedArtwork(selectedArtworkOption);
										}}
									>
										<option value="-"> - </option>
										{galleries.map(({ id, name, artworks: artworkOptions }: any) => (
											<optgroup key={id} label={name}>
												{artworkOptions.map((artwork: any) => (
													<option key={artwork.id} value={artwork.id}>
														{artwork.title}
													</option>),
												)}
											</optgroup>
										))}
									</select>
								</label>
								<div className="contactArtwork">
									<ArtworkImage artwork={selectedArtwork}/>
								</div>
								<label className="clickable">
									<input type="submit" value="submit"/>
								</label>
							</form>
						</SectionWrapper>
					</Loading>
				</div>
			}
		</LayoutContext.Consumer>
	);
};

const findSelectedArtworkPipe = (id: string, ...args: any): any =>
	pipe(
		find(({artworks}) => find({id}, artworks)),
		get("artworks"),
		find({id}),
		...args,
	);

const CONTACT_MUTATION = gql`
  mutation ContactArtist($name: String, $contactEmail: String, $message: String, $artwork: String) {
	  contactArtist(name: $name, contactEmail: $contactEmail, message: $message, artwork: $artwork)
  }
`;
