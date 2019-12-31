import React from "react";

import UpdateFormWrapper from "./gallery/update/UpdateFormWrapper";

import GalleryNavigator from "./gallery/retrieve/GalleryNavigator";
import GallerySelection from "./gallery/retrieve/GallerySelection";

export default () =>
	<div className="Gallery">
		<GalleryNavigator/>
		<UpdateFormWrapper/>
		<GallerySelection/>
	</div>;
