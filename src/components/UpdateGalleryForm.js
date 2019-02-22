import React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import AdminContext from '../contexts/AdminContext'
import { GALLERY_ARTWORKS } from './AdminArtworks';

export default () => {
    return (
        <AdminContext.Consumer>
            {({ updatingGallery, changeGallery, submitGallery, resetGallery, removeGallery, selectGallery }) => (
                <Mutation mutation={UPDATE_GALLERY}
                    refetchQueries={[{
                        query: GALLERY_ARTWORKS,
                        variables: { id: updatingGallery.id }
                    }]}
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
                                .then(({ gallery })=> selectGallery(updatingGallery))
                            }}
                            onReset={() => resetGallery()}
                            onClick={event => event.stopPropagation()}
                        >
                            <input type='text' name='name'
                                value={updatingGallery.name}
                                onChange={event => changeGallery({
                                    ...updatingGallery,
                                    name: event.target.value
                                })}
                            />
                            <div className='updateGalleryButtons'>
                                <input type='submit' value='submit'/>
                                <input type='reset' value='reset'/>
                                <input type='button' value='cancel'
                                    onClick={() => submitGallery()}
                                />
                            </div>
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