import React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import AdminContext from '../contexts/AdminContext';
import { GALLERY_ARTWORKS } from './AdminArtworks';
import { DB_CONTENT } from './layout';

export default () => {
    return (
        <AdminContext.Consumer>
            {({ selectArtwork, selectedGallery }) => (
                <div className='AddArtworks'>
                    <Mutation mutation={ADD_ARTWORK}
                        variables={selectedGallery && {
                            galleryId: selectedGallery.id,
                        }}
                        update={(cache, { data: { addArtwork } }) => {
                            // get only needed variables, i.e. no '__typename'
                            const { 
                                id,
                                galleryId, 
                                title, 
                                width, 
                                height, 
                                image, 
                                medium, 
                                price, 
                                sold } = addArtwork
                            selectArtwork({
                                id, 
                                galleryId,
                                title,
                                width,
                                height,
                                image,
                                medium,
                                price,
                                sold,
                            })
                            const { galleries, artworks } = cache.readQuery({ query: DB_CONTENT })
                            cache.writeQuery({
                                query: DB_CONTENT,
                                data: { galleries, artworks: [...artworks, addArtwork] }
                            })
                        }}
                        refetchQueries={[{
                            query: GALLERY_ARTWORKS,
                        }]}
                    >
                        {(addArtwork, { data, loading, error }) => (
                            <div className='addArtwork'
                                onClick={event => {
                                    event.stopPropagation()
                                    addArtwork()
                                }}
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