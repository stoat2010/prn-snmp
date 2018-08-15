import React from 'react'

export default function RowReport(props) {
    return (
        <div className="row col s12">
            <div className="col s1 brown-text" style={{ width: '25%', textAlign: 'left', fontSize: 'x-small' }}>
                цех/отдел: <b>{props.device.unit}</b><br />
                корпус: <b>{props.device.build}</b><span>&nbsp;</span>
                кабинет: <b>{props.device.office}</b><br />
            </div>
            <div className="col s1" style={{ width: '20%', textAlign: 'center' }}>
                <span style={{fontSize: 'x-small', textTransform: 'lowercase' }}><b>{props.device.name}</b></span><br />
                <span style={{fontSize: 'small' }}><b>{props.device.device}</b></span>
            </div>
            <div className="col s1" style={{ width: '20%', textAlign: 'center', fontSize: 'small', paddingTop: '0.5%' }}>{props.device.model}</div>
            <div className="col s1" style={{ width: '20%', textAlign: 'center', fontSize: 'small', paddingTop: '0.5%' }}>{props.device.vendor}</div>
        </div>
    )
}