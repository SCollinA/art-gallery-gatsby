import Img from 'gatsby-image'
import PropTypes from "prop-types"
import React from "react"
import { Link } from 'gatsby'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faQuestionCircle, faMoneyBillAlt, faTimesCircle } from '@fortawesome/free-regular-svg-icons'
import PageLinks from './PageLinks'
import SocialLinks from './SocialLinks'
import HamburgerLinks from './HamburgerLinks';
library.add(faInstagram, faFacebook, faEnvelope, faQuestionCircle, faMoneyBillAlt, faTimesCircle)

const Header = ({ siteImage }) => (
  <div className='Header'>
    <div className='headerLinks'>
      <div className='homeLink'>
        <Link to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          <Img fluid={siteImage}/>
        </Link>
      </div>
      <SocialLinks />
    </div>
    <HamburgerLinks />
    <PageLinks />
  </div>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
