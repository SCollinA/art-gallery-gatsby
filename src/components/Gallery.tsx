import { get } from "lodash/fp";
import React from "react";

import AdminContext from "../contexts/AdminContext";
import LayoutContext from "../contexts/LayoutContext";

import ArtworkChoice from "./ArtworkChoice";
import GalleryChoice from "./GalleryChoice";
import GalleryMain from "./GalleryMain";
import PageBreak from "./PageBreak";
import UpdateFormWrapper from "./UpdateFormWrapper";

export default () =>
	<div className="Gallery">
		<GalleryMain/>
		<PageBreak/>
		<GalleryChoice/>
		<ArtworkChoice/>
		<UpdateFormWrapper></UpdateFormWrapper>
	</div>;
