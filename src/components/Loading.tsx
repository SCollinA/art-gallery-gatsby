import React from "react";

export default ({ children, loading, height = 650 }: any) =>
	<div className="loading-wrapper">
		{loading &&
			<div className="Loading"
				onClick={(event) => event.stopPropagation()}
			>
				<svg
					viewBox={`0 0 ${height} ${height}`}
				>
					{/* <circle cx='500' cy='500' r='250' fill='red'/> */}
					<path id="curve" fill="transparent"
						d={`
							M ${height / 2}, ${height / 2}
							m -${height / 4}, 0
							a ${height / 4},${height / 4} 0 1,1 ${height / 2},0
							a ${height / 4},${height / 4} 0 1,1 -${height / 2},0
						`}
					/>
					<text>
						<textPath alignmentBaseline="auto"
							xlinkHref="#curve"
						>
								mkcr • fine • art •
						</textPath>
					</text>
				</svg>
			</div>}
		{children}
	</div>;
