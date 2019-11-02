/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const Artwork = require("../art-gallery-back/Artwork");

exports.onPostBuild = () => {
    // reset all the recentlyUpdatedImage things
    console.log("resetting recentlyUpdatedImage");
    return async () => await Artwork.upate({ recentlyUpdatedImage: false }, { where: {} });
}
// You can delete this file if you're not using it