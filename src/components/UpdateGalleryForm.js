import React from 'react'
import { Mutation, gql } from 'apollo-boost'
import { AdminContext } from '../pages/admin'

export default UpdateGalleryForm = () => {
    return (
        <AdminContext.Consumer>
            {({ updatingGallery, selectGallery, changeGallery, submitGallery }) => (
                <Mutation mutation={UPDATE_GALLERY}>
                    {(updateGallery, { data, loading, error }) => (
                        <form
                            onSubmit={event => {
                                event.preventDefault()
                                submitGallery()
                                updateGallery({variables: { 
                                    id: updatingGallery.id,
                                    input: updatingGallery
                                }})
                            }}
                        >
                            <input type='text' name='name'
                                value={updatingGallery.name}
                                onChange={event => changeGallery({
                                    ...updatingGallery,
                                    name: event.target.value
                                })}
                            />
                            <input type='submit' value='submit'/>
                            <input type='reset' value='reset'/>
                            <input type='button' value='cancel'
                                onClick={() => selectGallery()}
                            />
                        </form>
                    )}
                </Mutation>
            )}
        </AdminContext.Consumer>
    )
}

const UPDATE_GALLERY = gql`
    mutation UpdateGallery($ID: String, $input: {
        id: String,
        name: String
    }) {
        updateGallery(id: $ID, input: $input) {
            id
            name
        }
    }
`