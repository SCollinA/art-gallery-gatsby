import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Header = ({ siteTitle }) => (
  <div
    className='Header'
    style={{
      background: `rebeccapurple`,
      // marginBottom: `1.45rem`,
    }}
  >
    <div className='headerLink'>
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </h1>
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
