import React from 'react'
import Img from 'gatsby-image'
import { Mutation, Query } from 'react-apollo'
import gql from 'graphql-tag'
import AdminContext from '../contexts/AdminContext'
import { DB_CONTENT, ARTWORK_IMAGE } from './layout'
import { GALLERY_ARTWORKS } from './AdminArtworks';
import Loading from './Loading';

export default class UpdateArtworkForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            imageFile: null,
            imageLoaded: false,
            imageWidth: 0,
            imageHeight: 0,
            windowHeight: 0,
            windowWidth: 0,
        }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
        this.imageCanvas = React.createRef()
        this.uploadedImage = React.createRef()
        this.currentImageFromFile = React.createRef()
        this.currentImageFromSource = React.createRef()
    }

    componentDidMount() {
        this.updateWindowDimensions()
        window.addEventListener('resize', this.updateWindowDimensions)
        this.context.updatingArtwork.image && 
            fetch(`data:image/jpeg;base64,${this.context.updatingArtwork.image}`)
            .then(res => res.blob())
            .then(blob => this.setState({
                imageFile: blob,
                imageLoaded: true
            }))
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions)
    }
      
    updateWindowDimensions() {
        this.setState({ windowWidth: window.innerWidth, windowHeight: window.innerHeight })
    }
    render() {
        const { selectedArtwork, updatingArtwork, changeArtwork, submitArtwork, resetArtwork, removeArtwork } = this.context
        // const { imageWidth, imageHeight, windowHeight } = this.state
        return (
            <Mutation mutation={UPDATE_ARTWORK}
                update={(cache, { data: { updateArtwork }, loading, error }) => {
                    const { galleries, artworks } = cache.readQuery({ query: DB_CONTENT })
                    console.log('updating artwork in cache', updateArtwork.image)
                    cache.writeQuery({
                        query: DB_CONTENT,
                        data: { galleries, artworks: [ ...artworks.filter(artwork => artwork.id !== updateArtwork.id), updateArtwork] },
                    })
                    // console.log(cache.readQuery({ query: DB_CONTENT }))
                    const dbImageData = cache.readQuery({
                        query: ARTWORK_IMAGE,
                        variables: { id: updateArtwork.id }
                    })
                    console.log('updating dbImage in cache', dbImageData)
                    cache.writeQuery({
                        query: ARTWORK_IMAGE,
                        variables: { id: updateArtwork.id },
                        data: dbImageData 
                    })
                }}
                refetchQueries={[
                //     {
                //     query: ARTWORK_IMAGE,
                //     variables: {
                //         id: updatingArtwork.id
                //     }
                // },
                {
                    query: GALLERY_ARTWORKS,
                    variables: {
                        galleryId: updatingArtwork.galleryId
                    },
                }, 
                {
                    query: GALLERY_ARTWORKS,
                    variables: {
                        galleryId: selectedArtwork.galleryId
                    },
                }]}
            >
                {(updateArtwork, { data, loading, error }) => {
                    return (
                    <>
                    {loading && <Loading/>}
                    <form id='UpdateArtworkForm'
                        onSubmit={event => {
                            event.preventDefault()
                            if (this.state.imageLoaded) {
                                // const imageCanvas = document.getElementById('imageCanvas')
                                const imageCanvasNode = this.imageCanvas.current 
                                const uploadedImageNode = this.uploadedImage.current
                                // const uploadedImage = document.getElementById('uploadedImage')
                                const canvasContext = imageCanvasNode.getContext('2d')
                                // draw image takes (img, x, y, w, h)
                                canvasContext.drawImage(uploadedImageNode, 0, 0, this.state.imageWidth, this.state.imageHeight)
                                imageCanvasNode.toBlob((imageBlob) => {
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
                                                // updateDbImage(updatingArtwork.id)
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
                        onReset={() => this.setState({ imageFile: null, imageLoaded: false }, () => resetArtwork())}
                        onClick={event => event.stopPropagation()}
                    >
                        <label>gallery
                            <Query query={GALLERY_NAMES}>
                                {({ data, loading, error }) => (
                                    <select name='galleryId'
                                        value={updatingArtwork.galleryId || ''}
                                        onChange={event => changeArtwork({
                                            galleryId: event.target.value || null
                                        })}
                                    >
                                        <option name='galleryId' value={''}>
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
                            <input autoFocus type='text' name='title'
                                value={updatingArtwork.title}
                                onChange={event => changeArtwork({
                                    title: event.target.value
                                })}
                            />
                        </label>
                        <label>width
                            <input type='number' name='width'
                                value={updatingArtwork.width || ''}
                                onChange={event => changeArtwork({
                                    width: parseInt(event.target.value)
                                })}
                            />
                        </label>
                        <label>height
                            <input type='number' name='height'
                                value={updatingArtwork.height || ''}
                                onChange={event => changeArtwork({
                                    height: parseInt(event.target.value)
                                })}/>
                        </label>
                        <label>medium
                            <input type='text' name='medium'
                                value={updatingArtwork.medium || ''}
                                onChange={event => changeArtwork({
                                    medium: event.target.value
                                })}
                            />
                        </label>
                        <div className='changeImage'>
                            <label>image
                                <input type='file' name='image' accept='image/*' 
                                    onClick={event => {
                                        event.target.value = ''
                                    }}
                                    onChange={event => {
                                        const imageFile = event.target.files[0]
                                        const imageLoaded = imageFile && true
                                        this.setState({
                                            imageHeight: 0,
                                            imageWidth: 0,
                                            imageLoaded: false
                                        }, () => this.setState({
                                            imageFile,
                                            // imageLoaded: false, 
                                        }, () => this.setState({
                                            imageLoaded
                                        }, () => !imageFile && this.setState({ 
                                            imageHeight: 0,
                                            imageWidth: 0,
                                        }))))
                                    }}
                                />
                            </label>
                            <label>remove image
                                <input type='button' value='remove image' 
                                    onClick={event => {
                                        event.target.form.image.value = ''
                                        this.setState({ 
                                            imageFile: null, 
                                            imageLoaded: false,
                                            imageHeight: 0,
                                            imageWidth: 0,
                                        }, () => {
                                            changeArtwork({ ...updatingArtwork, image: null })
                                        })
                                    }}
                                />
                            </label>
                            <canvas id='imageCanvas' ref={this.imageCanvas}
                                width={this.state.imageWidth}
                                height={this.state.imageHeight}
                                style={{ display: 'none' }}
                            /> 
                            {(this.state.imageLoaded && (
                                <div className='uploadedImage'>
                                    <img id='uploadedImage' ref={this.uploadedImage}
                                        style={{ display: 'none'}}
                                        alt='uploaded profile' 
                                        onLoad={() => {
                                            !this.state.imageWidth && this.setState({ 
                                                imageWidth: this.uploadedImage.current.width,
                                                imageHeight: this.uploadedImage.current.height 
                                            }, () => {
                                                this.uploadedImage.current.style.display = 'block'
                                                const { imageWidth, imageHeight, windowHeight } = this.state
                                                this.uploadedImage.current.style.maxWidth = imageWidth / imageHeight >= 1 ? // is it wider than tall? 
                                                '25%' : `${(windowHeight * .25) * imageWidth / imageHeight}px`
                                            })}
                                        }
                                        src={blobUrl(this.state.imageFile)}
                                    />
                                </div>
                            )) || (updatingArtwork.file && (
                                <Img id='currentImageFromFile' ref={this.currentImageFromFile} fluid={updatingArtwork.file.childImageSharp.fluid}/>
                            )) || (updatingArtwork.image && (
                                <img id='currentImageFromSource' ref={this.currentImageFromSource} src={`data:image/jpeg;base64,${updatingArtwork.image}`} alt={updatingArtwork.title}/>
                            ))}
                            {<div className='rotateImage'
                                onClick={() => {
                                    // have to get current image height and width
                                    this.setState({ 
                                        imageWidth: this.state.imageHeight,
                                        imageHeight: this.state.imageWidth
                                    }, () => {
                                    // get canvas and image elements from page
                                        const imageCanvasNode = this.imageCanvas.current
                                        const uploadedImageNode = this.uploadedImage.current
                                        const currentImageFromFileNode = this.currentImageFromFile.current
                                        const currentImageFromSourceNode = this.currentImageFromSource.current
                                        const canvasContext = imageCanvasNode.getContext('2d')
                                        // get whichever element actually exists
                                        console.log(uploadedImageNode, currentImageFromFileNode, currentImageFromSourceNode)
                                        const rotatingImage = uploadedImageNode || currentImageFromFileNode || currentImageFromSourceNode
                                        console.log(rotatingImage)
                                        // rotate the canvas, draw the image, and rotate the canvas back
                                        // canvasContext.clearRect(0, 0, imageCanvasNode.width, imageCanvasNode.height)
                                        if (rotatingImage) {
                                            canvasContext.save()
                                            canvasContext.translate(
                                                imageCanvasNode.width / 2,
                                                imageCanvasNode.height / 2
                                            )
                                            canvasContext.rotate(Math.PI / 2)
                                            canvasContext.translate(
                                                (-1 * imageCanvasNode.height / 2),
                                                (-1 * imageCanvasNode.width / 2) 
                                            )
                                            canvasContext.drawImage(rotatingImage, 0, 0, this.state.imageHeight, this.state.imageWidth)
                                            canvasContext.restore()
                                            // imageCanvasNode.width = this.state.imageHeight
                                            // imageCanvasNode.height = this.state.imageWidth
                                            // convert canvas contents to blob
                                            console.log(canvasContext)
                                            imageCanvasNode.toBlob((imageBlob) => {
                                                console.log(imageBlob)
                                                this.setState({
                                                    imageFile: imageBlob,
                                                })
                                            }, 'image/jpeg', 1.0)
                                        }
                                    })
                                }}
                            >
                                rotate right
                            </div>}
                        </div>
                        <label>price
                            <input type='number' name='price'
                                value={updatingArtwork.price || ''}
                                onChange={event => changeArtwork({
                                    price: parseInt(event.target.value)
                                })}/>
                        </label>
                        <div className='artworkRadioButtons'>
                            <label>sold
                                <input type='radio' name='sold'
                                    value='sold'
                                    checked={updatingArtwork.sold}
                                    onChange={event => changeArtwork({
                                        sold: event.target.checked
                                    })}
                                />
                            </label>
                            <label>unsold
                                <input type='radio' name='sold'
                                    value='unsold'
                                    checked={!updatingArtwork.sold}
                                    onChange={event => changeArtwork({
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
                            <Mutation mutation={DELETE_ARTWORK}
                                update={(cache, { data, loading, error }) => {
                                    const { galleries, artworks } = cache.readQuery({ query: DB_CONTENT })
                                    cache.writeQuery({
                                        query: DB_CONTENT,
                                        data: {
                                            galleries,
                                            artworks: artworks.filter(artwork => artwork.id !== updatingArtwork.id),
                                        }
                                    })
                                }}
                                refetchQueries={[{
                                    query: GALLERY_ARTWORKS,
                                    variables: {
                                        galleryId: updatingArtwork.galleryId
                                    }
                                },{
                                    query: GALLERY_ARTWORKS,
                                }]}
                            >
                            {(deleteArtwork, { data, loading, error }) => (
                                <input type='button' value='remove'
                                    onClick={() => window.confirm('are you sure you want to remove this artwork?') && deleteArtwork({ variables: { id: updatingArtwork.id } }).then(() => removeArtwork())}
                                />
                            )}
                            </Mutation>
                        </div>
                    </form>
                </>
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

const DELETE_ARTWORK = gql`
    mutation DeleteArtwork($id: ID!) {
        deleteArtwork(id: $id)
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
      return urls.get(blob)
    } else {
    let url = URL.createObjectURL(blob)  
    urls.set(blob, url)
    return url
  }
}