import React from 'react'
import Img from 'gatsby-image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { StaticQuery, graphql } from 'gatsby';

export default ({image}) => (
    <div className='About'>
        <div className='pageHeader'>
            {/* <FontAwesomeIcon icon={['far', 'question-circle']} size='2x'/> */}
            <h1>about</h1>
        </div>        
        <div className='aboutContent'>
            <p>
                Kelly is an artist of many mediums.  Her work includes landscapes, still life and animals.  She  particularly enjoys doing commissioned pet portraits and they have become a regular part of her artistic exercise. “Our pets are often our best friends, and certainly they are loyal and faithful companions that deserve our careful attention. I’ll do my best.”
            </p>
            <StaticQuery
                query={graphql`
                    query {
                        image: file(relativePath: { eq: "kelly.jpg" }) {
                            ...fluidImage
                        }
                    }
                `}
                render={data => <Img fluid={data.image.childImageSharp.fluid}/>}
            />
            <p>
                Kelly is a full-time professional artist in watercolor, oil, pastel and charcoal, creating inspired work and commissioned work. She continues to formally study art through classes and workshops to stay sharp and current in the art community. 
            </p>
            <p>
                For thirty years,she was a communications professional working with media relations, publications, social media, communications strategy and more. It was a fulfilling career, but she had long held the idea that when possible, she would  “retire” from the nine-to-five in order to see what kind of potential there was in her artistic side.
            </p>
            <p>
                Since she was a little girl she has held paint brushes, pencils, pastels in her hand and created art. She learned to draw by copying comic strips from the Sunday paper and has always owned an easel since my first Mickey Mouse easel. Many books, and lots of just doing art, have helped to change and refine her style. 
            </p>
            <p>
                Her love of the family pets, of all pets, translated into something she could share with others. And it makes so many people happy. It’s a joy.
            </p>
            <p>
                Kelly and her husband live in Roswell, Georgia and Beaufort, South Carolina. Their five adult children and respective families live in Georgia and California. Her art is on display in homes throughout the United States and England.
            </p>
        </div>
    </div>
)