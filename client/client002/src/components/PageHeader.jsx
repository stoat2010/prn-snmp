import React from 'react';
import { NavLink } from 'react-router-dom'

export default function PageHeader() {
    return (

        <nav className="nav-extended blue darken-4">
            <div className="nav-wrapper">
                <div className="brand-logo center">SNMP опрос сетевых МФУ и принтеров</div>
                <ul id="nav-mobile" className="left hide-on-med-and-down">
                    <li ><NavLink exact to="/" activeClassName="yellow-text blue accent-4">Таблица</NavLink></li>
                    <li><NavLink to="/report" activeClassName="yellow-text blue accent-4">Отчет</NavLink></li>
                </ul>
            </div>
        </nav>
    )
}