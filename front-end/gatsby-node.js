/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const Artwork = require("../back-end/sql/Artwork");

exports.onPostBuild = () => {
    // reset all the recentlyupdatedimage things
    console.log("resetting recentlyupdatedimage");
    return Artwork.update({ recentlyupdatedimage: false }, { where: { recentlyupdatedimage: true } })
        .then((result) => console.log(`Successfully reset ${result}`))
        .catch((error) => console.log(`Error during reset ${error}`));
}
// You can delete this file if you're not using it