import React, { Component } from 'react';
import swal from 'sweetalert2';

import PrintBar from './Bar';

export default class DevCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            classes: 1,
            devData: {},
            dataGraph: [],
            content: false,
            devToner: {
                arrData:[]
            }
        };
        this.readStatus = this.readStatus.bind(this);
        this.readData = this.readData.bind(this);
        this.devInfo = this.devInfo.bind(this);
        this.changeView = this.changeView.bind(this);
        this.handleSave = this.handleSave.bind(this);

        this.classS = "material-icons right disabled";
    }

    readStatus() {
        var options = {
            method: 'GET',
            mode: 'cors',
            cache: 'default'
        };
        fetch("http://192.168.1.102:3333/devstatus/" + this.props.device.name, options)
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

        fetch("http://192.168.1.102:3333/devdata/" + this.props.device.name, options)
            .then((res => {
                return res.json();
            }))
            .then(devData => { this.setState({ devData }); });
    }

    readGraphData() {
        var options = {
            method: 'GET',
            mode: 'cors',
            cache: 'default'
        };

        fetch("http://192.168.1.102:3333/api/datagraph/" + this.props.device.device, options)
            .then((res => {
                return res.json();
            }))
            .then(dataGraph => { this.setState({ dataGraph }); });
    }

    handleToner(dev) {

        var options = {
            method: 'GET',
            mode: 'cors',
            cache: 'default'
        };

        fetch("http://192.168.1.102:3333/devtoner/" + dev, options)
            .then((res => {
                return res.json();
            }))
            .then(devToner => devToner.arrData && this.setState({devToner})
            );
    }

    handleSave(event) {
        event.preventDefault();

        var submitted = {
            device: this.props.device.device,
            device_name: this.props.device.name,
            device_serial: this.props.device.serial,
            date: new Date(),
            printouts: this.state.devData[3]
        };

        fetch('http://192.168.1.102:3333/api/data', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(submitted)
        }).then(res => {
            this.readGraphData();
        });
    }

    changeView() {
        const newContentState = !this.state.content;
        this.setState(
            {
                content: newContentState,
            });
        this.handleToner(this.props.device.name);

    }

    devInfo() {
        this.readStatus();
        this.readData();
    }

    cl = () => this.state.classes === 1 ? <i className="material-icons red-text">block</i> : <i className="material-icons green-text">check_circle</i>;
    cont = () => !this.state.content ?
        <div className="card-content" style={{ fontSize: 'x-small' }}>
            цех/отдел: <b>{this.props.device.unit}</b><br />
            корпус: <b>{this.props.device.build}</b><span>&nbsp;</span>
            кабинет: <b>{this.props.device.office}</b><br />
            принято: <b>{new Date(this.props.device.start_date).toLocaleDateString()}</b><br />
            начальный остаток: <b>{this.props.device.balance}</b><span>&nbsp;</span>
            отпечатков: <span className="green-text"><b>{this.state.devData[3]}</b></span>
            <i className="material-icons right" onClick={this.changeView}>expand_more</i>
        </div> : <div><div className="card-content" style={{ fontSize: 'x-small' }}>
            цех/отдел: <b>{this.props.device.unit}</b><br />
            корпус: <b>{this.props.device.build}</b><span>&nbsp;</span>
            кабинет: <b>{this.props.device.office}</b><br />
            принято: <b>{new Date(this.props.device.start_date).toLocaleDateString()}</b><br />
            начальный остаток: <b>{this.props.device.balance}</b><span>&nbsp;</span>
            отпечатков: <span className="green-text"><b>{this.state.devData[3]}</b></span>
            <i className="material-icons right" onClick={this.changeView}>expand_less</i>
        </div>
            <div className="card-content">
                Модель: <b>{this.state.devData[0]}</b><br />
                Вендор: <b>{this.state.devData[1]}</b><br />
                S/N: <b>{this.state.devData[2]}</b><br />
                
            </div>
            <div className="card-content" style={{ fontSize: 'x-small' }}>
            <div className="card-title" style={{ fontSize: 'small' }}><b>% заполнения картриджей</b></div>
             {this.state.devToner.arrData.length > 3 ?
                <svg width='360px' height='80px'>
                    <rect width="360" height="17" x="0" y="0" rx="3" ry="3" style={{border: '1px solid #000000', fill: '#757575'}}/>
                    <rect width={+this.state.devToner.arrData[2] / +this.state.devToner.arrData[1] *360} height="15" x="1" y="1" rx="3" ry="3" style={{border: '1px solid #000000', fill: '#000000'}}/>
                    <rect width="360" height="17" x="0" y="20" rx="3" ry="3" style={{border: '1px solid #000000', fill: '#757575'}}/>
                    <rect width={+this.state.devToner.arrData[5] / +this.state.devToner.arrData[4] *360} height="15" x="1" y="21" rx="3" ry="3" style={{border: '1px solid #000000', fill: '#1565c0'}}/>
                    <rect width="360" height="17" x="0" y="40" rx="3" ry="3" style={{border: '1px solid #000000', fill: '#757575'}}/>
                    <rect width={+this.state.devToner.arrData[8] / +this.state.devToner.arrData[7] *360} height="15" x="1" y="41" rx="3" ry="3" style={{border: '1px solid #000000', fill: '#d81b60'}}/>
                    <rect width="360" height="17" x="0" y="60" rx="3" ry="3" style={{border: '1px solid #000000', fill: '#757575'}}/>
                    <rect width={+this.state.devToner.arrData[11] / +this.state.devToner.arrData[10] *360} height="15" x="1" y="61" rx="3" ry="3" style={{border: '1px solid #000000', fill: '#f9a825'}}/>

                    <text x="170" y="13" fill="white" fontSize="13">{Math.round(+this.state.devToner.arrData[2] / +this.state.devToner.arrData[1] *100)}%</text>
                    <text x="170" y="33" fill="white" fontSize="13">{Math.round(+this.state.devToner.arrData[5] / +this.state.devToner.arrData[4] *100)}%</text>
                    <text x="170" y="53" fill="white" fontSize="13">{Math.round(+this.state.devToner.arrData[8] / +this.state.devToner.arrData[7] *100)}%</text>
                    <text x="170" y="73" fill="white" fontSize="13">{Math.round(+this.state.devToner.arrData[11] / +this.state.devToner.arrData[10] *100)}%</text>

            </svg> : this.state.devToner.arrData.length > 0 ? 
                    <svg width='360px' height='80px'>
                        <rect width="360" height="17" x="0" y="0" rx="3" ry="3" style={{border: '1px solid #000000', fill: '#9e9e9e'}}/>
                        <rect width={+this.state.devToner.arrData[2] / +this.state.devToner.arrData[1] *360} height="15" x="1" y="1"  rx="3" ry="3" style={{border: '1px solid #000000', fill: '#000000'}}/>
                        <text x="170" y="13" fill="white" fontSize="13">{Math.round(+this.state.devToner.arrData[2] / +this.state.devToner.arrData[1] *100)}%</text>
                    </svg> : null}
            </div>
            <div className="card-content">
                <PrintBar data={this.state.dataGraph} height={170} />
            </div>
            </div>

    componentDidMount() {
        this.readStatus();
        this.readData();
        this.readGraphData();
    }

    render() {
        this.state.classes === 1 ? this.classS = "disabled btn-flat white" : this.classS = "btn-flat waves-effect waves-grey";

        return (

            <div className="col s3">
                <div className="card">
                    <div className="card-title" style={{ fontSize: 'small' }}>
                        {this.props.device.name}
                        <div style={{ position: "absolute", right: "5px", top: "5px" }}>{this.cl()}</div>
                    </div>
                    {this.cont()}
                    <div className="card-action">
                        <button
                            className="waves-effect waves-gray btn-flat"
                            id={this.props.device._id}
                            onClick={this.devInfo}>
                            <i className="material-icons">refresh</i>
                        </button>
                        <button
                            className={this.classS}
                            id={this.props.device._id}
                            onClick={this.handleSave} >
                            <i className="material-icons">save</i>
                        </button>
                       {/*  <button
                            className={this.classS}
                            id={this.props.device._id}
                            onClick={this.handleToner.bind(this, this.props.device.name)}>
                            <i className="material-icons">print</i>
                        </button> */}
                        <button
                            className="waves-effect waves-gray btn-flat right"
                            id={this.props.device._id}
                        /* onClick={this.handleDelButton.bind(this, this.props.device._id)} */>
                            <i className="material-icons">delete</i>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}