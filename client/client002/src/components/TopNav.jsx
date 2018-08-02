import React from 'react';

import styles from './Styles.css.js';

export default function TopNav(props) {

    var builds = [... new Set(props.devices.map(item => item.build))];
    var units = [... new Set(props.devices.map(item => item.unit))];
    var vendors = [... new Set(props.devices.map(item => item.vendor))];

    return (
        <div className="z-depth-5 center-align" style={props.topStyle}>
            <div className="container">
                <select id="myTopNavIp" className="browser-default z-depth-50" style={styles.slcDev} onChange={props.handleChange}>
                    <option value={0}>Все</option>
                    {props.devices.map(device => <option key={device.device} value={device.device}>{device.device}</option>)}
                </select>
                <label htmlFor="myTopNavIp" className="teal-text">Отбор по IP адресу</label>
                <select id="myTopNavBuild" className="browser-default z-depth-50" style={styles.slcDev} onChange={props.handleChangeBuild}>
                    <option value={0}>Все</option>
                    {builds.map(build => <option key={build} value={build}>{build}</option>)}
                </select>
                <label htmlFor="myTopNavBuild" className="teal-text">Отбор по корпусу</label>
                <select id="myTopNavUnit" className="browser-default z-depth-50" style={styles.slcDev} onChange={props.handleChangeUnit}>
                    <option value={0}>Все</option>
                    {units.map(unit => <option key={unit} value={unit}>{unit}</option>)}
                </select>
                <label htmlFor="myTopNavBuild" className="teal-text">Отбор по подразделению</label>
                <select id="myTopNavVendor" className="browser-default z-depth-50" style={styles.slcDev} onChange={props.handleChangeVendor}>
                    <option value={0}>Все</option>
                    {vendors.map(vendor => <option key={vendor} value={vendor}>{vendor}</option>)}
                </select>
                <label htmlFor="myTopNavVendor" className="teal-text">Отбор по производителю</label>
            </div>

                <div style={styles.topnavLabel}>
                    <button
                        className='btn-flat brown lighten-1 white-text'
                        style={styles.btnExpand}
                        onClick={props.toggleTopVisible}>
                        <div className="row col s12">
                            <i className="material-icons col s2">{props.btnArrows}</i>
                            <div className="col s8 offset 1">Настройка списка</div>
                            <i className="material-icons col s2 offset 1">{props.btnArrows}</i>
                        </div>
                    </button>
                </div>
            
        </div>
    )
}