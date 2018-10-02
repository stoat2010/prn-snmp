import React, { Component } from 'react';
import domtoimage from 'dom-to-image';
import FileSaver from 'file-saver';
//import { FadeLoader } from 'react-spinners';

import PrintBar from './Bar';
import { SvgDevOn, SvgDevOff, SvgBtnRefresh, SvgBtnSave, SvgDevShot, SvgBtnDel, SvgExpLess, SvgExpMore, SvgChart, SvgBtnEdit, SvgFlag } from './Svg';

export default class DevCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            classes: 0,
            devData: {},
            dataGraph: [],
            content: false,
            loadCard: true,
            reportStatus: this.props.device.inreport,
            curPrintouts: 0,
            devToner: {}
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

    getInitialState() {
        return { secondsElapsed: 0 }
    }

    tick() {
        this.setState({ secondsElapsed: this.state.secondsElapsed + 1 })
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

        fetch("http://192.168.1.102:3333/api/datagraph/" + this.props.device.name, options)
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

        fetch("http://192.168.1.102:3333/api/datacurrent/" + this.props.device.name, options)
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
            .then(devToner => { this.setState({ devToner }) }

            );
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
            this.readGraphData();
            this.readCurData();
        });
    }

    saveImage(id, name) {

        domtoimage.toBlob(document.getElementById(id)).then(function (blob) { FileSaver.saveAs(blob, name + '_card.png'); });
    }

    changeView() {
        const newContentState = !this.state.content;
        this.setState(
            {
                content: newContentState,
            });
        this.handleToner(this.props.device.name);
    }

    handleReport(event) {

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
            this.setState({ reportStatus: submitted.state })
        });

    }

    devInfo() {
        this.readStatus();
        this.readData();
        this.readCurData();
    }

    cl = () => this.state.classes === 0 ? <SvgDevOff fill="#d81b60" />
        : <SvgDevOn fill="green" />;

    flag = () => {
        if (this.state.devToner.cyan) {
            if (+this.state.devToner.black[2] === 0 ||
                +this.state.devToner.cyan[2] === 0 ||
                +this.state.devToner.magenta[2] === 0 ||
                +this.state.devToner.yellow[2] === 0) {
                return <SvgFlag fill="#d32f2f" />
            } else if (+this.state.devToner.black[2] / +this.state.devToner.black[1] * 100 < 6 ||
                +this.state.devToner.cyan[2] / +this.state.devToner.cyan[1] * 100 < 6 ||
                +this.state.devToner.magenta[2] / +this.state.devToner.magenta[1] * 100 < 6 ||
                +this.state.devToner.yellow[2] / +this.state.devToner.yellow[1] * 100 < 6) {
                return <SvgFlag fill="#ff9100" />
            } else if (+this.state.devToner.black[2] / +this.state.devToner.black[1] * 100 < 11 ||
                +this.state.devToner.cyan[2] / +this.state.devToner.cyan[1] * 100 < 11 ||
                +this.state.devToner.magenta[2] / +this.state.devToner.magenta[1] * 100 < 11 ||
                +this.state.devToner.yellow[2] / +this.state.devToner.yellow[1] * 100 < 11) {
                return <SvgFlag fill="#ffeb3b" />
            }
            return <div></div>
        } else if (this.state.devToner.black) {
            if (+this.state.devToner.black[2] < 1) {
                return <SvgFlag fill="#d32f2f" />
            } else if (+this.state.devToner.black[2] / +this.state.devToner.black[1] * 100 < 6) {
                return <SvgFlag fill="#ff9100" />
            } else if (+this.state.devToner.black[2] / +this.state.devToner.black[1] * 100 < 11) {
                return <SvgFlag fill="#ffeb3b" />
            }
            return <div></div>
        }
        return <div></div>
    }
