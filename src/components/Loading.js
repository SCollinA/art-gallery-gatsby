import React from 'react'

export default () => {
    const height = 500
    return (
        <div className='Loading'>
            <svg 
                viewBox={`0 0 ${height} ${height}`}
            >
                {/* <circle cx='500' cy='500' r='250' fill='red'/> */}
                <path id="curve" fill='transparent'
                    d={`
                        M ${height / 2}, ${height / 2}
                        m -${height / 4}, 0
                        a ${height / 4},${height / 4} 0 1,1 ${height / 2},0
                        a ${height / 4},${height / 4} 0 1,1 -${height / 2},0
                    `}
                />
                <text>
                    <textPath
                     alignmentBaseline="top"
                     xlinkHref="#curve">
                        mkcr • fine • art •
                    </textPath>
                </text>
            </svg>
        </div>
    )
    }