import React from 'react'

export default ({images}) => (
    <form onSubmit={() => null}>
        <input type='text' />
        <input type='text' />
        <input type='text' />
        <select name='artwork'>
            {/* {images.map(image => <option />)} */}
        </select>
        <input type='submit' value='submit'/>
    </form>
)