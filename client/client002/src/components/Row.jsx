import React, {Component} from 'react';
import styles from './Styles.css.js';
//import {Bar} from 'react-chartjs-2';

import PrintBar from './Bar';

export default class Row extends Component {

    constructor(props){
        super(props);
        this.state = {
            classes: 1,
            devData: {},
            dataAllow: 0,
            dataGraph: []
        };
        this.classN = "btn-floating btn-small waves-effect waves-light yellow lighten-3";
        this.classS = "disabled btn-flat white";
        this.classG = "btn-floating btn-small waves-effect waves-light blue darken-3";
        this.readStatus = this.readStatus.bind(this);
        this.readData = this.readData.bind(this);
        this.devInfo = this.devInfo.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.readMonthData = this.readMonthData.bind(this);
        this.readGraphData = this.readGraphData.bind(this);

        this.graphData= {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
            datasets:[
                /* {
                    label: "",
                    type: "line",
                    data: [470, 470, 470, 470, 470, 470, 470, 470, 470, 470, 470, 470],
                    borderColor: "#ad1457",
                    fill: false,
                    borderWidth: 0.5,
                    radius: 0
                }, */
                {
                    label: "",
                    data: [530, 600, 550, 500, 590, 560, 505, 180, 490, 540, 580, 300],
                    //data: this.state.dataGraph,
                    backgroundColor: "#efebe9",
                    borderColor: "#bcaaa4",
                    borderWidth: 1
            }]
        };
        this.graphOptions= {
            maintainAspectRatio: false,
            responsive: true,
            legend: {
                display: false
            },
            scales: {
                xAxes: [{
                    gridLines: {
                        offsetGridLines: true
                    },
                    barPercentage: 0.8
                }]
            },
            tooltips: {
                backgroundColor: "#9e9e9e"
            }
        };
    }

    readStatus() {
        var options = {
            method: 'GET',
            mode: 'cors',
            cache: 'default'
        };
        fetch("http://127.0.0.1:3333/devstatus/" + this.props.device.device, options)
        .then((res => {
            return res.json();
        }))
        .then(classes => {this.setState({ classes });});
    }

    readData() {
        var options = {
            method: 'GET',
            mode: 'cors',
            cache: 'default'
        };

        fetch("http://127.0.0.1:3333/devdata/" + this.props.device.device, options)
        .then((res => {
            return res.json();
        }))
        .then(devData => {this.setState({ devData });});
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
        .then(dataAllow => {this.setState({ dataAllow });});
    }

    readGraphData(){
        var options = {
            method: 'GET',
            mode: 'cors',
            cache: 'default'
        };

        fetch("http://127.0.0.1:3333/api/datagraph/" + this.props.device.device, options)
        .then((res => {
            return res.json();
        }))
        .then(dataGraph => {this.setState({ dataGraph });});
    }

    devInfo() {
        this.readStatus();
        this.readData();
        this.readMonthData();
        this.readGraphData();
    }

    handleDelButton(i, e) {
        e.preventDefault();

        fetch('http://127.0.0.1:3333/api/devices/' + i, { method: 'delete', mode: 'cors' })
            .then(res => {
                this.props.dbConn('http://127.0.0.1:3333/api/devices');
            });
    }

    handleSave(event){
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
        });
    }

    cl = () => this.state.dataAllow === 0 ? <i className="material-icons red-text">block</i> : <i className="material-icons green-text">check_circle</i>;

    componentDidMount(){
        this.devInfo();
    }

    render() {

        this.state.classes === 1 ? this.classN = "btn-floating btn-small waves-effect waves-light red lighten-3" : this.classN = "btn-floating btn-small waves-effect waves-light teal lighten-3";
        this.state.classes === 1 ? this.classS = "disabled btn-flat" : this.classS = "btn-flat";
        //this.state.dataAllow === 1 ? this.classG = "disabled btn-flat white" : this.classG = "btn-flat white";
        return (
            <tr>
                <td><button className={this.classN} onClick={this.devInfo}><i className="material-icons">refresh</i></button></td>
                <td style={styles.cell}>{this.props.device.device}</td>
                <td style={styles.cellcap}>
                    отдел: <b>{this.props.device.unit}</b><br />
                    корпус: <b>{this.props.device.build}</b><br />
                    кабинет: <b>{this.props.device.office}</b><br />
                </td>
                <td style={styles.cell}>{this.state.devData[0]}</td>
                <td style={styles.cell}>{this.state.devData[1]}</td>
                <td style={styles.cell}>{this.state.devData[2]}</td>
                <td style={styles.cell}>{this.state.devData[3]}</td>
                <td 
                    style={styles.cell}>
                        {this.cl()}
                </td>
                <td 
                    style={styles.cell}>
                        <button
                            className={this.classS}
                            id={this.props.device._id}
                            onClick={this.handleSave}>
                            <i className="material-icons">save</i>
                        </button>
                </td>
                <td style={styles.cellgraph}><PrintBar data={this.state.dataGraph}/></td>
                <td>
                    <button
                        className="waves-effect waves-gray btn-flat"
                        id={this.props.device._id}
                        onClick={this.handleDelButton.bind(this, this.props.device._id)}>
                        <i className="material-icons">delete</i>
                    </button>
                </td>
            </tr>
        )
    }
}