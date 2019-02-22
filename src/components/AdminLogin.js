import React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

export default ({ adminLogin }) => (
    <Mutation mutation={ADMIN_LOGIN}
        onCompleted={({ login: { token }}) => {
            localStorage.setItem('auth-token', token)
            adminLogin(true)
        }}
    >
        {(adminLogin, { data, loading, error }) => (
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
                <label>admin password
                    <input type='password' placeholder="not 'password1'" name='adminPassword'/>
                </label>
                <label>submit
                    <input type='submit' value='proceed'/>
                </label>
            </form>
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