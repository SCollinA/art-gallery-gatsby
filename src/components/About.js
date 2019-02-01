import React from 'react'
import Img from 'gatsby-image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { StaticQuery } from 'gatsby';

export default ({image}) => (
    <div className='About'>
        <a href='#about' id='aboutHeader'><FontAwesomeIcon icon={['far', 'question-circle']} size='2x'/><h1>about Kelly</h1></a>
        <div className='aboutContent'>
            <div>
                <h4>Pet portrait pricing and details (as of January 2019)</h4>
                <p>Thank you for your interest in a commissioned pet portrait. I do my best to create an accurate artistic representation of your loved pet. I hope that it is a treasured piece of art for years and years. In order to do my best work for you, I have a few guidelines that will help. If you have any questions or concerns, please let’s discuss.</p>
                <Img fluid={image}/>
            </div>
            <div className='aboutProcess'>
                <h4>My Process:</h4>
                <div>
                    <h6>Inquiry</h6> 
                    <p>
                        This is when you simply inquire about costs, availability, etc. I do not assume this is a commission yet. You do not have a reserved slot.
                    </p>
                </div>
                <div>
                    <h6>Commission accepted</h6>
                    <p>
                        I will accept the commission, officially, upon receipt of good photographs of your pet and you will be given an estimated completion date. Good photographs means they are in focus, the posture and position of the pet is reasonable. The better the photograph, the better the portrait. For example, I will find it almost impossible to render a likeness of your pet from a blurry photo of your dog faraway in a field, with his tail out of frame. Each pet has their own expressions, markings, colorings and moods. I need to be able to see that since I don’t know your pet personally.
                    </p>
                </div>
                <div>
                    <h6>Timing</h6>
                    <p>
                        I am a working, and learning, artist. I also create landscapes and still life in pastel, and oil, and attend classes and workshops. Therefore, I limit my pet portrait commissions to four per month. If I have four for delivery in one month, I’ll schedule you for the next month. Let me know if there are special dates you are aiming for. For the holiday season, I will cut off commissions in early October, just fyi, so that I can be sure and deliver them, however far away, before Christmas.
                    </p>
                </div>
                <StaticQuery
                    query={graphql`
                        query {
                            image: file(relativePath: { eq: "price_list.png" }) {
                                ...fluidImage
                            }
                        }
                    `}
                    render={data => <Img fluid={data.image.childImageSharp.fluid}/>}
                />
                <div>
                    <h6>Payment</h6>
                    <p>
                        Is due upon receipt and includes any shipping/insurance costs. The title of the artwork belongs to the artist until the invoice is paid in full.
                    </p>
                </div>
                <div>  
                    <p>
                        *9X12 is painted so that it can be framed in a standard 11X14 frame with mat cut to 8X10 opening.
                        **12X16 is painted so that it can be framed in a standard 16x20 frame with a mat cut to 11x14 opening.
                        Of course, custom framing can alter those finished frame sizes. 
                    </p>
                </div>
                <h1>Thank You!</h1>
            </div>
        </div>
    </div>
)