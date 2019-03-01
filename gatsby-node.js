/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require('path')

const gallery = path.resolve(`./src/pages/gallery.js`)


exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions
    
    createPage({
        // Path for this page — required
        path: `gallery`,
        component: gallery,
        context: {},
    })
}