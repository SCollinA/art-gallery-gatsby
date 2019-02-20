import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import AddArtworks from './AddArtworks';
import { AdminContext } from '../pages/admin';

export default () => {
    return (
        <AdminContext.Consumer>
            {({ selectArtwork, updatingArtwork }) => (
                <div className='AdminArtworks'>
                    <h1>artworks</h1>
                    <Query query={ALL_ARTWORKS}>
                        {({ data, loading, error }) => (
                            <div className='currentArtworks'>
                                {!loading && 
                                    data.getAllArtworks.map(artwork => (
                                        <div className='currentArtwork' key={artwork.id}
                                            onClick={() => selectArtwork({
                                                id: artwork.id,
                                                galleryId: artwork.galleryId,
                                                title: artwork.title,
                                                width: artwork.width,
                                                height: artwork.height,
                                                medium: artwork.medium,
                                                image: artwork.image,
                                                price: artwork.price,
                                                sold: artwork.sold
                                            })}
                                        >
                                            <h3>
                                                {updatingArtwork.id === artwork.id ?
                                                updatingArtwork.title :
                                                artwork.title}
                                            </h3>
                                            <h3>
                                                {updatingArtwork.id === artwork.id ?
                                                updatingArtwork.galleryId :
                                                artwork.galleryId}
                                            </h3>
                                            <h3>
                                                {updatingArtwork.id === artwork.id ?
                                                updatingArtwork.image :
                                                artwork.image}
                                            </h3>
                                            <h3>
                                                {updatingArtwork.id === artwork.id ?
                                                updatingArtwork.price :
                                                artwork.price}
                                            </h3>
                                            <h3>
                                                {updatingArtwork.id === artwork.id ?
                                                updatingArtwork.sold :
                                                artwork.sold}
                                            </h3>
                                        </div>
                                    ))
                                }
                                <AddArtworks/>
                            </div>
                        )}
                    </Query>
                </div>
            )}
        </AdminContext.Consumer>
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