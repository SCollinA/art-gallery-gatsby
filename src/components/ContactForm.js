import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default ({images}) => (
    <div className='Contact'>
        <label>
            <div className='pageHeader'>
                <FontAwesomeIcon icon={['far', 'envelope']} size='2x'/>
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
                        {images.map((image, index)=> <option key={index} value={image.title}>{image.title}</option>)}
                    </select>
                </label>
                <input type='submit' value='submit'/>
            </form>
        </label>
    </div>
)