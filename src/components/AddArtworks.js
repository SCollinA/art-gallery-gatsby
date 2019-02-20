import React from 'react'
import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'

export default () => {
    return (
        <div className='addArtworks'>
            <h1>artworks</h1>
            <Query query={ALL_ARTWORKS}>
                {({ data, loading, error }) => (
                    <div className='currentArtworks'>
                        {!loading && 
                            data.getAllArtworks.map(artwork => (
                                <div className='currentArtwork' key={artwork.id}>
                                    <h3>{artwork.title}</h3>
                                </div>
                            ))
                        }
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
                )}
            </Query>
        </div>
    )
}


export const ALL_ARTWORKS = gql`
    {
        getAllArtworks {
            id
            title
        }
    }
`

const ADD_ARTWORK = gql`
    mutation {
        addArtwork(input: { title: "new artwork" }) {
            id
            title
        }
    }
`