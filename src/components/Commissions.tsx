import Img from "gatsby-image";
import React from "react";

import LayoutContext from "../contexts/LayoutContext";

import PageBreak from "./reusable/PageBreak";
import SectionWrapper from "./reusable/SectionWrapper";

export default () => (
	<LayoutContext.Consumer>
		{({ galleries }: any) => {
			// get random art from galleries
			const galleryArtworks: any[] = [];
			galleries.forEach(({ artworks }: any) => {
				Array.prototype.push.apply(galleryArtworks, artworks);
			});
			const randomArtworks = [];
			do {
				if (!galleryArtworks.length) { break; }
				const randomIndex = Math.floor(Math.random() * galleryArtworks.length);
				randomArtworks.push(galleryArtworks[randomIndex]);
				galleryArtworks.splice(randomIndex, 1);
			} while (randomArtworks.length < 5);
			while (randomArtworks.length < 5) { randomArtworks.push({}); }
			return (
				<div className="Commissions">
					<SectionWrapper>
						{(randomArtworks[0].file &&
							<Img className={"commissionImg"} fluid={randomArtworks[0].file.childImageSharp.fluid}/>) ||
						(randomArtworks[0].image &&
							<img className={"commissionImg"} src={randomArtworks[0].image} alt="a random selection from artworks"/>)}
						<p>
							Thank you for your interest in a commissioned pet portrait.
							I do my best to create an accurate artistic representation of your loved pet.
							I hope that it is a treasured piece of art for years and years.
							To do my best work for you, I have a few guidelines that will help.
							If you have any questions or concerns, please let’s discuss.
						</p>
						<PageBreak/>
						<h4>My Process:</h4>
						<h6>Inquiry</h6>
						<p>
							This is when you inquire about costs, availability, etc.
							I do not assume this is a commission yet.
							You do not have a reserved slot.
						</p>
						{(randomArtworks[1].file &&
							<Img className={"commissionImg"} fluid={randomArtworks[1].file.childImageSharp.fluid}/>) ||
						(randomArtworks[1].image &&
							<img className={"commissionImg"} src={randomArtworks[1].image} alt="a random selection from artworks"/>)}
						<PageBreak/>
						<h6>Commission accepted</h6>
						{(randomArtworks[2].file &&
							<Img className={"commissionImg"} fluid={randomArtworks[2].file.childImageSharp.fluid}/>) ||
						(randomArtworks[2].image &&
							<img className={"commissionImg"} src={randomArtworks[2].image} alt="a random selection from artworks"/>)}
						<p>
							I will accept the commission upon receipt of good photographs of your pet.
							Then I will provide an estimated completion date.
							Good photographs are in focus and the pet is in a reasonable posture and position.
							The better the photograph, the better the portrait.
							Each pet has their own expressions, markings, colorings and moods.
							I need to be able to see that since I don’t know your pet.
						</p>
						<PageBreak/>
						<h6>Timing</h6>
						<p>
							I am a working and learning artist.
							I also create landscapes and still life in pastel and oil and
							attend classes and workshops.
							So, I limit my pet portrait commissions to four per month.
							If I have four for delivery in one month, I’ll schedule you for the next month.
							Let me know if there are special dates you are aiming for.
							For the holidays, I will cut off commissions in early October
							so that I can deliver them before Christmas.
						</p>
						{(randomArtworks[3].file &&
							<Img className={"commissionImg"} fluid={randomArtworks[3].file.childImageSharp.fluid}/>) ||
						(randomArtworks[3].image &&
							<img className={"commissionImg"} src={randomArtworks[3].image} alt="a random selection from artworks"/>)}
						<PageBreak/>
						<h6>Payment</h6>
						{(randomArtworks[4].file &&
							<Img className={"commissionImg"} fluid={randomArtworks[4].file.childImageSharp.fluid}/>) ||
						(randomArtworks[4].image &&
							<img className={"commissionImg"} src={randomArtworks[4].image} alt="a random selection from artworks"/>)}
						<p>
							Is due upon receipt and includes any shipping/insurance costs.
							The title of the artwork belongs to the artist until the buyer pays
							the invoice in full.
						</p>
						<PageBreak/>
						<h4>Pet portrait pricing and details (as of June 2019)</h4>
						<ul>
							<li>Watercolor, 9x12  $125</li>
							<li>Watercolor, 12x16  $150</li>
							<li>Oil, 6x6 on linen canvas, $150</li>
						</ul>
						<p>
							*9X12 painted to fit in a standard 11X14 frame with mat cut to 8X10 opening.
						</p>
						<p>
							**12X16 painted to fit in a standard 16x20 frame with a mat cut to 11x14 opening.
						</p>
						<p>
							Of course, custom framing can alter those finished frame sizes.
						</p>
						<h1>Thank You!</h1>
					</SectionWrapper>
				</div>
			);
		}}
	</LayoutContext.Consumer>
);
