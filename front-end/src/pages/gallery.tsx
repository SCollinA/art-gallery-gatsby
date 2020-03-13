import React from "react";
import Gallery from "../components/Gallery";
import Layout from "../components/layout";
import SEO from "../components/seo";

export default () => (
	<Layout>
		<SEO title="Gallery" keywords={[`gatsby`, `application`, `react`]} />
		<Gallery/>
	</Layout>
);
