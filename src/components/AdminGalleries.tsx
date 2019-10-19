import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import AddGalleries from './AddGalleries';
import AdminContext from '../contexts/adminContext';

export default () => {
    return (
        <AdminContext.Consumer>
            {({ selectGallery, selectedGallery, updatingGallery }) => (
                <div className='AdminGalleries'>
                    <h1>collections</h1>
                    <Query query={ALL_GALLERIES}>
                        {({ data, loading, error }) => (
                            <div className='currentGalleries'>
                                {!loading && 
                                    data.getAllGalleries.map(gallery => (
                                        <div className={`currentGallery${(selectedGallery && gallery.id === selectedGallery.id) ? ' selected' : ''}`} key={gallery.id}
                                            onClick={event => {
                                                event.stopPropagation()
                                                selectGallery({
                                                    id: gallery.id,
                                                    name: gallery.name
                                                })
                                            }}
                                        >
                                            <h3>{updatingGallery.id === gallery.id ? 
                                            updatingGallery.name :
                                            gallery.name}</h3>
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