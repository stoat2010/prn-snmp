import React from 'react';

import ListFilter from './ListFilter';

import styles from './Styles.css.js';

export default function TopNav(props) {

    var devices = [...new Set(props.devices.map(item => item.device))];
    var builds = [...new Set(props.devices.map(item => item.build))];
    var units = [...new Set(props.devices.map(item => item.unit))];
    var vendors = [...new Set(props.devices.map(item => item.vendor))];

    return (
        <div className="z-depth-5 center-align" style={props.topStyle}>
            <div className="container">
                <label htmlFor="myTopNavIp" className="teal-text">Отбор по IP адресу</label>
                <ListFilter style = {styles.slcDev} values={devices} handleChange={props.handleChange} />
                <label htmlFor="myTopNavBuild" className="teal-text">Отбор по корпусу</label>
                <ListFilter style = {styles.slcDev} values={builds} handleChange={props.handleChangeBuild} />
                <label htmlFor="myTopNavBuild" className="teal-text">Отбор по подразделению</label>
                <ListFilter style = {styles.slcDev} values={units} handleChange={props.handleChangeUnit} />
                <label htmlFor="myTopNavVendor" className="teal-text">Отбор по производителю</label>
                <ListFilter style = {styles.slcDev} values={vendors} handleChange={props.handleChangeVendor} />
                
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