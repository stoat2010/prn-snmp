import React from 'react';

import styles from './Styles.css.js';

export default function CommandRow(props) {

    return (
        <tr className="grey white-text z-depth-5" style={styles.commandRow}>
            <th>
                <button 
                    className="btn-floating btn-large waves-effect waves-light red z-depth-5" 
                    onClick={props.toggleVisible}>
                        <i className="material-icons">add</i>
                </button>
            </th>
            <th>
                <select className="browser-default z-depth-5" style={styles.slcDev} onChange={props.handleChange}>
                    <option value={0}>Все</option>
                    {props.devices.map(device=> <option value={device.device}>{device.device}</option>)}  
                </select>
            </th>
            <th>
                <select className="browser-default z-depth-5" style={styles.slcDev} onChange={props.handleChange}>
                    <option value={0}>Все</option>
                    {props.devices.map(device=> <option value={device.build}>{device.build}</option>)}  
                </select>
                {/* <select className="browser-default z-depth-5" style={styles.slcDev} onChange={props.handleChangeDescGroup}>
                    <option value={0}>Все</option>
                    <option value value='build'>Корпус</option>
                    <option value value='office'>Кабинет</option>  
                    <option value value='unit'>Служба/отдел</option>    
                </select>
                <br />
                <select className="browser-default z-depth-5" style={styles.slcDev} onChange={props.handleChangeDesc}>
                    <option value={0}>---</option>
                    {props.description.map(device=> <option value={device.device}>{device.device}</option>)}
                </select> */}
            </th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
        </tr>

    )
}