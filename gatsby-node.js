/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const Artwork = require("../art-gallery-back/Artwork");

exports.onPostBuild = () => {
    // reset all the recentlyupdatedimage things
    console.log("resetting recentlyupdatedimage");
    return async () => await Artwork.upate({ recentlyupdatedimage: false }, { where: {} });
}
// You can delete this file if you're not using it