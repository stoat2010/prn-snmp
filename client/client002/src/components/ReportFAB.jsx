import React from 'react';
import { SpeedDial, SpeedDialItem, Fab } from 'react-onsenui';
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

import styles from './Styles.css';

export default function ReportFAB(props) {

    return (
        <SpeedDial disabled={false} direction='up'style={styles.btnpdf}>
            <Fab className="btn-floating btn-large waves-effect waves-light z-depth-5 blue">
                <i className="material-icons" style={{verticalAlign: 'middle'}}>description</i>
            </Fab>
            <SpeedDialItem className="brown">
                <a href="http://192.168.1.102:3333/api/pdf1">
                    <i className="material-icons white-text" style={{verticalAlign: 'middle'}}>show_chart</i>
                </a> 
            </SpeedDialItem>
            <SpeedDialItem  className="orange" onClick={()=>props.pdfCreate({addr: 'http://192.168.1.102:3333/api/pdf2', name: 'topdevices-' + new Date().toLocaleDateString() + '.pdf'})}>
                    <i className="material-icons white-text" style={{verticalAlign: 'middle'}}>insert_chart</i>
            </SpeedDialItem>
            <SpeedDialItem  className="pink" onClick={()=>props.pdfCreate({ addr: 'http://192.168.1.102:3333/api/pdf3', name: 'devicelimit-' + new Date().toLocaleDateString() + '.pdf'})}>
                    <i className="material-icons white-text" style={{verticalAlign: 'middle'}}>reorder</i>
            </SpeedDialItem>
            <SpeedDialItem  className="green white-text">
                <a className="white-text" style={{verticalAlign: 'middle', fontStyle: 'italic'}} href="http://192.168.1.102:3333/api/xls">
                    e
                </a>
            </SpeedDialItem>
        </SpeedDial>
    )
}