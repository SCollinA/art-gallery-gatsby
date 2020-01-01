import { graphql, StaticQuery, useStaticQuery } from "gatsby";
import PropTypes from "prop-types";
import React from "react";
import Helmet from "react-helmet";

function SEO({ description, lang, meta, keywords, title }: any) {
	const data = useStaticQuery(detailsQuery);
	const metaDescription =
		description || data.site.siteMetadata.description;
	return (
		<Helmet
			htmlAttributes={{
				lang,
			}}
			title={title}
			titleTemplate={`%s | ${data.site.siteMetadata.title}`}
			meta={[
				{
					content: metaDescription,
					name: `description`,
				},
				{
					content: title,
					property: `og:title`,
				},
				{
					content: metaDescription,
					property: `og:description`,
				},
				{
					content: `website`,
					property: `og:type`,
				},
				{
					content: `summary`,
					name: `twitter:card`,
				},
				{
					content: data.site.siteMetadata.author,
					name: `twitter:creator`,
				},
				{
					content: title,
					name: `twitter:title`,
				},
				{
					content: metaDescription,
					name: `twitter:description`,
				},
			]
				.concat(
					keywords.length > 0
						? {
								content: keywords.join(`, `),
								name: `keywords`,
							}
						: [],
				)
				.concat(meta)}
		/>
	);
}

SEO.defaultProps = {
	keywords: [],
	lang: `en`,
	meta: [],
};

SEO.propTypes = {
	description: PropTypes.string,
	keywords: PropTypes.arrayOf(PropTypes.string),
	lang: PropTypes.string,
	meta: PropTypes.array,
	title: PropTypes.string.isRequired,
};

export default SEO;

const detailsQuery = graphql`
	query DefaultSEOQuery {
		site {
			siteMetadata {
				title
				description
				author
			}
		}
	}
`;
