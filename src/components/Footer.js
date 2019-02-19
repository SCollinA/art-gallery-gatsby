import React from 'react'
import { Link } from 'gatsby'

export default () => (
    <footer className='Footer'>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
        <Link to='/admin'>admin</Link>
    </footer>
)