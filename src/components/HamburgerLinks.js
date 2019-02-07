import React from 'react'
import { Link } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PageLinks from './PageLinks';
import SocialLinks from './SocialLinks';

export default () => {
    return (
        <div className='HamburgerLinks'>
            <PageLinks />
            <SocialLinks />
        </div>
    )
}