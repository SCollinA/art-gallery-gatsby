import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default () => (
    <div className='SocialLinks'>
        <a rel='noopener noreferrer' target='_blank' href='https://www.linkedin.com/in/scollinargo/'>
            <FontAwesomeIcon icon={['fab', 'linkedin']}/>
        </a>
        <a rel='noopener noreferrer' target='_blank' href='https://twitter.com/SCollinArgo'>
            <FontAwesomeIcon icon={['fab', 'twitter']}/>
        </a>
        <a rel='noopener noreferrer' target='_blank' href='https://github.com/SCollinA'>
            <FontAwesomeIcon icon={['fab', 'github']}/>
        </a>
    </div>
)