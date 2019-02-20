import React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { AdminContext } from '../pages/admin'

export default () => {
    return (
        <AdminContext.Consumer>
            {({ updatingGallery, changeGallery, submitGallery, resetGallery }) => (
                <Mutation mutation={UPDATE_GALLERY}>
                    {(updateGallery, { data, loading, error }) => (
                        <form id='UpdateGalleryForm'
                            onSubmit={event => {
                                event.preventDefault()
                                submitGallery()
                                updateGallery({variables: { 
                                    id: updatingGallery.id,
                                    input: updatingGallery
                                }})
                            }}
                            onReset={() => resetGallery()}
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
                                onClick={() => submitGallery()}
                            />
                        </form>
                    )}
                </Mutation>
            )}
        </AdminContext.Consumer>
    )
}

const UPDATE_GALLERY = gql`
    mutation UpdateGallery($id: ID!, $input: GalleryInput!) {
        updateGallery(id: $id, input: $input) {
            id
            name
        }
    }
`