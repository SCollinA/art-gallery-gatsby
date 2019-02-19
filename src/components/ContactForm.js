import React from 'react'
import { galleryContext } from './layout'

export default () => (
    <div className='Contact'>
        <galleryContext.Consumer> 
            {({ artworks }) => (
                <label>
                    <div className='pageHeader'>
                        <h1>contact</h1>
                    </div>
                    <form className='contactForm' 
                        onSubmit={event => {
                            event.preventDefault()
                            event.persist()
                            const name = event.target.name.value
                            const contactEmail = event.target.email.value
                            const message = event.target.message.value
                            const artwork = event.target.artwork.value
                            // fetch('contactKelly', {
                                // below is for development
                                fetch('http://localhost:1961/contactKelly', {
                                    method: 'post',
                                    body: JSON.stringify({ name, contactEmail, message, artwork }),
                                    headers: {'Content-Type': 'application/json'}
                                })
                                .then(res => res.json())
                                .then(res => {
                                    if (res.success) {
                                        alert('message received')
                                        event.target.reset()
                                    } else {
                                        alert('try again')
                                    }
                                })
                                .catch(console.log)
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
                </label>
            )}
        </galleryContext.Consumer>
    </div>
)