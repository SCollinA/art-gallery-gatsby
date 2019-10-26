import gql from "graphql-tag";
import React from "react";
import { Mutation } from "react-apollo";

import LayoutContext from "../contexts/layoutContext";

import ArtworkImageDB from "./ArtworkImageDB";
import Loading from "./Loading";
import SectionWrapper from "./SectionWrapper";

export default () => (
	<LayoutContext.Consumer>
		{({ galleries }: any) => (
			<Mutation mutation={CONTACT_MUTATION}>
				{(contactArtist: any, { loading }: any) => (
					<div className="Contact">
						<Loading loading={loading}>
							<SectionWrapper>
								<form className="contactForm"
									onSubmit={(event: any) => {
										event.preventDefault();
										contactArtist({ variables: {
											artwork: event.target.artwork.value,
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
									<label className="contactMessage">message
										<textarea name="message" id="message"></textarea>
									</label>
									<label className="clickable">artwork
										<select name="artwork" id="artwork">
											<option value="-"> - </option>
											{galleries.map(({ id, name, artworks }: any) => (
												<optgroup key={id} label={name}>
													{artworks.map((artwork: any) => (
														<option key={artwork.id} value={artwork.title}>
															{<ArtworkImageDB artwork={artwork}/>}
															{artwork.title}
														</option>),
													)}
												</optgroup>
											))}
										</select>
									</label>
									<label className="clickable">
										<input type="submit" value="submit"/>
									</label>
								</form>
							</SectionWrapper>
						</Loading>
					</div>
				)}
			</Mutation>
		)}
	</LayoutContext.Consumer>
);

const CONTACT_MUTATION = gql`
  mutation ContactArtist($name: String, $contactEmail: String, $message: String, $artwork: String) {
	  contactArtist(name: $name, contactEmail: $contactEmail, message: $message, artwork: $artwork)
  }
`;
