import React from 'react'
import {  Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import AdminContext from '../contexts/AdminContext'
import { ALL_GALLERIES } from './AdminGalleries'

export default () => {
    return (
        <AdminContext.Consumer>
            {({ selectGallery }) => (
                <div className='AddGalleries'>
                    <Mutation mutation={ADD_GALLERY}
                        update={(cache, { data: { addGallery } }) => {
                            // immediately select the gallery for updating
                            const { id, name } = addGallery
                            selectGallery({
                                id,
                                name
                            })
                            const { getAllGalleries } = cache.readQuery({ query: ALL_GALLERIES })
                            cache.writeQuery({
                                query: ALL_GALLERIES,
                                data: { getAllGalleries: getAllGalleries.concat([addGallery]) },
                            })
                        }}
                        >
                        {(addGallery, { data }) => (
                            <div className='addGallery'
                                onClick={addGallery}
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

const ADD_GALLERY = gql`
    mutation {
        addGallery(input: { name: "new gallery" }) {
            id
            name
        }
    }
`