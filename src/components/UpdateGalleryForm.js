import React from 'react'
import { Mutation, gql } from 'apollo-boost'

export default UpdateGalleryForm = ({ selectGallery, changeGallery, submitGallery }) => {
    return (
        <form>
            <input/>
            <input/>
            <input/>
            <input/>
            <input type='submit'/>
        </form>
    )
}

const UPDATE_GALLERY = gql`

`