//Переключатели для разных видов отпечатков
    /* typeRadio = () => this.props.device.type === 1 ? this.props.device.vendor === "Hewlett-Packard" ?
        <table><tbody>
            <tr>
                <td>
                    <label>
                        <input name="group1" type="radio" name="type" value="0" defaultChecked />
                        <span style={{ fontSize: 'x-small' }}>Всего</span>
                    </label>
                </td>
                <td>
                    <label>
                        <input name="group1" type="radio" name="type" value="1" />
                        <span style={{ fontSize: 'x-small' }}>Монохром</span>
                    </label>
                </td>
                <td>
                    <label>
                        <input name="group1" type="radio" name="type" value="2" />
                        <span style={{ fontSize: 'x-small' }}>Цветные</span>
                    </label>
                </td>
            </tr></tbody></table> : <div></div> : <div></div> */

    cont = () => !this.state.content ?
        <div className="card-content" style={{ fontSize: 'x-small' }}>
            цех/отдел: <b>{this.props.device.unit}</b><br />
            корпус: <b>{this.props.device.build}</b><span>&nbsp;</span>
            кабинет: <b>{this.props.device.office}</b><br />
            принято: <b>{new Date(this.props.device.start_date).toLocaleDateString()}</b><br />
            начальный остаток: <b>{this.props.device.balance}</b><span>&nbsp;</span>
            отпечатков: <span className="green-text"><b>{this.state.devData[0]}</b></span>
            <i className="right" onClick={this.changeView}><SvgExpMore /></i>
        </div> : <div><div className="card-content" style={{ fontSize: 'x-small' }}>
            цех/отдел: <b>{this.props.device.unit}</b><br />
            корпус: <b>{this.props.device.build}</b><span>&nbsp;</span>
            кабинет: <b>{this.props.device.office}</b><br />
            принято: <b>{new Date(this.props.device.start_date).toLocaleDateString()}</b><br />
            начальный остаток: <b>{this.props.device.balance}</b><span>&nbsp;</span>
            отпечатков: <span className="green-text"><b>{this.state.devData[0]}</b></span>
            <i className="right" onClick={this.changeView}><SvgExpLess /></i>
        </div>
            <div className="card-content">
                Модель: <b>{this.props.device.model}</b><br />
                Вендор: <b>{this.props.device.vendor}</b><br />
                S/N: <b>{this.props.device.serial}</b><br />

            </div>
            <div className="card-content" style={{ fontSize: 'x-small' }}>
                <div className="card-title" style={{ fontSize: 'small' }}><b>% заполнения картриджей</b></div>
                {this.state.devToner.cyan ?
                    <svg width='360px' height='80px'>
                        <rect width="360" height="17" x="0" y="0" rx="3" ry="3" style={{ border: '1px solid #000000', fill: '#757575' }} />
                        <rect width={+this.state.devToner.black[2] / +this.state.devToner.black[1] * 360} height="15" x="1" y="1" rx="3" ry="3" style={{ border: '1px solid #000000', fill: '#000000' }} />
                        <rect width="360" height="17" x="0" y="20" rx="3" ry="3" style={{ border: '1px solid #000000', fill: '#757575' }} />
                        <rect width={+this.state.devToner.cyan[2] / +this.state.devToner.cyan[1] * 360} height="15" x="1" y="21" rx="3" ry="3" style={{ border: '1px solid #000000', fill: '#1565c0' }} />
                        <rect width="360" height="17" x="0" y="40" rx="3" ry="3" style={{ border: '1px solid #000000', fill: '#757575' }} />
                        <rect width={+this.state.devToner.magenta[2] / +this.state.devToner.magenta[1] * 360} height="15" x="1" y="41" rx="3" ry="3" style={{ border: '1px solid #000000', fill: '#d81b60' }} />
                        <rect width="360" height="17" x="0" y="60" rx="3" ry="3" style={{ border: '1px solid #000000', fill: '#757575' }} />
                        <rect width={+this.state.devToner.yellow[2] / +this.state.devToner.yellow[1] * 360} height="15" x="1" y="61" rx="3" ry="3" style={{ border: '1px solid #000000', fill: '#f9a825' }} />

                        <text x="170" y="13" fill="white" fontSize="13">{Math.round(+this.state.devToner.black[2] / +this.state.devToner.black[1] * 100)}%</text>
                        <text x="170" y="33" fill="white" fontSize="13">{Math.round(+this.state.devToner.cyan[2] / +this.state.devToner.cyan[1] * 100)}%</text>
                        <text x="170" y="53" fill="white" fontSize="13">{Math.round(+this.state.devToner.magenta[2] / +this.state.devToner.magenta[1] * 100)}%</text>
                        <text x="170" y="73" fill="white" fontSize="13">{Math.round(+this.state.devToner.yellow[2] / +this.state.devToner.yellow[1] * 100)}%</text>

                    </svg> : this.state.devToner.black ?
                        <svg width='360px' height='20px'>
                            <rect width="360" height="17" x="0" y="0" rx="3" ry="3" style={{ border: '1px solid #000000', fill: '#9e9e9e' }} />
                            <rect width={+this.state.devToner.black[2] / +this.state.devToner.black[1] * 360} height="15" x="1" y="1" rx="3" ry="3" style={{ border: '1px solid #000000', fill: '#000000' }} />
                            <text x="170" y="13" fill="white" fontSize="13">{Math.round(+this.state.devToner.black[2] / +this.state.devToner.black[1] * 100)}%</text>
                        </svg> : <svg width='360px' height='20px'><rect width="360" height="17" x="0" y="0" rx="3" ry="3" style={{ border: '1px solid #000000', fill: '#9e9e9e' }} />
                            <text x="140" y="13" fill="white" fontSize="13">Нет данных</text></svg>}
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
        this.handleToner(this.props.device.name)
        this.interval = setInterval(this.devInfo, 900000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        this.state.classes === 0 ? this.classS = "disabled btn-flat " + this.cardColor : this.classS = "btn-flat waves-effect waves-gray " + this.cardColor;
        this.state.classes === 0 ? this.btnDisable = "#bdbdbd" : this.btnDisable = "#424242";
        this.state.classes === 0 ? this.cardColor = "#eeeeee" : this.cardColor = "white"
        this.state.classes === 0 ? this.borderColor = "#eeeeee" : this.state.devData[0] == this.state.curPrintouts ? this.borderColor = "white" : this.borderColor = "#ffab91";

        return (

            <div id={this.props.device._id} className="col s3">
                <div className="card hoverable" style={{ borderStyle: 'solid', borderColor: this.borderColor, backgroundColor: this.cardColor }}>
                    <div className="card-title" style={{ fontSize: 'small' }}>
                        <a href={"http://" + this.props.device.device} target="blank" className="indigo-text"><b>{this.props.device.name.toUpperCase()}</b></a>
                        <div style={{ position: "absolute", right: "35px", top: "5px" }}>{this.flag()}</div>
                        <div style={{ position: "absolute", right: "5px", top: "5px" }}>{this.cl()}</div>
                    </div>
                    {this.cont()}
                    <div className="card-action" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <button
                                className="btn-flat waves-effect waves-gray"
                                style={{ display: 'flex', backgroundColor: this.cardColor }}
                                id={this.props.device._id}
                                onClick={this.devInfo}>
                                <SvgBtnRefresh />
                            </button>
                            <button
                                className="btn-flat waves-effect waves-gray"
                                style={{ display: 'flex', backgroundColor: this.cardColor }}
                                id={this.props.device._id}>
                                <SvgBtnEdit />
                            </button>
                            <button
                                className={this.classS}
                                style={{ display: 'flex', backgroundColor: this.cardColor }}
                                id={this.props.device._id}
                                onClick={this.handleSave} >
                                <SvgBtnSave fill={this.btnDisable} />
                            </button>
                            <button
                                id={this.props.device._id}
                                className="btn-flat waves-effect waves-gray"
                                style={{ display: 'flex', backgroundColor: this.cardColor }}
                                onClick={this.saveImage.bind(this, this.props.device._id, this.props.device.name)}>
                                <SvgDevShot />
                            </button>
                            <button
                                id={this.props.device._id}
                                className="btn-flat waves-effect waves-gray"
                                style={{ display: 'flex', backgroundColor: this.cardColor }}
                                onClick={this.handleReport} >
                                {this.rep()}
                            </button>
                        </div>
                        <button
                            className="waves-effect waves-gray btn-flat right"
                            id={this.props.device._id}
                            style={{ display: 'flex', backgroundColor: this.cardColor }}
                        /* onClick={this.handleDelButton.bind(this, this.props.device._id)} */>
                            <SvgBtnDel />
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}