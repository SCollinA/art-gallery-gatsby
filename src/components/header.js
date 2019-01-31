import { Link } from "gatsby"
import Img from 'gatsby-image'
import PropTypes from "prop-types"
import React from "react"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Header = ({ siteImage }) => (
  <div
    className='Header'
    style={{
      background: `rebeccapurple`,
      // marginBottom: `1.45rem`,
    }}
  >
    <div className='headerLink'>
      <Link
        to="/"
        style={{
          color: `white`,
          textDecoration: `none`,
        }}
      >
        <Img fluid={siteImage}/>
      </Link>
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
