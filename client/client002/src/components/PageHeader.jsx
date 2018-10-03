import React from 'react';
import { NavLink } from 'react-router-dom';
import {SvgBtnPwrOn,} from './Svg';

export default function PageHeader() {
    return (

        <nav className="nav-extended indigo darken-4">
            <div className="nav-wrapper">
                <NavLink exact to="/" className="brand-logo center white-text">SNMP опрос сетевых МФУ и принтеров</NavLink>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to = "/login"><SvgBtnPwrOn fill="white" /></NavLink></li>
                </ul>
            </div>
            <div className="nav-content">
                <ul className="tabs tabs-transparent">
                    <li className="tab"><NavLink exact to = "/" activeClassName="yellow-text">Главная</NavLink></li>
                    <li className="tab disabled"><NavLink to = "/adminpoint" activeClassName="yellow-text">Администрирование</NavLink></li>
                    <li className="tab disabled"><NavLink to = "/config" activeClassName="yellow-text">Настройки</NavLink></li>
                    <li className="tab  right"><NavLink to = "/login" activeClassName="yellow-text">Авторизация</NavLink></li>
                </ul>
            </div>
        </nav>
    )
}