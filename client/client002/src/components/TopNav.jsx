import React from 'react';

import styles from './Styles.css.js';

export default function TopNav(props) {

    return (
        <div id="myTopNav" className="z-depth-5 center-align" style={props.topStyle}>
            <div className="container">
                <select className="browser-default z-depth-50" style={styles.slcDev} onChange={props.handleChange}>
                    <option value={0}>Все</option>
                    {props.devices.map(device => <option key={device.device} value={device.device}>{device.device}</option>)}
                </select>
                <label htmlFor="myTopNav">Отбор по IP адресу</label>
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