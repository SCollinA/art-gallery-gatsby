import React from 'react'
import Img from 'gatsby-image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { StaticQuery, graphql } from 'gatsby';

export default ({image}) => (
    <div className='About'>
        <FontAwesomeIcon icon={['far', 'question-circle']} size='2x'/><h1>about Kelly</h1>
        <div className='aboutContent'>
        
        </div>
    </div>
)