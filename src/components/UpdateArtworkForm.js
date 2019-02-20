import React from 'react'
import { Mutation, Query } from 'react-apollo'
import gql from 'graphql-tag'
import { AdminContext } from '../pages/admin'

export default () => {
    return (
        <AdminContext.Consumer>
            {({ updatingArtwork, changeArtwork, submitArtwork, resetArtwork }) => (
                <Mutation mutation={UPDATE_ARTWORK}>
                    {(updateArtwork, { data, loading, error }) => (
                        <form id='UpdateArtworkForm'
                            onSubmit={event => {
                                event.preventDefault()
                                submitArtwork()
                                // updating artwork values will match form values
                                updateArtwork({ variables: {
                                    id: updatingArtwork.id,
                                    input: updatingArtwork
                                }})
                            }}
                            onReset={() => resetArtwork()}
                            onClick={event => event.stopPropagation()}
                        >
                            <label>gallery
                                <Query query={GALLERY_NAMES}>
                                    {({ data, loading, error }) => (
                                        <select name='galleryId'
                                            value={updatingArtwork.galleryId}
                                            onChange={event => changeArtwork({
                                                ...updatingArtwork,
                                                galleryId: event.target.value
                                            })}
                                        >
                                            <option name='galleryId' value={null}>
                                                -
                                            </option>
                                            {data.getAllGalleries.map(gallery => (
                                                <option key={gallery.id} 
                                                    value={gallery.id} 
                                                    name='galleryId'
                                                >
                                                    {gallery.name}
                                                </option>
                                            ))}
                                        </select>
                                    )}
                                </Query>
                            </label>
                            <label>title
                                <input type='text' name='title'
                                    value={updatingArtwork.title}
                                    onChange={event => changeArtwork({
                                        ...updatingArtwork,
                                        title: event.target.value
                                    })}
                                />
                            </label>
                            <label>width
                                <input type='number' name='width'
                                    value={updatingArtwork.width || ''}
                                    onChange={event => changeArtwork({
                                        ...updatingArtwork,
                                        width: event.target.value
                                    })}
                                />
                            </label>
                            <label>height
                                <input type='number' name='height'
                                    value={updatingArtwork.height || ''}
                                    onChange={event => changeArtwork({
                                        ...updatingArtwork,
                                        height: event.target.value
                                    })}/>
                            </label>
                            <label>medium
                                <input type='text' name='medium'
                                    value={updatingArtwork.medium}
                                    onChange={event => changeArtwork({
                                        ...updatingArtwork,
                                        medium: event.target.value
                                    })}
                                />
                            </label>
                            <label>image
                                <input type='file'/>
                            </label>
                            <label>price
                                <input type='number' name='price'
                                    value={updatingArtwork.price || ''}
                                    onChange={event => changeArtwork({
                                        ...updatingArtwork,
                                        price: event.target.value
                                    })}/>
                            </label>
                            <div className='artworkRadioButtons'>
                                <label>sold
                                    <input type='radio' name='sold'
                                        value='sold'
                                        checked={updatingArtwork.sold}
                                        onChange={event => changeArtwork({
                                            ...updatingArtwork,
                                            sold: event.target.checked
                                        })}
                                    />
                                </label>
                                <label>unsold
                                    <input type='radio' name='sold'
                                        value='unsold'
                                        checked={!updatingArtwork.sold}
                                        onChange={event => changeArtwork({
                                            ...updatingArtwork,
                                            sold: !event.target.checked
                                        })}
                                    />
                                </label>
                            </div>
                            <div className='updateArtworkButtons'>
                                <input type='submit' value='submit'/>
                                <input type='reset' value='reset'/>
                                <input type='button' value='cancel'
                                    onClick={() => submitArtwork()}
                                />
                            </div>
                        </form>
                    )}
                </Mutation>
            )}
        </AdminContext.Consumer>
    )
}

const UPDATE_ARTWORK = gql`
    mutation UpdateArtwork($id: ID!, $input: ArtworkInput!){
        updateArtwork(id: $id, input: $input) {
            id
            galleryId
            title
            width
            height
            medium
            image
            price
            sold
        }
    }
`

const GALLERY_NAMES = gql`
    {
        getAllGalleries {
            id
            name
        }
    }
`