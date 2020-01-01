import { graphql, useStaticQuery } from "gatsby";
import Img from "gatsby-image";
import React from "react";

import SectionWrapper from "./reusable/SectionWrapper";

export default () => {
	const data = useStaticQuery(graphql`
		query {
			image: file(relativePath: { eq: "kelly.jpg" }) {
				childImageSharp {
					fluid(maxWidth: 1000, quality: 100) {
						...GatsbyImageSharpFluid_tracedSVG
					}
				}
			}
		}
	`);
	return (
		<div className="About">
			<SectionWrapper>
				<p>
					Kelly is an artist of many mediums.
					Her work includes landscapes, still life and animals.
					She enjoys doing commissioned pet portraits,
					which are regular in her artistic practice.
					“Pets are our best friends, loyal and faithful companions
					that deserve careful attention. I’ll do my best.”
				</p>
				<p>
					Kelly creates inspired work and commissioned work in watercolor, oil, pastel, and charcoal.
					To stay current in the art community, she studies through classes and workshops.
					For thirty years, she worked as a communications professional.
					Although fulfilling, she long planned to “retire” from the nine-to-five
					to explore art.
				</p>
				<p>
					From the time she was a little girl she has held paint brushes,
					pencils, and pastels in her hand and created art.
					She learned to draw by copying comic strips from the Sunday paper.
					Since her first Mickey Mouse easel she has always owned an easel.
					Many books, and lots of practice, have helped to change and refine her style.
				</p>
				<Img className="aboutImg" fluid={data.image.childImageSharp.fluid}/>
				<p>
					Her love of the family pets, and all pets,
					translated into something she could share with others.
					And it makes so many people happy. It’s a joy.
					Kelly and her husband live in Roswell, Georgia and Beaufort,
					South Carolina. Their five adult children and respective families
					live in Georgia and California. Her art is on display in homes
					throughout the United States and England.
				</p>
			</SectionWrapper>
		</div>
	);
};
