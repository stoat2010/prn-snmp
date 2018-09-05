import React from 'react';
import { NavLink } from 'react-router-dom';
//import ReactSVG from 'react-svg';

export default function PageHeader() {
    return (

        <nav className="nav-extended indigo darken-4">
            <div className="nav-wrapper">
                {/* <NavLink exact to="/" className="brand-logo right"><ReactSVG path="logo-text.svg" svgStyle={{ height: 20, margin: "10"}} /></NavLink> */}
                {/* <NavLink exact to="/" className="brand-logo left"><ReactSVG path="logo-text.svg" svgStyle={{ height: 20, margin: "10"}} /></NavLink> */}
                <NavLink exact to="/" className="brand-logo center white-text">SNMP опрос сетевых МФУ и принтеров</NavLink>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to = "/login"><i className="material-icons">power_settings_new</i></NavLink></li>
                </ul>
            </div>
            <div className="nav-content">
                <ul className="tabs tabs-transparent">
                    <li className="tab"><NavLink exact to = "/" activeClassName="yellow-text">Главная</NavLink></li>
                    <li className="tab"><NavLink to = "/adminpoint" activeClassName="yellow-text">Администрирование</NavLink></li>
                    <li className="tab"><NavLink to = "/config" activeClassName="yellow-text">Настройки</NavLink></li>
                </ul>
            </div>
        </nav>
    )
}