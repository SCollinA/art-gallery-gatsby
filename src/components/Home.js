import React from 'react'
import Img from 'gatsby-image'
import LayoutContext from '../contexts/LayoutContext'

export default () => (
    <div className='Home'>
        {/* random artwork */}
        <div className='randomArtwork'>
            <LayoutContext.Consumer>
                {({ galleries }) => {
                    const randomGallery = galleries[Math.floor(Math.random() * galleries.length)]
                    const randomArtwork = randomGallery.artworks[Math.floor(Math.random() * randomGallery.artworks.length)]
                    return (!randomArtwork && <p>whoops, no picture</p>) || (
                        (randomArtwork.file && (
                            <Img
                                style={{ 
                                    maxWidth: randomArtwork.file.childImageSharp.fluid.aspectRatio <= 1 ?
                                        `${(this.state.height * .75) * randomArtwork.file.childImageSharp.fluid.aspectRatio}px` :
                                        `100%`
                                }} 
                                fluid={randomArtwork.file.childImageSharp.fluid}
                            />
                        ))
                    )
                }}
            </LayoutContext.Consumer>
        </div>
        <div className='welcomeMessage'>
            <h4>Welcome!</h4>
            <p>Thank you for your interest in my art. I work in oil, watercolor, and pastels creating inspired work and commissions. Browse the gallery and let me hear from you! I'm always interested in your feedback.</p>
        </div>
    </div>
)