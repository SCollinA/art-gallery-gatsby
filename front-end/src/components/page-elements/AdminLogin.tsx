import { useMutation } from "@apollo/react-hooks";
import React, { useContext, useState } from "react";

import AdminContext from "../../contexts/AdminContext";
import { ADMIN_LOGIN } from "../../graphql/graphql";

import Loading from "../reusable/Loading";

export default () => {
	const [showAdmin, setShowAdmin] = useState(false);
	const {
		isLoggedIn,
		login,
		logout,
	}: any = useContext(AdminContext);
	const [adminLogin, { loading }] = useMutation(ADMIN_LOGIN, {
		onCompleted({ login: { token }}: any) {
			localStorage.setItem("auth-token", token);
			login();
			setShowAdmin(false);
		},
		onError(err: any) {
			window.alert(err.message);
			setShowAdmin(false);
		},
	});
	return (
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
	);
};
