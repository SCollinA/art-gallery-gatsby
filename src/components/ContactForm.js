import React from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import { galleryContext } from './layout'

export default () => (
    <div className='Contact'>
        <galleryContext.Consumer> 
            {({ artworks }) => (
                <label>
                    <div className='pageHeader'>
                        <h1>contact</h1>
                    </div>
                    <Mutation mutation={CONTACT_MUTATION}>
                        {(contactArtist, { data }) => (
                            <form className='contactForm' 
                                onSubmit={event => {
                                    event.preventDefault()
                                    contactArtist({ variables: { 
                                        name: event.target.name.value,
                                        contactEmail: event.target.email.value,
                                        message: event.target.message.value,
                                        artwork: event.target.artwork.value,
                                    }})
                                    event.target.reset()
                                }}
                            >
                                <label>name
                                    <input type='text' name='name' id='name'/>
                                </label>
                                <label>e-mail
                                    <input type='text' name='email' id='email'/>
                                </label>
                                <label>message
                                    <textarea name='message' id='message'></textarea>
                                </label>
                                <label>artwork
                                    <select name='artwork' id='artwork'>
                                        <option value='-'> - </option>
                                        {artworks.map((artwork, index)=> <option key={index} value={artwork.name}>{artwork.name}</option>)}
                                    </select>
                                </label>
                                <input type='submit' value='submit'/>
                            </form>
                        )}
                    </Mutation>
                </label>
            )}
        </galleryContext.Consumer>
    </div>
)

const CONTACT_MUTATION = gql`
  mutation ContactArtist($name: String, $contactEmail: String, $message: String, $artwork: String) {
      contactArtist(name: $name, contactEmail: $contactEmail, message: $message, artwork: $artwork) 
  }
`