import Img from 'gatsby-image'
import PropTypes from "prop-types"
import React from "react"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faQuestionCircle } from '@fortawesome/free-regular-svg-icons'
library.add(faInstagram, faEnvelope, faQuestionCircle)

const Header = ({ siteImage }) => (
  <div className='Header'>
    <div className='headerLink'>
      <a
        href="/"
        style={{
          color: `white`,
          textDecoration: `none`,
        }}
      >
        <Img fluid={siteImage}/>
      </a>
    </div>
    <div className='headerLink'>
      <a rel='noopener noreferrer' target='_blank' href='https://www.instagram.com/mkcrfineart/'>
        <FontAwesomeIcon icon={['fab', 'instagram']} size='3x'/>
      </a>
    </div>
    <div className='headerLink'>
      <a href='#about'>
        <FontAwesomeIcon icon={['far', 'question-circle']} size='3x'/>
      </a>
    </div>
    <div className='headerLink'>
      <a href='/contact'>
        <FontAwesomeIcon icon={['far', 'envelope']} size='3x'/>
      </a>
    </div>
  </div>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
