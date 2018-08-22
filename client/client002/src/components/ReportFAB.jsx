import React from 'react';
import { SpeedDial, SpeedDialItem, Fab } from 'react-onsenui';
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

import styles from './Styles.css';

export default function ReportFAB(props) {

    return (
        <SpeedDial disabled={false} direction='up' onClick={() => console.log('test1')} style={styles.btnpdf}>
            <Fab className="btn-floating btn-large waves-effect waves-light z-depth-5 blue">
                <i className="material-icons" style={{verticalAlign: 'middle'}}>insert_drive_file</i>
            </Fab>
            <SpeedDialItem className="green">
                <a href="http://127.0.0.1:3333/api/pdf">
                    <i className="material-icons white-text" style={{verticalAlign: 'middle'}}>show_chart</i>
                </a> 
            </SpeedDialItem>
            <SpeedDialItem  className="orange" onClick={() => console.log('speed B')}>
                <a href="http://127.0.0.1:3333/api/pdf">
                    <i className="material-icons white-text" style={{verticalAlign: 'middle'}}>insert_chart</i>
                </a>
            </SpeedDialItem>
        </SpeedDial>
    )
}