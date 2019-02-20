import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import AddArtworks from './AddArtworks';

export default AdminArtworks = ({ updatingArtwork }) => {
    return (
        <div className='AdminArtworks'>
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
                        <AddArtworks/>
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