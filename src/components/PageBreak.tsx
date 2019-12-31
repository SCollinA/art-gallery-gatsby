import React from "react";

export default ({ vertical }: { vertical: boolean }) =>
	<div className="page-break-container">
		<div className="page-break"
			style={{
				height: vertical ? "50%" : "0",
				margin: vertical ?
					"auto 25px" : "25px auto",
				width: vertical ? "0" : "50%",
			}}
		></div>
	</div>;
