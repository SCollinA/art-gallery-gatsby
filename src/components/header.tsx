import { graphql, Link, StaticQuery } from "gatsby";
import Img from "gatsby-image";
import PropTypes from "prop-types";
import React from "react";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import HamburgerLinks from "./HamburgerLinks";
import PageLinks from "./PageLinks";
import SocialLinks from "./SocialLinks";
library.add(faInstagram, faFacebook, faEnvelope, faAngleLeft, faAngleRight, faTimesCircle);

const header = () => (
	<div className="Header">
		<div className="headerLinks">
			<div className="homeLink">
				<Link to="/"
					activeClassName="activeLink"
					style={{
						color: `white`,
						textDecoration: `none`,
					}}
				>
					<StaticQuery
						query={graphql`
							query {
								brandImage: file(relativePath: { eq: "brand.png" }) {
									childImageSharp {
										fluid(maxWidth: 2000) {
											...GatsbyImageSharpFluid_tracedSVG
										}
									}
								}
							}
						`}
						render={(data) => (
							<Img fluid={data.brandImage.childImageSharp.fluid}/>
						)}/>
				</Link>
			</div>
			<SocialLinks />
		</div>
		<HamburgerLinks />
		<PageLinks />
	</div>
);

header.propTypes = {
	siteTitle: PropTypes.string,
};

header.defaultProps = {
	siteTitle: ``,
};

export default header;
