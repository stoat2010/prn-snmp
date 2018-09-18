import React, { Component } from 'react';
import domtoimage from 'dom-to-image';
import FileSaver from 'file-saver';

import PrintBar from './Bar';
import {SvgDevOn, SvgDevOff, SvgBtnRefresh, SvgBtnSave, SvgDevShot, SvgBtnDel, SvgExpLess, SvgExpMore, SvgChart, SvgBtnEdit} from './Svg';

export default class DevCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            classes: 1,
            devData: {},
            dataGraph: [],
            content: false,
            reportStatus: this.props.device.inreport,
            curPrintouts: 0,
            devToner: {
                arrData:[]
            }
        };
        this.readStatus = this.readStatus.bind(this);
        this.readData = this.readData.bind(this);
        this.readCurData = this.readCurData.bind(this);
        this.devInfo = this.devInfo.bind(this);
        this.changeView = this.changeView.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleReport = this.handleReport.bind(this);

        this.classS = "material-icons right disabled";
    }

    getInitialState(){
        return {secondsElapsed: 0}
    }

    tick(){
        this.setState({secondsElapsed: this.state.secondsElapsed +1})
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

    readCurData() {
        var options = {
            method: 'GET',
            mode: 'cors',
            cache: 'default'
        };

        fetch("http://192.168.1.102:3333/api/datacurrent/" + this.props.device.device, options)
            .then((res => {
                return res.json();
            }))
            .then(curPrintouts => { this.setState({ curPrintouts }); });
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
            this.readCurData();
        });
    }

    saveImage(id, name){

        domtoimage.toBlob(document.getElementById(id)).then(function(blob) {FileSaver.saveAs(blob, name+'_card.png');});
    }

    changeView() {
        const newContentState = !this.state.content;
        this.setState(
            {
                content: newContentState,
            });
        this.handleToner(this.props.device.name);
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

    devInfo() {
        this.readStatus();
        this.readData();
        this.readCurData();
    }

    cl = () => this.state.classes === 1 ? <SvgDevOff fill="#d81b60" /> 
    : <SvgDevOn fill="green" />;
    cont = () => !this.state.content ?
        <div className="card-content" style={{ fontSize: 'x-small' }}>
            цех/отдел: <b>{this.props.device.unit}</b><br />
            корпус: <b>{this.props.device.build}</b><span>&nbsp;</span>
            кабинет: <b>{this.props.device.office}</b><br />
            принято: <b>{new Date(this.props.device.start_date).toLocaleDateString()}</b><br />
            начальный остаток: <b>{this.props.device.balance}</b><span>&nbsp;</span>
            отпечатков: <span className="green-text"><b>{this.state.devData[3]}</b></span>
            <i className="right" onClick={this.changeView}><SvgExpMore /></i>
        </div> : <div><div className="card-content" style={{ fontSize: 'x-small' }}>
            цех/отдел: <b>{this.props.device.unit}</b><br />
            корпус: <b>{this.props.device.build}</b><span>&nbsp;</span>
            кабинет: <b>{this.props.device.office}</b><br />
            принято: <b>{new Date(this.props.device.start_date).toLocaleDateString()}</b><br />
            начальный остаток: <b>{this.props.device.balance}</b><span>&nbsp;</span>
            отпечатков: <span className="green-text"><b>{this.state.devData[3]}</b></span>
            <i className="right" onClick={this.changeView}><SvgExpLess /></i>
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
                    <svg width='360px' height='20px'>
                        <rect width="360" height="17" x="0" y="0" rx="3" ry="3" style={{border: '1px solid #000000', fill: '#9e9e9e'}}/>
                        <rect width={+this.state.devToner.arrData[2] / +this.state.devToner.arrData[1] *360} height="15" x="1" y="1"  rx="3" ry="3" style={{border: '1px solid #000000', fill: '#000000'}}/>
                        <text x="170" y="13" fill="white" fontSize="13">{Math.round(+this.state.devToner.arrData[2] / +this.state.devToner.arrData[1] *100)}%</text>
                    </svg> : <svg width='360px' height='20px'><rect width="360" height="17" x="0" y="0" rx="3" ry="3" style={{border: '1px solid #000000', fill: '#9e9e9e'}}/>
                        <text x="140" y="13" fill="white" fontSize="13">Нет данных</text></svg> }
            </div>
            <div className="card-content">
                <PrintBar data={this.state.dataGraph} height={170} />
            </div>
            </div>

    rep = () => this.state.reportStatus === false ? <SvgChart fill="#d32f2f" /> : <SvgChart fill="green" />;

    componentDidMount() {
        this.readStatus();
        this.readData();
        this.readGraphData();
        this.readCurData();
        this.interval = setInterval(this.devInfo, 900000);
    }

    componentWillUnmount(){
        clearInterval(this.interval);
    }

    render() {
        this.state.classes === 1 ? this.classS = "disabled btn-flat " + this.cardColor : this.classS = "btn-flat waves-effect waves-gray " + this.cardColor;
        this.state.classes === 1 ? this.btnDisable = "#bdbdbd" : this.btnDisable = "#424242";
        this.state.classes === 1 ? this.cardColor = "#eeeeee" : this.cardColor = "white"
        this.state.devData[3] == this.state.curPrintouts ? this.borderColor = "white" : this.borderColor = "#ffab91";

        return (

            <div className="z-depth-5" id={this.props.device._id} className="col s3">
                <div className="card hoverable" style={{borderStyle: 'solid', borderColor: this.borderColor, backgroundColor: this.cardColor}}>
                    <div className="card-title" style={{ fontSize: 'small' }}>
                        {this.props.device.name}
                        <div style={{ position: "absolute", right: "5px", top: "5px" }}>{this.cl()}</div>
                    </div>
                    {this.cont()}
                    <div className="card-action" style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                        <button
                            className="btn-flat waves-effect waves-gray"
                            style={{display: 'flex', backgroundColor: this.cardColor}}
                            id={this.props.device._id}
                            onClick={this.devInfo}>
                            <SvgBtnRefresh />
                        </button>
                        <button
                            className="btn-flat waves-effect waves-gray"
                            style={{display: 'flex', backgroundColor: this.cardColor}}
                            id={this.props.device._id}>
                            <SvgBtnEdit />
                        </button>
                        <button
                            className={this.classS}
                            style={{display: 'flex', backgroundColor: this.cardColor}}
                            id={this.props.device._id}
                            onClick={this.handleSave} >
                            <SvgBtnSave fill={this.btnDisable}/>
                        </button>
                       <button
                            id={this.props.device._id}
                            className="btn-flat waves-effect waves-gray"
                            style={{display: 'flex', backgroundColor: this.cardColor}}
                            onClick={this.saveImage.bind(this, this.props.device._id, this.props.device.name)}>
                            <SvgDevShot />
                        </button>
                        <button
                            id={this.props.device._id}
                            className="btn-flat waves-effect waves-gray"
                            style={{display: 'flex', backgroundColor: this.cardColor}}
                            onClick={this.handleReport} >
                            {this.rep()}
                        </button>
                        </div>
                        <button
                            className="waves-effect waves-gray btn-flat right"
                            id={this.props.device._id}
                            style={{display: 'flex', backgroundColor: this.cardColor}}
                        /* onClick={this.handleDelButton.bind(this, this.props.device._id)} */>
                            <SvgBtnDel />
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}