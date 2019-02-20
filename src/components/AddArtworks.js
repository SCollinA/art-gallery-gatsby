import React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

export default () => {
    return (
        <div className='addArtworks'>

                        <Mutation mutation={ADD_ARTWORK}
                            update={(cache, { data: { addArtwork } }) => {
                                const { getAllArtworks } = cache.readQuery({ query: ALL_ARTWORKS });
                                cache.writeQuery({
                                    query: ALL_ARTWORKS,
                                    data: { getAllArtworks: getAllArtworks.concat([addArtwork]) },
                                });
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