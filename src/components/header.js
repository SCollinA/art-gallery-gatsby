import Img from 'gatsby-image'
import PropTypes from "prop-types"
import React from "react"
import { Link } from 'gatsby'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faQuestionCircle, faMoneyBillAlt } from '@fortawesome/free-regular-svg-icons'
library.add(faInstagram, faFacebook, faEnvelope, faQuestionCircle, faMoneyBillAlt)

const Header = ({ siteImage }) => (
  <div className='Header'>
  <div className='headerLinks'>
      <div className='headerLink'>
        <Link to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          <Img fluid={siteImage}/>
        </Link>
      </div>
      <div className='socialLinks'>
        <div className='headerLink'>
          <a rel='noopener noreferrer' target='_blank' href='https://www.instagram.com/mkcrfineart/'>
            <FontAwesomeIcon icon={['fab', 'instagram']} size='2x'/>
          </a>
        </div>
        <div className='headerLink'>
          <a rel='noopener noreferrer' target='_blank' href='https://www.facebook.com/mkcrfineart/'>
            <FontAwesomeIcon icon={['fab', 'facebook']} size='2x'/>
          </a>
        </div>
      </div>
    </div>
    <div className='pageLinks'>
      <div className='pageLink'>
        <Link to='/gallery'
          activeClassName='activeLink'
        >
          <h2>gallery</h2>
        </Link>
      </div>
      <div className='pageLink'>
        <Link to='/about'
          activeClassName='activeLink'
        >
          <h2>about</h2>
        </Link>
      </div>
      <div className='pageLink'>
        <Link to='/commissions'
          activeClassName='activeLink'
        >
          <h2>commissions</h2>
        </Link>
      </div>
      <div className='pageLink'>
        <Link to='/contact'
          activeClassName='activeLink'
        >
          <h2>contact</h2>
        </Link>
      </div>
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
