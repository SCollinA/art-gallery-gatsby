import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import AddArtworks from './AddArtworks';
import AdminContext from '../contexts/AdminContext';

export default () => {
    return (
        <AdminContext.Consumer>
            {({ selectArtwork, updatingArtwork }) => (
                <div className='AdminArtworks'>
                    <h1>artworks</h1>
                    <Query query={ALL_ARTWORKS}>
                        {({ data, loading, error }) => (
                            <div className='currentArtworks'>
                                {(!loading && data.getAllArtworks) && 
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
                                            {((updatingArtwork.id === artwork.id &&
                                                updatingArtwork.galleryId) ||
                                                artwork.galleryId) && (                                        
                                                <Query query={gql`
                                                        query GetGallery($id: ID!) {
                                                            getGallery(id: $id) {
                                                                name
                                                            }
                                                        }
                                                    `}
                                                    variables={{
                                                        id: updatingArtwork.id === artwork.id ?
                                                        updatingArtwork.galleryId :
                                                        artwork.galleryId
                                                    }}
                                                >
                                                    {({ data, loading, error }) => (
                                                        <h5>
                                                            {!(loading || error) ? 
                                                            data.getGallery.name :
                                                            'no gallery'}
                                                        </h5>
                                                    )}
                                                </Query>
                                            )}
                                            {<img src={`${updatingArtwork.id === artwork.id ?
                                                updatingArtwork.image :
                                                artwork.image}`} alt='uploaded artwork'/>}
                                            <h5>
                                                {updatingArtwork.id === artwork.id ?
                                                updatingArtwork.price :
                                                artwork.price}
                                            </h5>
                                            <h5>
                                                {updatingArtwork.id === artwork.id ?
                                                updatingArtwork.sold :
                                                artwork.sold}
                                            </h5>
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