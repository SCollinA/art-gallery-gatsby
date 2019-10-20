import gql from "graphql-tag";
import React from "react";
import { Mutation } from "react-apollo";

import LayoutContext from "../contexts/layoutContext";

import Loading from "./Loading";
import PageBreak from "./PageBreak";
import SectionWrapper from "./SectionWrapper";

export default () => (
	<LayoutContext.Consumer>
		{({ galleries }: any) => (
			<Mutation mutation={CONTACT_MUTATION}>
				{(contactArtist: any, { loading }: any) => (
					<div className="Contact">
						{loading && <Loading/>}
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
								<label>name
									<input type="text" name="name" id="name"/>
								</label>
								<label>e-mail
									<input type="text" name="email" id="email"/>
								</label>
								<label className="contactMessage">message
									<textarea name="message" id="message"></textarea>
								</label>
								<label>artwork
									<select name="artwork" id="artwork">
										<option value="-"> - </option>
										{galleries.map(({ id, name, artworks }: any) => (
											<optgroup key={id} label={name}>
												{artworks.map((artwork: any) => (
													<option key={artwork.id} value={artwork.title}>
														{artwork.title}
													</option>),
												)}
											</optgroup>
										))}
									</select>
								</label>
								<label>
									<input type="submit" value="submit"/>
								</label>
							</form>
						</SectionWrapper>
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
