import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"

import Header from "./header"
import Footer from './Footer'
import "./layout.css"

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query {
        siteImage: file(relativePath: { eq: "site_image.png" }) {
          childImageSharp {
            fluid(maxWidth: 2000) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `}
    render={data => (
      <div className='Layout'>
        <Header siteImage={data.siteImage.childImageSharp.fluid} />
        <div className='Content'>
          {children}
          <Footer />
        </div>
      </div>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
