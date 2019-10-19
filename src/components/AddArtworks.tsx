import React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import AdminContext from '../contexts/adminContext';
import { GALLERY_ARTWORKS } from './AdminArtworks';
import { DB_CONTENT } from './layout';

export default () => {
    return (
        <AdminContext.Consumer>
            {({ selectArtwork, selectedGallery }: any) => (
                    <Mutation mutation={ADD_ARTWORK}
                        variables={{
                            galleryId: selectedGallery.id || null,
                        }}
                        update={(cache: any, { data: { addArtwork } }: any) => {
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
                                framed, 
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
                                framed,
                            })
                            const { galleries, artworks } = cache.readQuery({ query: DB_CONTENT })
                            cache.writeQuery({
                                query: DB_CONTENT,
                                data: { galleries, artworks: [...artworks, addArtwork] }
                            })
                        }}
                        refetchQueries={[{
                            query: GALLERY_ARTWORKS,
                            variables: {
                                galleryId: null,
                            }
                        }]}
                    >
                        {(addArtwork: any, { data, loading, error }: any) => (
                            <div className='AddArtworks'                            
                                onClick={event => {
                                    event.stopPropagation()
                                    addArtwork()
                                }}
                            >
                                <div className='addArtwork'
                                >
                                    <h3> + </h3>
                                </div>
                            </div>
                        )}
                    </Mutation>
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
            framed
        }
    }
`