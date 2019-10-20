import gql from "graphql-tag";
import React from "react";
import { Mutation } from "react-apollo";
import LayoutContext from "../contexts/layoutContext";
import Loading from "./Loading";

export default () => (
	<div className="Contact">
		<LayoutContext.Consumer>
			{({ galleries }: any) => (
				<>
					<div className="pageHeader">
						<h1>contact</h1>
					</div>
					<Mutation mutation={CONTACT_MUTATION}>
						{(contactArtist: any, { data, loading, error }: any) => {
							return (
							<>
							{loading && <Loading/>}
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
								<label>message
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
								<input type="submit" value="submit"/>
							</form>
						</>
						); }}
					</Mutation>
				</>
			)}
		</LayoutContext.Consumer>
	</div>
);

const CONTACT_MUTATION = gql`
  mutation ContactArtist($name: String, $contactEmail: String, $message: String, $artwork: String) {
	  contactArtist(name: $name, contactEmail: $contactEmail, message: $message, artwork: $artwork)
  }
`;
