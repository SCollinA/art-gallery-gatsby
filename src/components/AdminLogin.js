import React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Loading from './Loading';

export default ({ adminLogin }) => (
    <Mutation mutation={ADMIN_LOGIN}
        onCompleted={({ login: { token }}) => {
            localStorage.setItem('auth-token', token)
            adminLogin(true)
        }}
        onError={err => window.alert(err.message)}
    >
        {(adminLogin, { data, loading, error }) => (
            <>
            {loading && <Loading/>}
            <form className='AdminLogin'
                onSubmit={event => {
                    event.preventDefault()
                    adminLogin({ 
                        variables: { 
                            adminPassword: event.target.adminPassword.value 
                        } 
                    })
                }}
            >
                <label style={{ display: 'none' }}>admin password
                    <input autoComplete={'username'} type='text' name='adminUsername' placeholder='no username'/>
                </label>
                <label>admin password
                    <input autoFocus autoComplete={'current-password'} type='password' placeholder="not 'password1'" name='adminPassword'/>
                </label>
                <label>submit
                    <input type='submit' value='proceed'/>
                </label>
            </form>
            </>
        )}
    </Mutation>
)

const ADMIN_LOGIN = gql`
mutation AdminLogin($adminPassword: String!) {
    login(password: $adminPassword) {
        token
    }
}
`