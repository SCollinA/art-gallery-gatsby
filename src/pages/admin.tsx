import React from "react";

import Layout from "../components/layout";
import AdminLogin from "../components/page-elements/AdminLogin";
import SEO from "../components/seo";

const adminPage = () => (
	<Layout>
		<SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
		<AdminLogin/>
	</Layout>
);

export default adminPage;
