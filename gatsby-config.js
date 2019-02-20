module.exports = {
  siteMetadata: {
    title: `MKCR Fine Art`,
    description: `A gallery to display the works of Kelly Regus.`,
    author: `Collin Argo`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: "gatsby-source-pg",
      options: {
        connectionString: "postgres:///art-gallery",
        schema: "public",
        refetchInterval: 60, // Refetch data every 60 seconds
      },
    }, 
    {
      resolve: 'gatsby-source-graphql',
      options: {
        typeName: 'AGAPI',
        fieldName: 'artGallery',
        url: 'http://localhost:4000/graphql',
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `art-gallery`,
        short_name: `mkcr`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/brand.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ],
}
