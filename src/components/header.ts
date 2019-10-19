import Img from 'gatsby-image'
import PropTypes from "prop-types"
import React from "react"
import { Link, StaticQuery, graphql } from "gatsby"

import { library } from '@fortawesome/fontawesome-svg-core'
import { faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope, faTimesCircle } from '@fortawesome/free-regular-svg-icons'
import PageLinks from './PageLinks'
import SocialLinks from './SocialLinks'
import HamburgerLinks from './HamburgerLinks';
library.add(faInstagram, faFacebook, faEnvelope, faAngleLeft, faAngleRight, faTimesCircle)

const Header = () => (
  <div className='Header'>
    <div className='headerLinks'>
      <div className='homeLink'>
        <Link to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          <StaticQuery
            query={graphql`
              query {
                brandImage: file(relativePath: { eq: "brand.png" }) {
                  childImageSharp {
                    fluid(maxWidth: 2000) {
                      ...GatsbyImageSharpFluid_tracedSVG
                    }
                  }
                }
              }
            `}
            render={data => (
              <Img fluid={data.brandImage.childImageSharp.fluid}/>
            )}/>
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
