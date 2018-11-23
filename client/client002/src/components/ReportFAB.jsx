import React from 'react';
import { SpeedDial, SpeedDialItem, Fab } from 'react-onsenui';
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

import styles from './Styles.css';
import {srvParams} from '../srvParams';
import {SvgDescr, SvgShowChart, SvgInsertChart, SvgReorder} from './Svg';

export default function ReportFAB(props) {

    return (
        <SpeedDial disabled={false} direction='up' style={styles.btnpdf} >
            <Fab className="btn-floating btn-large waves-effect waves-light z-depth-5 blue">
                <SvgDescr fill="white"/>
            </Fab>
            <SpeedDialItem className="brown">
                <a href={(()=>"http://" + srvParams.srvAddr + ":" + srvParams.srvPort + "/api/pdf1")()}>
                    <SvgShowChart fill="white"/>
                </a> 
            </SpeedDialItem>
            <SpeedDialItem  className="orange" onClick={()=>props.pdfCreate({addr: "http://" + srvParams.srvAddr + ":" + srvParams.srvPort + "/api/pdf2", name: 'topdevices-' + new Date().toLocaleDateString() + '.pdf'})}>
                    <SvgInsertChart fill="white"/>
            </SpeedDialItem>
            <SpeedDialItem  className="pink" onClick={()=>props.pdfCreate({ addr: "http://" + srvParams.srvAddr + ":" + srvParams.srvPort + "/api/pdf3", name: 'devicelimit-' + new Date().toLocaleDateString() + '.pdf'})}>
                   <SvgReorder fill="white"/>
            </SpeedDialItem>
            <SpeedDialItem  className="green white-text">
                <a className="white-text" style={{display: "flex", justifyContent: "center", fontStyle: 'italic'}} href={(()=>"http://" + srvParams.srvAddr + ":" + srvParams.srvPort + "/api/pdf1")()}>
                    e
                </a>
            </SpeedDialItem>
        </SpeedDial>
    )
}