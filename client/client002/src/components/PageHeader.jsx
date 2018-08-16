import React from 'react';
import { NavLink } from 'react-router-dom'

export default function PageHeader() {
    return (

        <nav className="nav-extended blue darken-4">
            <div className="nav-wrapper">
                <NavLink exact to="/" className="brand-logo center">SNMP опрос сетевых МФУ и принтеров</NavLink>
            </div>
        </nav>
    )
}