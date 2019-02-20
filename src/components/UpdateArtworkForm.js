import React from 'react'
import { Mutation, gql } from 'react-apollo'
import { AdminContext } from '../pages/admin'
import { Mutation } from 'react-apollo';

export default UpdateArtworkForm = () => {
    return (
        <AdminContext.Consumer>
            {({ updatingArtwork, selectArtwork, changeArtwork, submitArtwork }) => (
                <Mutation mutation={UPDATE_ARTWORK}>
                {(updateArtwork, { data, loading, error }) => (
                    <form 
                        onSubmit={event => {
                            event.preventDefault()
                            submitArtwork()
                            // updating artwork values will match form values
                            updateArtwork({ variables: updatingArtwork })
                        }}
                        onReset={() => selectArtwork()}
                    >
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
                                value={updatingArtwork.width}
                                onChange={event => changeArtwork({
                                    ...updatingArtwork,
                                    width: event.target.value
                                })}
                            />
                        </label>
                        <label>height
                            <input type='number' name='height'
                                value={updatingArtwork.height}
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
                                value={updatingArtwork.price}
                                onChange={event => changeArtwork({
                                    ...updatingArtwork,
                                    price: event.target.value
                                })}/>
                        </label>
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
                        <input type='submit' value='submit'/>
                        <input type='reset' value='reset'/>
                    </form>
                )}
                </Mutation>
            )}
        </AdminContext.Consumer>
    )
}

const UPDATE_ARTWORK = gql`
    mutation UpdateArtwork($ID: String, $input: {
        id: String,
        galleryId: String,
        title: String,
        width: Int,
        height: Int,
        medium: String,
        image: String,
        price: Float,
        sold: Boolean
    }){
        updateArtwork(id: $ID, input: $input) {
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