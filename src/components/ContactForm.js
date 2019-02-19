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
                    {/* <Mutation 
                        mutation={VOTE_MUTATION} 
                        variables={{ linkId: this.props.link.id }}
                        update={(store, { data: { vote } }) => this.props.updateStoreAfterVote(store, vote, this.props.link.id)}
                    >
                    {voteMutation => (
                        <div className="ml1 gray f11" onClick={voteMutation}>
                        ▲
                        </div>
                    )}
                    </Mutation> */}
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
                                    // event.persist()
                                    // const name = event.target.name.value
                                    // const contactEmail = event.target.email.value
                                    // const message = event.target.message.value
                                    // const artwork = event.target.artwork.value
                                    // // fetch('contactKelly', {
                                    //     // below is for development
                                    //     fetch('http://localhost:1961/contactKelly', {
                                    //         method: 'post',
                                    //         body: JSON.stringify({ name, contactEmail, message, artwork }),
                                    //         headers: {'Content-Type': 'application/json'}
                                    //     })
                                    //     .then(res => res.json())
                                    //     .then(res => {
                                    //         if (res.success) {
                                    //             alert('message received')
                                    //             event.target.reset()
                                    //         } else {
                                    //             alert('try again')
                                    //         }
                                    //     })
                                    //     .catch(console.log)
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
  mutation ContactArtist($artworkName: String) {
      contactArtist(artworkName: $artworkName) 
  }
`