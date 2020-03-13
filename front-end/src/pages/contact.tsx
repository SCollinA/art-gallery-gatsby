import React from "react";

import ContactForm from "../components/ContactForm";
import Layout from "../components/layout";
import SEO from "../components/seo";

export default () => (
	<Layout>
		<SEO title="Contact" keywords={[`gatsby`, `application`, `react`]} />
		<ContactForm />
	</Layout>
);
