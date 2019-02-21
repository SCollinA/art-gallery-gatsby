import React from "react"
import Img from 'gatsby-image'
import LayoutContext from '../contexts/LayoutContext'
import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => {
  return (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    {/* random artwork */}
    <div className='randomArtwork'>
      <LayoutContext.Consumer>
        {({ galleries }) => {
          console.log(galleries)
          const randomGallery = galleries[Math.floor(Math.random() * galleries.length)]
          const randomArtwork = randomGallery[Math.floor(Math.random() * randomGallery.length)]
          return randomArtwork && (
            <>
              {(randomArtwork.file && (
                <Img fluid={randomArtwork[Math.floor(Math.random() * randomArtwork.length)].childImageSharp.fluid}/>
              )) || (
              randomArtwork.image && (
                <img src={randomArtwork.image} alt={randomArtwork.title}/>
              ))}
            </>
          )
        }}
      </LayoutContext.Consumer>
    </div>
    <div className='welcomeMessage'>
      <h4>Welcome!</h4>
      <p>Welcome to the best art gallery site evar!</p>
    </div>
  </Layout>
)}

export default IndexPage