import React from 'react';
import { SpeedDial, SpeedDialItem, Fab } from 'react-onsenui';
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

import styles from './Styles.css';
import {srvParams} from '../srvParams';

export default function ReportFAB(props) {

    return (
        <SpeedDial disabled={false} direction='left'style={styles.btnpdf}>
            <Fab className="btn-floating btn-large waves-effect waves-light z-depth-5 blue">
                <i className="material-icons" style={{verticalAlign: 'middle'}}>description</i>
            </Fab>
            <SpeedDialItem className="brown">
                <a href={(()=>"http://" + srvParams.srvAddr + ":" + srvParams.srvPort + "/api/pdf1")()}>
                    <i className="material-icons white-text" style={{verticalAlign: 'middle'}}>show_chart</i>
                </a> 
            </SpeedDialItem>
            <SpeedDialItem  className="orange" onClick={()=>props.pdfCreate({addr: "http://" + srvParams.srvAddr + ":" + srvParams.srvPort + "/api/pdf2", name: 'topdevices-' + new Date().toLocaleDateString() + '.pdf'})}>
                    <i className="material-icons white-text" style={{verticalAlign: 'middle'}}>insert_chart</i>
            </SpeedDialItem>
            <SpeedDialItem  className="pink" onClick={()=>props.pdfCreate({ addr: "http://" + srvParams.srvAddr + ":" + srvParams.srvPort + "/api/pdf3", name: 'devicelimit-' + new Date().toLocaleDateString() + '.pdf'})}>
                    <i className="material-icons white-text" style={{verticalAlign: 'middle'}}>reorder</i>
            </SpeedDialItem>
            <SpeedDialItem  className="green white-text">
                <a className="white-text" style={{display: "flex", justifyContent: "center", fontStyle: 'italic'}} href={(()=>"http://" + srvParams.srvAddr + ":" + srvParams.srvPort + "/api/pdf1")()}>
                    e
                </a>
            </SpeedDialItem>
        </SpeedDial>
    )
}