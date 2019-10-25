import gql from "graphql-tag";
import React from "react";
import { Mutation } from "react-apollo";

import AdminContext from "../contexts/adminContext";

import Loading from "./Loading";

export default () => (
	<AdminContext.Consumer>
		{({ isLoggedIn, setIsLoggedIn }: any) => (
			<Mutation mutation={ADMIN_LOGIN}
				onCompleted={({ login: { token }}: any) => {
					localStorage.setItem("auth-token", token);
					setIsLoggedIn(true);
				}}
				onError={(err: any) => window.alert(err.message)}
			>
				{(adminLogin: any, { loading }: any) => (
					<Loading loading={loading}>
						{isLoggedIn ?
							<div className="logout">
								<input type="button" value="logout"
									onClick={() => setIsLoggedIn(false)}
								/>
							</div> :
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
							</form>
						}
					</Loading>
				)}
			</Mutation>
		)}
	</AdminContext.Consumer>
);

const ADMIN_LOGIN = gql`
mutation AdminLogin($adminPassword: String!) {
	login(password: $adminPassword) {
		token
	}
}
`;
