import { graphql, StaticQuery } from "gatsby";
import Img from "gatsby-image";
import React from "react";

import LayoutContext from "../contexts/LayoutContext";

import PageBreak from "./PageBreak";
import SectionWrapper from "./SectionWrapper";

export default () => (
	<LayoutContext.Consumer>
		{({ galleries }: any) => {
			// get random art from galleries
			const galleryArtworks: any[] = [];
			// combine all the artworks
			galleries.forEach(({ artworks }: any) => {
				Array.prototype.push.apply(galleryArtworks, artworks);
			});
			// get some random artworks
			const randomArtworks = [];
			do {
				if (!galleryArtworks.length) { break; }
				const randomIndex = Math.floor(Math.random() * galleryArtworks.length);
				randomArtworks.push(galleryArtworks[randomIndex]);
				galleryArtworks.splice(randomIndex, 1);
			} while (randomArtworks.length < 3);
			// push empty objects to make length 3
			while (randomArtworks.length < 3) { randomArtworks.push({}); }
			return (
				<div className="About">
					<SectionWrapper>
						{(randomArtworks[0].file &&
							<Img className={"aboutImg"} fluid={randomArtworks[0].file.childImageSharp.fluid}/>) ||
						(randomArtworks[0].image &&
							<img className={"aboutImg"} src={randomArtworks[0].image} alt="a random selection from artworks"/>)}
						<p>
							Kelly is an artist of many mediums.
							Her work includes landscapes, still life and animals.
							She enjoys doing commissioned pet portraits,
							which are regular in her artistic practice.
							“Pets are our best friends, loyal and faithful companions
							that deserve careful attention. I’ll do my best.”
						</p>
						<PageBreak/>
						<p>
							Kelly is a full-time artist creating inspired work and commissioned work.
							She works in watercolor, oil, pastel, and charcoal.
							To stay current in the art community, she studies through classes and workshops.
							For thirty years, she worked as a communications professional.
							Although fulfilling, she long planned to “retire” from the nine-to-five
							to explore art.
						</p>
						{(randomArtworks[1].file &&
							<Img className={"aboutImg"} fluid={randomArtworks[1].file.childImageSharp.fluid}/>) ||
						(randomArtworks[1].image &&
							<img className={"aboutImg"} src={randomArtworks[1].image} alt="a random selection from artworks"/>)}
						<PageBreak/>
						<StaticQuery
							query={graphql`
							query {
								image: file(relativePath: { eq: "kelly.jpg" }) {
									childImageSharp {
										fluid(maxWidth: 1000, quality: 100) {
											...GatsbyImageSharpFluid_tracedSVG
										}
									}
								}
							}
							`}
							render={(data) =>
								<Img className="aboutImg" fluid={data.image.childImageSharp.fluid}/>
							}
						/>
						<p>
							From the time she was a little girl she has held paint brushes,
							pencils, and pastels in her hand and created art.
							She learned to draw by copying comic strips from the Sunday paper.
							Since her first Mickey Mouse easel she has always owned an easel.
							Many books, and lots of practice, have helped to change and refine her style.
						</p>
						<PageBreak/>
						<p>
							Her love of the family pets, of all pets,
							translated into something she could share with others.
							And it makes so many people happy. It’s a joy.
							Kelly and her husband live in Roswell, Georgia and Beaufort,
							South Carolina. Their five adult children and respective families
							live in Georgia and California. Her art is on display in homes
							throughout the United States and England.
						</p>
						{(randomArtworks[2].file &&
							<Img className={"aboutImg"} fluid={randomArtworks[2].file.childImageSharp.fluid}/>) ||
						(randomArtworks[2].image &&
							<img className={"aboutImg"} src={randomArtworks[2].image} alt="a random selection from artworks"/>)}
					</SectionWrapper>
				</div>
			);
		}}
	</LayoutContext.Consumer>
);
