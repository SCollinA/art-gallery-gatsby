import { get } from "lodash/fp";
import React from "react";

import LayoutContext from "../contexts/layoutContext";

import ArtworkChoice from "./ArtworkChoice";
import GalleryChoice from "./GalleryChoice";
import GalleryMain from "./GalleryMain";
import PageBreak from "./PageBreak";

export default () =>
	<div className="Gallery">
		<GalleryMain/>
		<PageBreak/>
		<GalleryChoice/>
		<ArtworkChoice/>
	</div>;
