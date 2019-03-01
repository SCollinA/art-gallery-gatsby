/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const gallery = require('./src/pages/gallery')

const galleryPage = createPage({
                        // Path for this page — required
                        path: `gallery`,
                        component: gallery,
                        context: {},
                    })

exports.createPages = () => galleryPage