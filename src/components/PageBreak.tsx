import React from "react";

export default ({ vertical }: { vertical: boolean }) =>
	<div className="page-break-container">
		<div className={`page-break${vertical ? " page-break--vertical" : ""}`}
		></div>
	</div>;
