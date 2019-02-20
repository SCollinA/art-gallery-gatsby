import React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { AdminContext } from '../pages/admin'
import { ALL_GALLERIES } from './AdminGalleries';

export default () => {
    return (
        <AdminContext.Consumer>
            {({ updatingGallery, selectGallery, changeGallery, submitGallery }) => (
                <Mutation mutation={UPDATE_GALLERY}
                    update={(cache, { data: { updateGallery } }) => {
                        const { getAllGalleries } = cache.readQuery({ query: ALL_GALLERIES })
                        cache.writeQuery({
                            query: ALL_GALLERIES,
                            data: { getAllGalleries: getAllGalleries.concat([updateGallery]) },
                        })
                    }}
                >
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
    mutation UpdateGallery($ID: String, $input: GalleryInput) {
        updateGallery(id: $ID, input: $input) {
            id
            name
        }
    }
`