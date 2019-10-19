import React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import AdminContext from '../contexts/adminContext'
import { GALLERY_ARTWORKS, GET_GALLERY } from './AdminArtworks';
import { ALL_GALLERIES } from './AdminGalleries';
import { DB_CONTENT } from './layout';
import Loading from './Loading';

export default () => {
    return (
        <AdminContext.Consumer>
            {({ updatingGallery, changeGallery, submitGallery, resetGallery, removeGallery, selectGallery }) => (
                <Mutation mutation={UPDATE_GALLERY}
                    refetchQueries={[{
                        query: GALLERY_ARTWORKS,
                        variables: { galleryId: updatingGallery.id }
                    },
                    {
                        query: GET_GALLERY,
                        variables: { id: updatingGallery.id }
                    }]}
                >
                    {(updateGallery, { data, loading, error }) => (
                        <>
                        {loading && <Loading/>}
                        <form id='UpdateGalleryForm'
                            onSubmit={event => {
                                event.preventDefault()
                                submitGallery()
                                updateGallery({variables: { 
                                    id: updatingGallery.id,
                                    input: updatingGallery
                                }})
                                // .then(({ gallery })=> selectGallery(updatingGallery))
                            }}
                            onReset={() => resetGallery()}
                            onClick={event => event.stopPropagation()}
                        >
                            <input autoFocus type='text' name='name'
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
                                <Mutation mutation={DELETE_GALLERY}
                                    update={(cache, { data, loading, error }) => {
                                        const { galleries, artworks } = cache.readQuery({ query: DB_CONTENT })
                                        cache.writeQuery({ 
                                            query: DB_CONTENT, 
                                            data: { 
                                                galleries: galleries.filter(gallery => gallery.id !== updatingGallery.id), 
                                                artworks
                                            } 
                                        })
                                    }}
                                    refetchQueries={[{
                                        query: ALL_GALLERIES
                                    }]}
                                >
                                {(deleteGallery, { data, loading, error }) => (
                                    <input type='button' value='remove'
                                        onClick={() => {
                                            window.confirm('are you sure you want to remove this gallery?')
                                            deleteGallery({
                                                variables: {
                                                    id: updatingGallery.id
                                                }
                                            })
                                            .then(() => removeGallery())
                                        }}
                                    />
                                )}
                                </Mutation>
                            </div>
                        </form>
                        </>
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

const DELETE_GALLERY = gql`
    mutation DeleteGallery($id: ID!) {
        deleteGallery(id: $id)
    }
`