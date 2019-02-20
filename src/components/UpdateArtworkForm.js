import React from 'react'
// import { Mutation, gql } from 'react-apollo'
import { AdminContext } from '../pages/admin'

export default UpdateArtworkForm = () => {
    return (
        <AdminContext.Consumer>
            {() => (
                <form>
                    <input/>
                    <input/>
                    <input/>
                    <input/>
                    <input type='submit'/>
                </form>
            )}
        </AdminContext.Consumer>
    )
}