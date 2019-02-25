import React from 'react'
import { Link } from 'gatsby'

export default () => (
    <footer className='Footer'>
        <span>
            <p>© {new Date().getFullYear()},&nbsp;</p>
            <p>mkcrfineart</p>
        </span>
        <p>
            All images on this site are copyrighted by the artist 
            and may not be reproduced without written permission 
            of the artist. 
        </p>
        <Link to='/admin'>admin</Link>
    </footer>
)