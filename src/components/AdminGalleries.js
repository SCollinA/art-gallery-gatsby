import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import AddGalleries from './AddGalleries';

export default AdminGalleries = ({ updatingGallery }) => {
    return (
        <div className='AdminGalleries'>
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
                        <AddGalleries/>
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