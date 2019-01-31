import React from 'react'
import Img from 'gatsby-image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default ({image}) => (
    <div className='About'>
        <a href='#about' id='aboutHeader'><FontAwesomeIcon icon={['far', 'question-circle']} size='2x'/><h1>about Kelly</h1></a>
        <div className='aboutContent'>
            <p>Kelly has been painting forever. Kelly has been painting forever. Kelly has been painting forever. Kelly has been painting forever. Kelly has been painting forever. Kelly has been painting forever. Kelly has been painting forever. </p>
            <Img fluid={image}/>
        </div>
    </div>
)