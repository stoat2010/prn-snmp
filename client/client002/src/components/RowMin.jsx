import React, { Component } from 'react';
import styles from './Styles.css.js';

import PrintBar from './Bar';

export default function RowMin (props)
    {   
        //new Date(this.state.dataDate).toLocaleDateString() === new Date().toLocaleDateString() ? this.classDate = "green-text": this.classDate = 'orange-text';

        return (
            <div>
                {/* <div className="col s1" style={{ width: '3%', textAlign: 'center', paddingTop: '0.5%'}}><button className={this.classN} onClick={this.devInfo}><i className="material-icons">refresh</i></button></div> */}
                
                <div>
                    цех/отдел: {props.unit}
                    {/* корпус: <b>{props.device.build}</b><span>&nbsp;</span>
                    кабинет: <b>{props.device.office}</b><br />
                    принято: <b>{new Date(props.device.start_date).toLocaleDateString() }</b><span>&nbsp;</span>
                    остаток: <b>{props.device.balance}</b> */}
                </div>
                {/* <div className="col s1" style={{ width: '11%', textAlign: 'center'}}>
                    <span style={{color: "#880e4f", fontSize: 'x-small', textTransform: 'lowercase'}}><b>{this.props.device.name}</b></span><br />
                    <span style={{color: "#2962ff", fontSize: 'small'}}><b>{this.props.device.device}</b></span>
                </div>
                <div className="col s1" style={{ width: '11%', textAlign: 'center', fontSize: 'small', paddingTop: '0.5%' }}>{this.props.device.model}</div>
                <div className="col s1" style={{ width: '7%', textAlign: 'center', fontSize: 'small', paddingTop: '0.5%' }}>{this.props.device.vendor}</div>
                <div className="col s1" style={{ width: '6%', textAlign: 'center', fontSize: 'small', paddingTop: '0.5%' }}>{this.props.device.serial}</div>
                <div className="col s1" style={{ width: '6%', textAlign: 'center', fontSize: 'small', paddingTop: '0.5%' }}>{this.state.devData[3]}</div>
                <div className="col s1" style={{ width: '5%', textAlign: 'center', fontSize: 'small'}}>
                    {this.cl()}<br />
                        {this.state.dataDate === '' ? <span style={{fontSize: 'xx-small'}}></span> : <span className={this.classDate} style={{fontSize: 'xx-small'}}>{new Date(this.state.dataDate).toLocaleDateString()}</span> }
                </div>
                <div className="col s1" style={{ width: '4%', textAlign: 'center', fontSize: 'small',}}><button
                    className={this.classS}
                    id={this.props.device._id}
                    onClick={this.handleSave}>
                    <i className="material-icons">save</i>
                </button>
                </div>
                <div className="col s2" style={{ width: '28%', textAlign: 'center'}}><PrintBar data={this.state.dataGraph} /></div>
                <div className="col s1" style={{ width: '4%', textAlign: 'center'}}>
                    <button
                        className="waves-effect waves-gray btn-flat"
                        id={this.props.device._id}
                        onClick={this.handleDelButton.bind(this, this.props.device._id)}>
                        <i className="material-icons">delete</i>
                    </button>
                </div> */}
            </div>

        )
    }
