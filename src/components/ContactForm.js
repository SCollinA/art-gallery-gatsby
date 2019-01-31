import React from 'react'

export default ({images}) => (
    <div className='Contact'>
        <label><a href='#contact'><h1>contact</h1></a>
            <form className='contactForm' onSubmit={event => event.preventDefault()}>
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