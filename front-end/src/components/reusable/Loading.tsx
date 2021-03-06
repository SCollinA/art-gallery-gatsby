import React from "react";

const height = 650;

export default ({
	children,
	loading,
	fitChild = false,
	preventClick = true,
}: {
	children: any,
	loading: boolean,
	fitChild?: boolean,
	preventClick?: boolean,
}) =>
	<div className={`loading-wrapper`}>
		{loading &&
			<div className={`Loading${fitChild ? " fit-child" : ""}`}
				onClick={(event) =>
					preventClick && event.stopPropagation()}
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
