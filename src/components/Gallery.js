import React from 'react'
import GalleryMain from './GalleryMain';
import GalleryThumbs from './GalleryThumbs';

export default ({images}) => (
    <div className='Gallery'>
        <GalleryMain image={images[0]} />
        <GalleryThumbs images={images}/>
    </div>
)