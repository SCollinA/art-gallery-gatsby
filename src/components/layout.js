import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"

import Header from "./header"
import Footer from './Footer'
import "./layout.css"

const Layout = ({ children }) => (
  <div className='Layout'>
        <Header brandImage={data.brandImage.childImageSharp.fluid} />
        <div className='Content'>
            {children}
            <Footer />
        </div>
  </div>
)

Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Layout
