import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import AddGalleries from './AddGalleries';
import { AdminContext } from '../pages/admin';

export default ({ updatingGallery }) => {
    return (
        <AdminContext.Consumer>
            {({ selectGallery }) => (
                <div className='AdminGalleries'>
                    <h1>galleries</h1>
                    <Query query={ALL_GALLERIES}>
                        {({ data, loading, error }) => (
                            <div className='currentGalleries'>
                                {!loading && 
                                    data.getAllGalleries.map(gallery => (
                                        <div className='currentGallery' key={gallery.id}
                                            onClick={() => selectGallery(gallery)}
                                        >
                                            <h3>{gallery.name}</h3>
                                        </div>
                                    ))
                                }
                                <AddGalleries/>
                            </div>
                        )}
                    </Query>
                </div>
            )}
        </AdminContext.Consumer>
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