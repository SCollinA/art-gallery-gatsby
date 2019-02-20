import React from 'react'
import {  Mutation } from 'react-apollo'
import gql from 'graphql-tag'

export default () => {
    return (
        <div className='AddGalleries'>
            <Mutation mutation={ADD_GALLERY}
                update={(cache, { data: { addGallery } }) => {
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