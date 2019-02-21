import React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import AdminContext from '../contexts/AdminContext';
import { GALLERY_ARTWORKS } from './AdminArtworks'

export default () => {
    return (
        <AdminContext.Consumer>
            {({ selectArtwork, selectedGallery }) => (
                <div className='AddArtworks'>
                    <Mutation mutation={ADD_ARTWORK}
                        variables={{
                            galleryId: selectedGallery ? selectedGallery.id : ''
                        }}
                        update={(cache, { data: { addArtwork } }) => {
                            // select the new artwork for updating immediately
                            const { id, galleryId, title, width, height, image, medium, price, sold } = addArtwork
                            selectArtwork({
                                id,
                                galleryId,
                                title,
                                width,
                                height,
                                image,
                                medium,
                                price,
                                sold
                            })
                            const { getArtworks } = cache.readQuery({ query: GALLERY_ARTWORKS })
                            cache.writeQuery({
                                query: GALLERY_ARTWORKS,
                                data: { getArtworks: getArtworks.concat([addArtwork]) },
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
    mutation AddArtwork($galleryId: ID){
        addArtwork(input: { title: "new artwork", galleryId: $galleryId }) {
            id
            galleryId
            title
            width
            height
            image
            medium
            price
            sold
        }
    }
`