import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import PageLinks from "./PageLinks";
import SocialLinks from "./SocialLinks";

export default class HamburgerLinks extends React.Component<any, any, any> {
	constructor(props: any) {
		super(props);
		this.state = {
			isExpanded: false,
		};
	}

	public render() {
		return (
			<div className={`HamburgerLinks${this.state.isExpanded ? " expandedMenu" : ""}`}
				onClick={() => {
					this.setState({
						isExpanded: !this.state.isExpanded,
					});
				}}
			>
				<FontAwesomeIcon icon={["far", "times-circle"]} size="3x" />
				{this.state.isExpanded && (
					<>
						<PageLinks />
						<SocialLinks />
					</>
				)}
			</div>
		);
	}
}
