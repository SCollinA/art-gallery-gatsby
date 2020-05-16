import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import SectionWrapper from "../reusable/SectionWrapper";

import PageLinks from "./PageLinks";
import SocialLinks from "./SocialLinks";

export default () => {
	const [isExpanded, setIsExpanded] = React.useState(false);
	return (
		<div className={`HamburgerLinks${isExpanded ? " expandedMenu" : ""}`}
			onClick={() =>
				setIsExpanded(!isExpanded)}
		>
			<FontAwesomeIcon icon={faBars} size="3x"/>
			{isExpanded &&
				<SectionWrapper>
					<PageLinks />
					<SocialLinks />
				</SectionWrapper>
			}
		</div>
	);
};
