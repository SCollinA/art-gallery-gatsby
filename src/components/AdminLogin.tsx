import gql from "graphql-tag";
import React from "react";
import { Mutation } from "react-apollo";
import Loading from "./Loading";

export default ({ adminLogin }: any) => (
    <Mutation mutation={ADMIN_LOGIN}
        onCompleted={({ login: { token }}: any) => {
            localStorage.setItem("auth-token", token);
            adminLogin(true);
        }}
        onError={(err: any) => window.alert(err.message)}
    >
        {(adminLogin: any, { data, loading, error }: any) => (
            <>
            {loading && <Loading/>}
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
            </>
        )}
    </Mutation>
);

const ADMIN_LOGIN = gql`
mutation AdminLogin($adminPassword: String!) {
    login(password: $adminPassword) {
        token
    }
}
`;
