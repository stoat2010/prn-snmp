import React, { Component } from 'react';

import { SvgBtnClose, SvgBtnArrLeft } from './Svg';

import styles from './Styles.css.js';

export default class Sidenav extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleMove = this.handleMove.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        var send = {};

        send = {
            device: this.props.device.name,
            build: this.refs['build'].value,
            office: this.refs['office'].value,
            unit: this.refs['unit'].value,
            vendor: this.refs['vendor'].value,
            model: this.refs['model'].value,
            monthlimit: this.refs['monthlimit'].value,
        }
        this.props.devDataUpdate(send);
    }

    componentDidMount() {
        this.props.readDataFull(this.props.device.name)
    }

    handleMove(ref, index) {
        this.refs[ref].value = this.props.devData1[index];
    }

    render() {
        return (
            <div style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                top: 0, left: 0,
                backgroundColor: "rgba(243, 239, 237, 0.7)",
                zIndex: 999999
            }}>
                <div className="z-depth-5"
                    style={{
                        position: "absolute",
                        width: "70%",
                        height: "80%",
                        top: "10%",
                        left: "15%",
                        backgroundColor: "white",
                        zIndex: 1000000,
                        borderStyle: "solid",
                        borderColor: "#616161"
                    }}>
                    <div className="row col s12" style={{ backgroundColor: "#616161" }}>
                        <div className="col s2" style={{ backgroundColor: "#616161" }}></div>
                        <div className="col s5 center-align white-text" style={{ backgroundColor: "#616161" }}><h6>База данных</h6></div>
                        <div className="col s1" style={{ backgroundColor: "#616161" }}></div>
                        <div className="col s3 center-align white-text" style={{ backgroundColor: "#616161" }}><h6>Устройство</h6></div>
                        <div className="col s1" style={{ backgroundColor: "#616161" }}>
                            <a
                                className="btn-flat"
                                style={{...styles.btclose, backgroundColor: "#616161"}}
                                onClick={() => this.props.handleEdit({})}>
                                <SvgBtnClose fill="white" />
                            </a>
                        </div>
                    </div>
                    <div>
                        <form onSubmit={this.handleSubmit} ref="frm">
                            <div className="row col s12" style={{ backgroundColor: "#616161" }}>

                            </div>
                            <div className="row col s12" style={styles.frmTable}>
                                <div className="col s2" style={{ fontSize: "small" }}>Модель:</div>
                                <div className="col s5" style={{ fontSize: "small" }}>
                                    <input id="model" type="text" className="validate" ref="model" defaultValue={this.props.device.model} style={{ fontSize: "small" }} />
                                    <label htmlFor="model">Модель</label>
                                </div>
                                <div className="col s1 center-align" style={styles.frmTable}>
                                    <a className="btn-flat waves-effect waves-light white"
                                        onClick={() => this.handleMove("model", 0)}>
                                        <SvgBtnArrLeft fill="black" />
                                    </a>
                                </div>
                                <div className="col s4 center-align">{this.props.devData1[0]}</div>
                            </div>
                            <div className="row col s12" style={styles.frmTable}>
                                <div className="col s2" style={{ fontSize: "small" }}>Вендор:</div>
                                <div className="col s5">
                                    <input id="vendor" type="text" className="validate" ref="vendor" defaultValue={this.props.device.vendor} style={{ fontSize: "small" }} />
                                    <label htmlFor="vendor">Производитель</label>
                                </div>
                                <div className="col s1 center-align" style={styles.frmTable}>
                                    <a className="btn-flat waves-effect waves-light white"
                                        onClick={() => this.handleMove("vendor", 1)}>
                                        <SvgBtnArrLeft fill="black" />
                                    </a>
                                </div>
                                <div className="col s4 center-align">{this.props.devData1[1]}</div>
                            </div>
                            <div className="row col s12" style={styles.frmTable}>
                                <div className="col s2" style={{ fontSize: "small" }}>Отпечатков в месяц:</div>
                                <div className="col s5">
                                    <input id="monthlimit" type="text" className="validate" ref="monthlimit" defaultValue={this.props.device.monthlimit} style={{ fontSize: "small" }} />
                                    <label htmlFor="monthlimit">В месяц</label>
                                </div>
                                <div className="col s1"></div>
                                <div className="col s4"></div>
                            </div>
                            <div className="row col s12" style={styles.frmTable}>
                                <div className="col s2" style={{ fontSize: "small" }}>Цех / отдел:</div>
                                <div className="col s5">
                                    <input id="unit" type="text" className="validate" ref="unit" defaultValue={this.props.device.unit} style={{ fontSize: "small" }} />
                                    <label htmlFor="unit">Цех/отдел</label>
                                </div>
                                <div className="col s1"></div>
                                <div className="col s4"></div>
                            </div>
                            <div className="row col s12" style={styles.frmTable}>
                                <div className="col s2" style={{ fontSize: "small" }}>Корпус:</div>
                                <div className="col s5">
                                    <input id="build" type="text" className="validate" ref="build" defaultValue={this.props.device.build} style={{ fontSize: "small" }} />
                                    <label htmlFor="build">Корпус</label>
                                </div>
                                <div className="col s1"></div>
                                <div className="col s4"></div>
                            </div>
                            <div className="row col s12" style={styles.frmTable}>
                                <div className="col s2" style={{ fontSize: "small" }}>Кабинет:</div>
                                <div className="col s5">
                                    <input id="office" type="text" className="validate" ref="office" defaultValue={this.props.device.office} style={{ fontSize: "small" }} />
                                    <label htmlFor="office">Кабинет</label>
                                </div>
                                <div className="col s1"></div>
                                <div className="col s4"></div>
                            </div>
                            <div className="center-align">
                                <button
                                    className="btn waves-effect waves-light"
                                    type="submit"
                                    name="action">Изменить
                                </button>
                            </div>
                        </form >
                    </div>
                </div>
            </div>
        )
    }
}