import React from 'react';
import { NavLink } from 'react-router-dom';
import ReactSVG from 'react-svg';

export default function PageHeader() {
    return (

        <nav className="nav-extended white">
            <div className="nav-wrapper">
                {/* <NavLink exact to="/" className="brand-logo right"><ReactSVG path="logo-icon.svg" svgStyle={{ width: 20, margin: "10"}} /></NavLink> */}
                <NavLink exact to="/" className="brand-logo left"><ReactSVG path="logo-text.svg" svgStyle={{ height: 20, margin: "10"}} /></NavLink>
                <NavLink exact to="/" className="brand-logo center" style={{color: "#01579b"}}>SNMP опрос сетевых МФУ и принтеров</NavLink>
            </div>
        </nav>
    )
}