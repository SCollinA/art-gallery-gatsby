import React from 'react'
import { Img } from 'gatsby-image'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import AddArtworks from './AddArtworks';
import AdminContext from '../contexts/adminContext';
// import Loading from './Loading';

export default () => {
    return (
        <AdminContext.Consumer>
            {({ selectedGallery, selectArtwork, updatingArtwork }) => (
                <div className='AdminArtworks'>
                    <h1>artworks</h1>
                    <Query query={GALLERY_ARTWORKS}
                        // selectedGallery && 
                        variables={{
                            galleryId: selectedGallery.id || null,
                        }}
                    >
                        {({ data, loading, error }) => {
                            return (
                            <div className='currentArtworks'>
                                {/* {loading && <Loading/>} */}
                                {(!loading && data.getArtworks) && 
                                    data.getArtworks.map(artwork => (
                                        <div className='currentArtwork' key={artwork.id}
                                            onClick={event => {
                                                event.stopPropagation()
                                                selectArtwork({
                                                    id: artwork.id,
                                                    galleryId: artwork.galleryId,
                                                    title: artwork.title,
                                                    width: artwork.width,
                                                    height: artwork.height,
                                                    medium: artwork.medium,
                                                    image: artwork.image,
                                                    price: artwork.price,
                                                    sold: artwork.sold,
                                                    framed: artwork.framed,
                                                })
                                        }}
                                        >
                                            {/* artwork title */}
                                            <h3>
                                                {updatingArtwork.id === artwork.id ?
                                                updatingArtwork.title :
                                                artwork.title}
                                            </h3>
                                            {/* artwork gallery name */}
                                            {((updatingArtwork.id === artwork.id &&
                                                updatingArtwork.galleryId) || 
                                            (updatingArtwork.id !== artwork.id &&
                                                artwork.galleryId)) && (                                        
                                                <Query query={GET_GALLERY}
                                                    variables={{
                                                        id: updatingArtwork.id === artwork.id ?
                                                        updatingArtwork.galleryId :
                                                        artwork.galleryId
                                                    }}
                                                >
                                                    {({ data: { getGallery }, loading, error }) => (
                                                        <h5>
                                                            {getGallery ? getGallery.name : ''}
                                                        </h5>
                                                    )}
                                                </Query>
                                            )}
                                            {/* artwork image */}
                                            {(artwork.file && (
                                                <Img fluid={artwork.file.childImageSharp.fluid}/>
                                            )) || (
                                            artwork.image && (
                                                <img src={`data:image/jpeg;base64,${updatingArtwork.id === artwork.id ?
                                                    updatingArtwork.image :
                                                    artwork.image}`} alt='uploaded artwork'/>
                                            ))}
                                            <h5>
                                                {`$${updatingArtwork.id === artwork.id ?
                                                updatingArtwork.price :
                                                artwork.price}`}
                                            </h5>
                                            <h5>
                                                {`${(updatingArtwork.id === artwork.id ?
                                                updatingArtwork.sold :
                                                artwork.sold) ? 'sold' : 'unsold'}`}
                                            </h5>
                                        </div>
                                    ))
                                }
                                <AddArtworks/>
                            </div>
                        )}}
                    </Query>
                </div>
            )}
        </AdminContext.Consumer>
    )
}

export const GALLERY_ARTWORKS = gql`
    query GetArtworksForGallery($galleryId: ID) {
        getArtworks(input: { galleryId: $galleryId }) {
            id
            galleryId
            title
            width
            height
            medium
            image
            price
            sold
            framed
        }
    }
`

export const GET_GALLERY = gql`
    query GetGallery($id: ID!) {
        getGallery(id: $id) {
            name
        }
    }
`