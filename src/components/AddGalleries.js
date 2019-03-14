import React from 'react'
import {  Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import AdminContext from '../contexts/AdminContext'
// import { ALL_GALLERIES } from './AdminGalleries'
import { DB_CONTENT } from './layout';

export default () => {
    return (
        <AdminContext.Consumer>
            {({ selectGallery }) => (
                <Mutation mutation={ADD_GALLERY}
                    update={(cache, { data: { addGallery } }) => {
                        // immediately select the gallery for updating
                        const { id, name } = addGallery
                        // select once to get artwork
                        selectGallery({
                            id,
                            name
                        })
                        // select again to make available for editing
                        selectGallery({
                            id,
                            name
                        })
                        const { galleries, artworks } = cache.readQuery({ query: DB_CONTENT })
                        cache.writeQuery({
                            query: DB_CONTENT,
                            data: { galleries: galleries.concat([addGallery]), artworks },
                        })
                    }}
                    >
                    {(addGallery, { data }) => (
                        <div className='AddGalleries'
                            onClick={addGallery}
                        >
                            <div className='addGallery'>
                                <h3> + </h3>
                            </div>
                        </div>
                    )}
                </Mutation>
            )}
        </AdminContext.Consumer>
    )
}

const ADD_GALLERY = gql`
    mutation {
        addGallery(input: { name: "new collection" }) {
            id
            name
        }
    }
`