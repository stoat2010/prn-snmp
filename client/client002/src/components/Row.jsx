import React, { Component } from 'react';
import styles from './Styles.css.js';

import PrintBar from './Bar';

export default class Row extends Component {

    constructor(props) {
        super(props);
        this.state = {
            classes: 1,
            devData: {},
            dataAllow: 0,
            dataGraph: [],
            dataDate: ''
        };
        this.classN = "btn-floating btn-small waves-effect waves-light yellow lighten-3";
        this.classS = "btn-flat white";
        this.classG = "btn-floating btn-small waves-effect waves-light blue darken-3";
        this.classIP = "black-text";
        this.classDate = 'blackText';
        this.readStatus = this.readStatus.bind(this);
        this.readData = this.readData.bind(this);
        this.devInfo = this.devInfo.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.readMonthData = this.readMonthData.bind(this);
        this.readGraphData = this.readGraphData.bind(this);
        this.readDataDate = this.readDataDate.bind(this);
    }

    readStatus() {
        var options = {
            method: 'GET',
            mode: 'cors',
            cache: 'default'
        };
        fetch("http://127.0.0.1:3333/devstatus/" + this.props.device.name, options)
            .then((res => {
                return res.json();
            }))
            .then(classes => { this.setState({ classes }); });
    }

    readData() {
        var options = {
            method: 'GET',
            mode: 'cors',
            cache: 'default'
        };

        fetch("http://127.0.0.1:3333/devdata/" + this.props.device.name, options)
            .then((res => {
                return res.json();
            }))
            .then(devData => { this.setState({ devData }); });
    }

    readMonthData() {
        var options = {
            method: 'GET',
            mode: 'cors',
            cache: 'default'
        };

        fetch("http://127.0.0.1:3333/api/data/" + this.props.device.device, options)
            .then((res => {
                return res.json();
            }))
            .then(dataAllow => { this.setState({ dataAllow }); });
    }

    readGraphData() {
        var options = {
            method: 'GET',
            mode: 'cors',
            cache: 'default'
        };

        fetch("http://127.0.0.1:3333/api/datagraph/" + this.props.device.device, options)
            .then((res => {
                return res.json();
            }))
            .then(dataGraph => { this.setState({ dataGraph }); });
    }
//Дата опроса устройства
    readDataDate() {
        var options = {
            method: 'GET',
            mode: 'cors',
            cache: 'default'
        };

        fetch("http://127.0.0.1:3333/api/datadate/" + this.props.device.device, options)
            .then((res => {
                return res.json();
            }))
            .then(dataDate => { this.setState({ dataDate }); });
    }

    devInfo() {
        this.readStatus();
        this.readData();
        this.readMonthData();
        this.readGraphData();
        this.readDataDate();
    }

    handleDelButton(i, e) {
        e.preventDefault();

        fetch('http://127.0.0.1:3333/api/devices/' + i, { method: 'delete', mode: 'cors' })
            .then(res => {
                this.props.dbConn('http://127.0.0.1:3333/api/devices');
            });
    }

    handleSave(event) {
        event.preventDefault();

        var submitted = {
            device: this.props.device.device,
            date: new Date(),
            printouts: this.state.devData[3]
        };

        fetch('http://127.0.0.1:3333/api/data', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(submitted)
        }).then(res => {
            this.readMonthData();
            this.readGraphData();
            this.readDataDate();
        });
    }

    cl = () => this.state.dataAllow === 0 ? <i className="material-icons red-text">block</i> : <i className="material-icons green-text">check_circle</i>;

    componentDidMount() {
        this.devInfo();
    }

    render() {

        this.state.classes === 1 ? this.classN = "btn-floating btn-small waves-effect waves-light red lighten-3" : this.classN = "btn-floating btn-small waves-effect waves-light teal lighten-3";
        this.state.classes === 1 ? this.classS = "disabled btn-flat" : this.classS = "btn-flat";
        //this.state.dataAllow === 1 ? this.classS = "disabled btn-flat" : this.classS = "btn-flat";
        this.props.device.serial ? this.classIP = "black-text" : this.classIP = "pink-text";
        new Date(this.state.dataDate).toLocaleDateString() === new Date().toLocaleDateString() ? this.classDate = "green-text": this.classDate = 'orange-text';

        return (
            <div className="row col s12">
                <div className="col s1" style={{ width: '3%', textAlign: 'center', paddingTop: '0.5%'}}><button className={this.classN} onClick={this.devInfo}><i className="material-icons">refresh</i></button></div>
                
                <div className="col s1 brown-text" style={{ width: '15%', textAlign: 'left', fontSize: 'x-small' }}>
                    цех/отдел: <b>{this.props.device.unit}</b><br />
                    корпус: <b>{this.props.device.build}</b><span>&nbsp;</span>
                    кабинет: <b>{this.props.device.office}</b><br />
                    принято: <b>{new Date(this.props.device.start_date).toLocaleDateString() }</b><span>&nbsp;</span>
                    остаток: <b>{this.props.device.balance}</b>
                </div>
                <div className="col s1" style={{ width: '11%', textAlign: 'center'}}>
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
                </div>
            </div>

        )
    }
}