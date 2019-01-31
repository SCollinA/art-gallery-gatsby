import React from 'react'

export default ({images}) => (
    <form className='Contact'>
        <h1 className='formTitle'>contact</h1>
        <div className='formInputs'>
            <label>name
                <input type='text' name='name' id='name'/>
            </label>
            <label>e-mail
                <input type='text' name='email' id='email'/>
            </label>
            <label>message
                <input type='text' name='message' id='message'/>
            </label>
            <label>artwork
                <select name='artwork' id='artwork'>
                    <option value='-'> - </option>
                    {images.map((image, index)=> <option key={index} value={image.title}>{image.title}</option>)}
                </select>
            </label>
            <input type='submit' value='submit'/>
        </div>
    </form>
)