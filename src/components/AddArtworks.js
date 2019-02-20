import React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import AdminContext from '../pages/admin';
import { ALL_ARTWORKS } from './AdminArtworks'

export default () => {
    return (
        <AdminContext.Consumer>
            {({ selectArtwork }) => (
                <div className='AddArtworks'>
                    <Mutation mutation={ADD_ARTWORK}
                        update={(cache, { data: { addArtwork } }) => {
                            // select the new artwork for updating immediately
                            const { id, galleryId, title, width, height, medium, price, sold } = addArtwork
                            selectArtwork({
                                id,
                                galleryId,
                                title,
                                width,
                                height,
                                medium,
                                price,
                                sold
                            })
                            const { getAllArtworks } = cache.readQuery({ query: ALL_ARTWORKS })
                            cache.writeQuery({
                                query: ALL_ARTWORKS,
                                data: { getAllArtworks: getAllArtworks.concat([addArtwork]) },
                            })
                        }}
                    >
                        {(addArtwork, { data }) => (
                            <div className='addArtwork'
                                onClick={addArtwork}
                            >
                                <h3> + </h3>
                            </div>
                        )}
                    </Mutation>
                </div>
            )}
        </AdminContext.Consumer>
    )
}

const ADD_ARTWORK = gql`
    mutation {
        addArtwork(input: { title: "new artwork" }) {
            id
            title
        }
    }
`