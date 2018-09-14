import React from 'react'

const Svg =({ children, fill="#424242" }) => 
    <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={fill}>
        <path d="M0 0h24v24H0z" fill="none"/>
        {children}
    </svg>

const SvgDevOn = (props) => <Svg {...props}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></Svg>
const SvgDevOff = (props) => <Svg {...props}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM4 12c0-4.42 3.58-8 8-8 1.85 0 3.55.63 4.9 1.69L5.69 16.9C4.63 15.55 4 13.85 4 12zm8 8c-1.85 0-3.55-.63-4.9-1.69L18.31 7.1C19.37 8.45 20 10.15 20 12c0 4.42-3.58 8-8 8z"/></Svg>
const SvgBtnRefresh = (props) => <Svg {...props}><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></Svg>
const SvgBtnSave = (props) => <Svg {...props}><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/></Svg>
const SvgDevShot = (props) => <Svg {...props}><path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/></Svg>
const SvgBtnDel = (props) => <Svg {...props}><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></Svg>
const SvgExpLess = (props) => <Svg {...props}><path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"/></Svg>
const SvgExpMore = (props) => <Svg {...props}><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/></Svg>
const SvgChart = (props) => <Svg {...props}><path d="M9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4zm2.5 2.1h-15V5h15v14.1zm0-16.1h-15c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/></Svg>

export {
    SvgDevOn, 
    SvgDevOff, 
    SvgBtnRefresh, 
    SvgBtnSave, 
    SvgDevShot, 
    SvgBtnDel, 
    SvgExpLess, 
    SvgExpMore,
    SvgChart
}