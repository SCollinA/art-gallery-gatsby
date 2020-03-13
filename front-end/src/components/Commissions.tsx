import Img from "gatsby-image";
import React from "react";

import LayoutContext from "../contexts/LayoutContext";

import PageBreak from "./reusable/PageBreak";
import SectionWrapper from "./reusable/SectionWrapper";

export default () =>
	<div className="Commissions">
		<SectionWrapper>
			<p>
				Thank you for your interest in a commissioned pet portrait.
				I do my best to create an accurate artistic representation of your loved pet.
				I hope that it is a treasured piece of art for years and years.
				To do my best work for you, I have a few guidelines that will help.
				If you have any questions or concerns, please let’s discuss.
			</p>
			<h4>My Process:</h4>
			<h6>Inquiry</h6>
			<p>
				This is when you inquire about costs, availability, etc.
				I do not assume this is a commission yet.
				You do not have a reserved slot.
			</p>
			<h6>Commission accepted</h6>
			<p>
				I will accept the commission upon receipt of good photographs of your pet.
				Then I will provide an estimated completion date.
				Good photographs are in focus and the pet is in a reasonable posture and position.
				The better the photograph, the better the portrait.
				Each pet has their own expressions, markings, colorings and moods.
				I need to be able to see that since I don’t know your pet.
			</p>
			<h6>Timing</h6>
			<p>
				I limit my pet portrait commissions to four per month.
				If I have four for delivery in one month, I’ll schedule you for the next month.
				Let me know if there are special dates you are aiming for.
				For the holidays, I will cut off commissions in early October
				so that I can deliver them before Christmas.
			</p>
			<h6>Payment</h6>
			<p>
				Due upon receipt and includes any shipping/insurance costs.
				The title of the artwork belongs to the artist until the buyer pays
				the invoice in full.
			</p>
			<h4>Pet portrait pricing and details (as of June 2019)</h4>
			<ul>
				<li>Watercolor, 9x12  $125</li>
				<li>Watercolor, 12x16  $150</li>
				<li>Oil, 6x6 on linen canvas, $150</li>
			</ul>
			<div className="commissionNotes">
				<p>
					*9X12 painted to fit in a standard 11X14 frame with mat cut to 8X10 opening.
				</p>
				<p>
					**12X16 painted to fit in a standard 16x20 frame with a mat cut to 11x14 opening.
				</p>
			</div>
			<p>
				Of course, custom framing can alter those finished frame sizes.
			</p>
			<h1>Thank You!</h1>
		</SectionWrapper>
	</div>;
