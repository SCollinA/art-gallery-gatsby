import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import AddGalleries from './AddGalleries';
import AdminContext from '../contexts/AdminContext';

export default () => {
    return (
        <AdminContext.Consumer>
            {({ selectGallery, updatingGallery }) => (
                <div className='AdminGalleries'>
                    <h1>galleries</h1>
                    <Query query={ALL_GALLERIES}>
                        {({ data, loading, error }) => {
                            console.log(data)
                            return (
                                <div className='currentGalleries'>
                                    {!loading && 
                                        data.getAllGalleries.map(gallery => (
                                            <div className='currentGallery' key={gallery.id}
                                                onClick={() => selectGallery({
                                                    id: gallery.id,
                                                    name: gallery.name
                                                })}
                                            >
                                                <h3>{updatingGallery.id === gallery.id ? 
                                                updatingGallery.name :
                                                gallery.name}</h3>
                                            </div>
                                        ))
                                    }
                                    <AddGalleries/>
                                </div>
                            )
                        }}
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