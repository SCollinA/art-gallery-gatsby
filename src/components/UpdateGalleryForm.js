import React from 'react'
// import { Mutation, gql } from 'apollo-boost'
import { AdminContext } from '../pages/admin';

export default UpdateGalleryForm = () => {
    return (
        <AdminContext.Consumer>
            {({ updatingGallery, selectGallery, changeGallery, submitGallery }) => (
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

// const UPDATE_GALLERY = gql`

// `