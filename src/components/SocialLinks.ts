import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default () => (
    <div className='SocialLinks'>
        <div className='socialLink'>
          <a rel='noopener noreferrer' target='_blank' href='https://www.instagram.com/mkcrfineart/'>
            <FontAwesomeIcon icon={['fab', 'instagram']} size='2x'/>
          </a>
        </div>
        <div className='socialLink'>
          <a rel='noopener noreferrer' target='_blank' href='https://www.facebook.com/mkcrfineart/'>
            <FontAwesomeIcon icon={['fab', 'facebook']} size='2x'/>
          </a>
        </div>
    </div>
)