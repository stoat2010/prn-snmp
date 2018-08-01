import React from 'react';

import styles from './Styles.css.js';

export default function TopNav(props) {

    var builds = props.devices.map(item => item.build);
    var builds1 = [... new Set(builds)];

    return (
        <div id="myTopNavIp" className="z-depth-5 center-align" style={props.topStyle}>
            <div className="container">
                <select className="browser-default z-depth-50" style={styles.slcDev} onChange={props.handleChange}>
                    <option value={0}>Все</option>
                    {props.devices.map(device => <option key={device.device} value={device.device}>{device.device}</option>)}
                </select>
                <label htmlFor="myTopNavBuil">Отбор по IP адресу</label>
                <select className="browser-default z-depth-50" style={styles.slcDev} onChange={props.handleChangeBuild}>
                    <option value={0}>Все</option>
                    {builds1.map(build => <option key={build} value={build}>{build}</option>)}
                </select>
                <label htmlFor="myTopNavBuild">Отбор по корпусу</label>
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