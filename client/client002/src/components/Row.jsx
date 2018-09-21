import React, { Component } from 'react';
import swal from 'sweetalert2';
import {SvgDevOn, SvgDevOff, SvgBtnRefresh, SvgBtnSave, SvgBtnDel, SvgBtnPrint} from './Svg';

import PrintBar from './Bar';

export default class Row extends Component {

    constructor(props) {
        super(props);
        this.state = {
            classes: 0,
            devData: {},
            dataAllow: 0,
            dataGraph: [],
            dataDate: '',
            reportStatus: this.props.device.inreport
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
        this.handleReport = this.handleReport.bind(this);
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

    readMonthData() {
        var options = {
            method: 'GET',
            mode: 'cors',
            cache: 'default'
        };

        fetch("http://192.168.1.102:3333/api/data/" + this.props.device.device, options)
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

        fetch("http://192.168.1.102:3333/api/datagraph/" + this.props.device.device, options)
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

        fetch("http://192.168.1.102:3333/api/datadate/" + this.props.device.device, options)
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

        swal({title: "Вы уверены?",
            text: "Устройство и данные опроса будут удалены из базы данных",
            icon: "warning",
            showCancelButton: true,
            dangerMode: true
        }).then((willDelete) => {
            if (willDelete.value) {
                fetch('http://192.168.1.102:3333/api/devices/' + i, { method: 'delete', mode: 'cors' })
                .then(res => {
                this.props.dbConn('http://192.168.1.102:3333/api/devices');
            });
                swal("Удалено", {icon: "success",})
            }else if (willDelete.dismiss === swal.DismissReason.cancel){
                swal("Отменено")
            }
        })
    }

    handleSave(event) {
        event.preventDefault();

        var submitted = {
            device: this.props.device.device,
            device_name: this.props.device.name,
            device_serial: this.props.device.serial,
            date: new Date(),
            printouts: this.state.devData[0]
        };

        fetch('http://192.168.1.102:3333/api/data', {
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

    handleReport(event){

        event.preventDefault();

        var submitted = {
            state: !this.state.reportStatus
        };

        fetch('http://192.168.1.102:3333/api/devices/' + this.props.device.device, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(submitted)
        }).then(res => {
            this.setState({reportStatus: submitted.state})
        });

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
            .then(devToner => devToner.length === 3 ?
                swal({"text": devToner[0] +": " + Math.round(100 * +devToner[2] / +devToner[1]) + "%"}) :
                swal({"html": "Черный: " + devToner[0] +": " + 100 * +devToner[2] / +devToner[1] + "%<br>" +
                                "Синий: " + devToner[3] +": " + 100 * +devToner[5] / +devToner[4] + "%<br>" +
                                "Красный: " + devToner[6] +": " + 100 * +devToner[8] / +devToner[7] + "%<br>" +
                                "Желтый:" + devToner[9] +": " + 100 * +devToner[11] / +devToner[10] + "%"})
                );

    }

    cl = () => this.state.dataAllow === 0 ? <SvgDevOff fill="red" /> : <SvgDevOn fill="green" />;
    rep = () => this.state.reportStatus === false ? <span className="red-text"><b>Нет</b></span> : <span className="green-text"><b>Да</b></span>;

    componentDidMount() {
        this.devInfo();
    }

    render() {

        this.state.classes === 0 ? this.classN = "btn-floating btn-small waves-effect waves-light red lighten-3" : this.classN = "btn-floating btn-small waves-effect waves-light green darken-4";
        this.state.classes === 0 ? this.classS = "disabled btn-flat white" : this.classS = "btn-flat waves-effect waves-grey white";
        this.state.classes === 0 ? this.btnDisable = "#bdbdbd" : this.btnDisable = "#424242";
        //this.state.dataAllow === 1 ? this.classS = "disabled btn-flat" : this.classS = "btn-flat";
        this.props.device.serial ? this.classIP = "black-text" : this.classIP = "pink-text";
        new Date(this.state.dataDate).toLocaleDateString() === new Date().toLocaleDateString() ? this.classDate = "green-text": this.classDate = 'orange-text';

        return (
            <div className="row col s12">
                <div className="col s1" style={{width: '3%', textAlign: 'center', paddingTop: '0.5%'}}><button className={this.classN} onClick={this.devInfo} style={{display: 'flex', justifyContent: 'center'}}><SvgBtnRefresh fill="white" /></button></div>
                
                <div className="col s1 brown-text" style={{ width: '15%', textAlign: 'left', fontSize: 'x-small' }}>
                    цех/отдел: <b>{this.props.device.unit}</b><br />
                    корпус: <b>{this.props.device.build}</b><span>&nbsp;</span>
                    кабинет: <b>{this.props.device.office}</b><br />
                    принято: <b>{new Date(this.props.device.start_date).toLocaleDateString() }</b><span>&nbsp;</span>
                    остаток: <b>{this.props.device.balance}</b>
                </div>
                <div className="col s1" style={{ width: '11%', textAlign: 'center'}}>
                    <span style={{color: "#1b5e20", fontSize: 'x-small', textTransform: 'lowercase'}}><b>{this.props.device.name}</b></span><br />
                    <span style={{color: "#2962ff", fontSize: 'small'}}><a href={"http://"+this.props.device.device} target="blank"><b>{this.props.device.device}</b></a></span>
                </div>
                <div className="col s1 indigo-text" style={{ width: '11%', textAlign: 'center', fontSize: 'x-small', paddingTop: '0.25%' }}>
                    {this.props.device.model}<br/>
                    {this.props.device.vendor}
                </div>
                <div className="col s1 indigo-text" style={{ width: '6%', textAlign: 'center', fontSize: 'x-small', paddingTop: '0.6%' }}>{this.props.device.serial}</div>
                <div className="col s1" style={{ width: '6%', textAlign: 'center', fontSize: 'small', paddingTop: '0.5%' }}>{this.state.devData[0]}</div>
                <div className="col s1" style={{ width: '5%', textAlign: 'center', fontSize: 'small'}}>
                    {this.cl()}<br />
                        {this.state.dataDate === '' ? <span style={{fontSize: 'xx-small'}}></span> : <span className={this.classDate} style={{fontSize: 'xx-small'}}>{new Date(this.state.dataDate).toLocaleDateString()}</span> }
                </div>
                <div className="col s1" style={{ width: '6%', textAlign: 'center', fontSize: 'small',}}>
                <button
                    className={this.classS}
                    id={this.props.device._id}
                    style={{display: 'flex', justifyContent: 'center'}}
                    onClick={this.handleSave}>
                    <SvgBtnSave fill={this.btnDisable} />
                </button>
                </div>
                <div className="col s1" style={{ width: '6%', textAlign: 'center', fontSize: 'small',}}>
                <button
                    className="btn-flat white"
                    id={this.props.device._id}
                    onClick={this.handleReport}>
                    {this.rep()}
                </button>
                </div>
                <div className="col s1" style={{ width: '3%', textAlign: 'center'}}>
                    <button
                        className={this.classS}
                        id={this.props.device._id}
                        onClick={this.handleToner.bind(this, this.props.device.name)}>
                        <SvgBtnPrint fill={this.btnDisable} />
                    </button>
                </div>
                <div className="col s1" style={{ width: '25%', textAlign: 'center'}}><PrintBar data={this.state.dataGraph} height={70} /></div>
                <div className="col s1" style={{ width: '3%', textAlign: 'center'}}>
                    <button
                        className="waves-effect waves-gray btn-flat"
                        style={{display: 'flex', justifyContent: 'center'}}
                        id={this.props.device._id}
                        onClick={this.handleDelButton.bind(this, this.props.device._id)}>
                        <SvgBtnDel />
                    </button>
                </div>
            </div>
        )
    }
}