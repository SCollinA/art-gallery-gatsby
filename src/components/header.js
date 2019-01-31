import Img from 'gatsby-image'
import PropTypes from "prop-types"
import React from "react"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Header = ({ siteImage }) => (
  <div className='Header'>
    <div className='headerLink'>
      <a
        href="#home"
        style={{
          color: `white`,
          textDecoration: `none`,
        }}
      >
        <Img fluid={siteImage}/>
      </a>
    </div>
    <div className='headerLink'>
      <a href='#about'>
        <FontAwesomeIcon icon={['far', 'question-circle']} size='3x'/>
      </a>
    </div>
    <div className='headerLink'>
      <a href='#contact'>
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
