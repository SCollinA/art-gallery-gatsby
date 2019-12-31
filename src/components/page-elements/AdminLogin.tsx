import gql from "graphql-tag";
import React from "react";
import { Mutation } from "react-apollo";

import AdminContext from "../../contexts/AdminContext";

import Loading from "../reusable/Loading";

export default () => {
	const [showAdmin, setShowAdmin] = React.useState(false);
	return (
		<AdminContext.Consumer>
			{({ isLoggedIn, login, logout }: any) =>
				<Mutation mutation={ADMIN_LOGIN}
					onCompleted={({ login: { token }}: any) => {
						localStorage.setItem("auth-token", token);
						login();
						setShowAdmin(false);
					}}
					onError={(err: any) => {
						window.alert(err.message);
						setShowAdmin(false);
					}}
				>
					{(adminLogin: any, { loading }: any) => (
						<Loading loading={loading}>
							{isLoggedIn &&
								<div className="logout clickable">
									<input type="button" value="logout"
										onClick={() => logout()}
									/>
								</div>}
							{!isLoggedIn &&
								(showAdmin ?
									<form className="AdminLogin"
										onSubmit={(event: any) => {
											event.preventDefault();
											adminLogin({
												variables: {
													adminPassword: event.target.adminPassword.value,
												},
											});
										}}
									>
										<label style={{ display: "none" }}>admin password
											<input autoComplete={"username"} type="text" name="adminUsername" placeholder="no username"/>
										</label>
										<label>admin password
											<input autoFocus autoComplete={"current-password"} type="password" placeholder="not 'password1'" name="adminPassword"/>
										</label>
										<label>submit
											<input type="submit" value="proceed"/>
										</label>
									</form> :
									<p className="adminLoginButton"
										onClick={() => setShowAdmin(true)}
									>
										admin
									</p>)
							}
						</Loading>
					)}
				</Mutation>
			}
		</AdminContext.Consumer>
	);
};

const ADMIN_LOGIN = gql`
mutation AdminLogin($adminPassword: String!) {
	login(password: $adminPassword) {
		token
	}
}
`;
