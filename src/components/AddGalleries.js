import React from 'react'
import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'

export default () => {
    return (
        <div className='addGalleries'>
            <h1>galleries</h1>
            <Query query={ALL_GALLERIES}>
                {({ data, loading, error }) => (
                    <div className='currentGalleries'>
                        {!loading && 
                            data.getAllGalleries.map(gallery => (
                                <div className='currentGallery' key={gallery.id}>
                                    <h3>{gallery.name}</h3>
                                </div>
                            ))
                        }
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
                )}
            </Query>
        </div>
    )
}

export const ALL_GALLERIES = gql`
    {
        getAllGalleries {
            id
            name
        }
    }
`

const ADD_GALLERY = gql`
    mutation {
        addGallery(input: { name: "new gallery" }) {
            id
            name
        }
    }
`