import React from 'react'
import Img from 'gatsby-image'
import LayoutContext from '../contexts/LayoutContext'

export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            width: 0,
            height: 0,
            aspectRatio: 0
        }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
        this.image = React.createRef()
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }
      
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
      
    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    render () {
    return (
    <div className='Home'>
        {/* random artwork */}
        <div className='randomArtwork'>
            <LayoutContext.Consumer>
                {({ galleries }) => {
                    const randomGallery = galleries[Math.floor(Math.random() * galleries.length)]
                    const randomArtwork = randomGallery.artworks[Math.floor(Math.random() * randomGallery.artworks.length)]
                    return (!randomArtwork && <p>whoops, no picture</p>) || (
                        (randomArtwork.file && (
                            <Img ref={this.gatsbyImage} 
                                style={{ 
                                    maxWidth: randomArtwork.file.childImageSharp.fluid.aspectRatio <= 1 ?
                                        `${(this.state.height * .75) * randomArtwork.file.childImageSharp.fluid.aspectRatio}px` :
                                        `100%`
                                }} 
                                fluid={randomArtwork.file.childImageSharp.fluid}
                            />
                        )) || (
                        randomArtwork.image && (
                            <img ref={this.image} 
                                style={{ display: 'none' }}
                                src={`data:image/jpeg;base64,${randomArtwork.image}`} 
                                alt={randomArtwork.title}
                                onLoad={() => this.setState({ 
                                    aspectRatio: this.image.current.width / this.image.current.height 
                                }, () => {
                                    const dbImage = this.image.current
                                    dbImage.style.maxWidth = `${(this.state.height * .75) * this.state.aspectRatio}px`
                                    dbImage.style.display = 'initial'
                                })}
                            />
                        ))
                    )
                }}
            </LayoutContext.Consumer>
        </div>
        <div className='welcomeMessage'>
            <h4>Welcome!</h4>
            <p>Feel free to browse the gallery, learn more, or reach out by using the links above!</p>
        </div>
    </div>
    )
    }
}
