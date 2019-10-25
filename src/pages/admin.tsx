import React from "react";

import AdminLogin from "../components/AdminLogin";
import Layout from "../components/layout";
import SEO from "../components/seo";

const adminPage = () => (
	<Layout>
		<SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
		<AdminLogin/>
	</Layout>
);

export default adminPage;
