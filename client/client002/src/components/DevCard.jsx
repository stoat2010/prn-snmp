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
            content: false
        };
        this.readStatus = this.readStatus.bind(this);
        this.readData = this.readData.bind(this);
        this.devInfo = this.devInfo.bind(this);
        this.changeView = this.changeView.bind(this);

        this.classS = "btn-flat white";
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

    handleToner(dev, e) {
        e.preventDefault();
        var options = {
            method: 'GET',
            mode: 'cors',
            cache: 'default'
        };

        fetch("http://192.168.1.102:3333/devtoner/" + dev, options)
            .then((res => {
                return res.json();
            }))
            .then(devToner => devToner.arrData.length === 3 ?
                swal({ "text": devToner.arrData[0] + ": " + Math.round(100 * +devToner.arrData[2] / +devToner.arrData[1]) + "%" }) :
                swal({
                    "html": "Черный: " + devToner.arrData[0] + ": " + 100 * +devToner.arrData[2] / +devToner.arrData[1] + "%<br>" +
                        "Синий: " + devToner.arrData[3] + ": " + 100 * +devToner.arrData[5] / +devToner.arrData[4] + "%<br>" +
                        "Красный: " + devToner.arrData[6] + ": " + 100 * +devToner.arrData[8] / +devToner.arrData[7] + "%<br>" +
                        "Желтый:" + devToner.arrData[9] + ": " + 100 * +devToner.arrData[11] / +devToner.arrData[10] + "%"
                })
            );

    }

    changeView() {
        const newContentState = !this.state.content;
        this.setState(
            {
                content: newContentState,
            });

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
            принято: <b>{new Date(this.props.device.start_date).toLocaleDateString()}</b><span>&nbsp;</span>
            начальный остаток: <b>{this.props.device.balance}</b>
            <i className="material-icons activator" style={{ position: "absolute", right: "5px" }}>more_vert</i>
        </div> : <div><div className="card-content" style={{ fontSize: 'x-small' }}>
            цех/отдел: <b>{this.props.device.unit}</b><br />
            корпус: <b>{this.props.device.build}</b><span>&nbsp;</span>
            кабинет: <b>{this.props.device.office}</b><br />
            принято: <b>{new Date(this.props.device.start_date).toLocaleDateString()}</b><span>&nbsp;</span>
            начальный остаток: <b>{this.props.device.balance}</b>
            <i className="material-icons activator" style={{ position: "absolute", right: "5px" }}>more_vert</i>
        </div><div className="card-content" style={{ fontSize: 'x-small' }}>
            <PrintBar data={this.state.dataGraph} height={180} />
        </div></div>

    componentDidMount() {
        this.readStatus();
        this.readData();
        this.readGraphData();
    }

    render() {
        this.state.classes === 1 ? this.classS = "disabled btn-flat white" : this.classS = "btn-flat waves-effect waves-grey";

        return (

            <div className="col s3">
                <div className="card sticky-action">
                    <div className="card-title" style={{ fontSize: 'small' }}>
                        {this.props.device.name}
                        <div style={{ position: "absolute", right: "5px", top: "5px" }}>{this.cl()}</div>
                    </div>
                    {this.cont()}
                    <div className="card-reveal">
                        <span className="card-title"><i className="material-icons right">close</i></span>
                        Модель: <b>{this.state.devData[0]}</b><br />
                        Вендор: <b>{this.state.devData[1]}</b><br />
                        S/N: <b>{this.state.devData[2]}</b><br />
                        Отпечатков: <b>{this.state.devData[3]}</b>
                    </div>
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
                    /* onClick={this.handleSave} */>
                            <i className="material-icons">save</i>
                        </button>
                        <button
                            className={this.classS}
                            id={this.props.device._id}
                            onClick={this.handleToner.bind(this, this.props.device.name)}>
                            <i className="material-icons">print</i>
                        </button>
                        <button
                            className="waves-effect waves-gray btn-flat"
                            id={this.props.device._id}
                            onClick={this.changeView}>
                            <i className="material-icons">insert_chart</i>
                        </button>
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