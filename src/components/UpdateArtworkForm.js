import React from 'react'
import Img from 'gatsby-image'
import { Mutation, Query } from 'react-apollo'
import gql from 'graphql-tag'
import AdminContext from '../contexts/AdminContext'
// import { GALLERY_ARTWORKS } from './AdminArtworks';
import { DB_CONTENT } from './layout'

export default class UpdateArtworkForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            imageFile: null,
            imageLoaded: false,
        }
    }

    render() {
        const { updatingArtwork, changeArtwork, submitArtwork, resetArtwork } = this.context
        console.log(updatingArtwork)
        return (
            <Mutation mutation={UPDATE_ARTWORK}
                update={(cache, { data: { updateArtwork }, loading, error }) => {
                    console.log(updateArtwork)
                    const { galleries, artworks } = cache.readQuery({ query: DB_CONTENT })
                    cache.writeQuery({
                        query: DB_CONTENT,
                        data: { galleries, artworks: artworks.filter(artwork => artwork.id !== updateArtwork.id).concat([updateArtwork]) },
                    })
                }}
                // refetchQueries={() => [{
                //     query: DB_CONTENT,
                // }]}
            >
                {(updateArtwork, { data, loading, error }) => {
                    return (
                    <form id='UpdateArtworkForm'
                        onSubmit={event => {
                            event.preventDefault()
                            if (this.state.imageLoaded) {
                                const imageCanvas = document.getElementById('imageCanvas')
                                const uploadedImage = document.getElementById('uploadedImage')
                                const canvasContext = imageCanvas.getContext('2d')
                                // draw image takes (img, x, y, w, h)
                                canvasContext.drawImage(uploadedImage, 0, 0, 1000, 1000)
                                imageCanvas.toBlob((imageBlob) => {
                                    const fr = new FileReader()
                                    fr.onload = () => {
                                        const image = btoa(fr.result)
                                        // console.log(typeof image, fr.result.length)
                                        // updating artwork values will match form values
                                        updateArtwork({ variables: {
                                            id: updatingArtwork.id,
                                            input: {
                                                ...updatingArtwork, 
                                                image
                                            }
                                        }})
                                        .then(data => {
                                            this.setState({
                                                imageFile: null,
                                                imageLoaded: false,
                                            }, () => {
                                                submitArtwork()
                                            })
                                        })
                                        .catch(console.log)
                                    }
                                    fr.readAsBinaryString(imageBlob)
                                }, 'image/jpeg')
                            } else {
                                // updating artwork values will match form values
                                updateArtwork({ variables: {
                                    id: updatingArtwork.id,
                                    input: updatingArtwork
                                }})
                                .then(() => {
                                    this.setState({
                                        imageFile: null,
                                        imageLoaded: false,
                                    }, () => {
                                        submitArtwork()
                                    })
                                })
                            }
                        }}
                        onReset={() => resetArtwork()}
                        onClick={event => event.stopPropagation()}
                    >
                        <label>gallery
                            <Query query={GALLERY_NAMES}>
                                {({ data, loading, error }) => (
                                    <select name='galleryId'
                                        value={updatingArtwork.galleryId}
                                        onChange={event => changeArtwork({
                                            ...updatingArtwork,
                                            galleryId: event.target.value
                                        })}
                                    >
                                        <option name='galleryId' value={-1}>
                                            -
                                        </option>
                                        {data.getAllGalleries.map(gallery => (
                                            <option key={gallery.id} 
                                                value={gallery.id} 
                                                name='galleryId'
                                            >
                                                {gallery.name}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            </Query>
                        </label>
                        <label>title
                            <input type='text' name='title'
                                value={updatingArtwork.title}
                                onChange={event => changeArtwork({
                                    ...updatingArtwork,
                                    title: event.target.value
                                })}
                            />
                        </label>
                        <label>width
                            <input type='number' name='width'
                                value={updatingArtwork.width || ''}
                                onChange={event => changeArtwork({
                                    ...updatingArtwork,
                                    width: parseInt(event.target.value)
                                })}
                            />
                        </label>
                        <label>height
                            <input type='number' name='height'
                                value={updatingArtwork.height || ''}
                                onChange={event => changeArtwork({
                                    ...updatingArtwork,
                                    height: parseInt(event.target.value)
                                })}/>
                        </label>
                        <label>medium
                            <input type='text' name='medium'
                                value={updatingArtwork.medium || ''}
                                onChange={event => changeArtwork({
                                    ...updatingArtwork,
                                    medium: event.target.value
                                })}
                            />
                        </label>
                        <div className='changeImage'>
                            <label>image
                                <input type='file' name='image' accept='image/*'/>
                            </label>
                            <input type='button' value='Upload' onClick={event => {
                                const imageFile = event.target.form.image.files[0]
                                const imageLoaded = imageFile && true
                                this.setState({imageFile, imageLoaded})
                            }}/>
                            <canvas id='imageCanvas' 
                                width={1000}
                                height={1000}
                                style={{
                                    display: 'none',
                                }}
                            /> 
                            {(this.state.imageLoaded && (
                                <div className='uploadedImage'>
                                    <img id='uploadedImage' 
                                        src={blobUrl(this.state.imageFile)}
                                        alt='uploaded profile' 
                                        width={'100%'}
                                    />
                                </div>
                            )) || (updatingArtwork.file && (
                                <Img id='currentImageFromFile' fluid={updatingArtwork.file.childImageSharp.fluid}/>
                            )) || (updatingArtwork.image && (
                                <img id='currentImageFromSource' src={`data:image/jpeg;base64,${updatingArtwork.image}`} alt={updatingArtwork.title}/>
                            ))}
                            {<div className='rotateImage'
                                onClick={() => {
                                    // get canvas and image elements from page
                                    const imageCanvas = document.getElementById('imageCanvas')
                                    const uploadedImage = document.getElementById('uploadedImage')
                                    const currentImageFromFile = document.getElementById('currentImageFromFile')
                                    const currentImageFromSource = document.getElementById('currentImageFromSource')
                                    const canvasContext = imageCanvas.getContext('2d')
                                    // get whichever element actually exists
                                    console.log(uploadedImage, currentImageFromFile, currentImageFromSource)
                                    const rotatingImage = uploadedImage || currentImageFromFile || currentImageFromSource
                                    console.log(rotatingImage)
                                    // rotate the canvas, draw the image, and rotate the canvas back
                                    // canvasContext.rotate÷(-90)
                                    canvasContext.rotate(90)
                                    canvasContext.drawImage(rotatingImage, 0, 0)
                                    // canvasContext.save()

                                    // convert canvas contents to blob
                                    imageCanvas.toBlob((imageBlob) => {
                                        this.setState({
                                            imageFile: imageBlob,
                                            
                                        }, () => this.setState({ imageLoaded: true, }))
                                        // // prepare to read blob
                                        // const fr = new FileReader()
                                        // fr.onload = () => {
                                        //     // convert read blob to base64
                                        //     const image = btoa(fr.result)
                                        // }
                                        // fr.readAsBinaryString(imageBlob)
                                    }, 'image/jpeg')
                                }}
                            >
                                rotate right
                            </div>}
                        </div>
                        <label>price
                            <input type='number' name='price'
                                value={updatingArtwork.price || ''}
                                onChange={event => changeArtwork({
                                    ...updatingArtwork,
                                    price: parseInt(event.target.value)
                                })}/>
                        </label>
                        <div className='artworkRadioButtons'>
                            <label>sold
                                <input type='radio' name='sold'
                                    value='sold'
                                    checked={updatingArtwork.sold}
                                    onChange={event => changeArtwork({
                                        ...updatingArtwork,
                                        sold: event.target.checked
                                    })}
                                />
                            </label>
                            <label>unsold
                                <input type='radio' name='sold'
                                    value='unsold'
                                    checked={!updatingArtwork.sold}
                                    onChange={event => changeArtwork({
                                        ...updatingArtwork,
                                        sold: !event.target.checked
                                    })}
                                />
                            </label>
                        </div>
                        <div className='updateArtworkButtons'>
                            <input type='submit' value='submit'/>
                            <input type='reset' value='reset'/>
                            <input type='button' value='cancel'
                                onClick={() => submitArtwork()}
                            />
                        </div>
                    </form>
                )}}
            </Mutation>
        )
    }
}

UpdateArtworkForm.contextType = AdminContext

const UPDATE_ARTWORK = gql`
    mutation UpdateArtwork($id: ID!, $input: ArtworkInput) {
        updateArtwork(id: $id, input: $input) {
            id
            galleryId
            title
            width
            height
            medium
            image
            price
            sold
        }
    }
`

const GALLERY_NAMES = gql`
    {
        getAllGalleries {
            id
            name
        }
    }
`

// For the image uploading
let urls = new WeakMap()

let blobUrl = blob => {
  if (urls.has(blob)) {
      console.log('has blob')
      return urls.get(blob)
    } else {
        console.log('no has blob', blob, urls)
    let url = URL.createObjectURL(blob)  
    urls.set(blob, url)
    return url
  }
}