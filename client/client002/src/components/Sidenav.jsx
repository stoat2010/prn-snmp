import React, { Component } from 'react';

import { FadeLoader } from 'react-spinners';

import swal from 'sweetalert2';
import styles from './Styles.css.js';

export default class Sidenav extends Component {

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        var send = {};

        if (this.refs['device'].value.length > 0 ) {

            send = {
                device: this.props.devName,
                build: this.refs['build'].value,
                office: this.refs['office'].value,
                unit: this.refs['unit'].value,
                balance: this.props.devData1[3],
                serial: this.props.devData1[2],
                vendor: this.props.devData1[1],
                model: this.props.devData1[0],
                name: this.refs['device'].value,
                monthlimit: this.refs['monthlimit'].value,
                type: this.refs['type'].value,
                start_date: new Date()
            };

            this.props.toBase(send);
            this.refs['device'].value = '';
            this.refs['build'].value = '';
            this.refs['office'].value = '';
            this.refs['unit'].value = '';
            this.refs['monthlimit'].value = '';
            this.props.resetForm();
            this.props.toggleVisible();
        } else {
            this.refs['device'].value = '';
            swal('Ошибка при вводе имени!');
        }
    }

    render() {
        return (
            <div id="mySidenav" className="z-depth-5" style={this.props.sideStyle}>
                <button
                    className="btn-flat grey lighten-3"
                    style={styles.btclose}
                    onClick={this.props.toggleVisible}>
                    <i className="material-icons">close</i>
                </button>
                <div className="container">
                    <div style={styles.loader}>
                        <FadeLoader color={'#123abc'}
                            loading={this.props.loadSNMP} />
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <div className="container grey lighten-3">
                            <table>
                                <tbody>
                                    <tr>
                                        <td style={styles.spanLbl}>IP: </td>
                                        <td style={styles.spanSNMP}>{this.props.devName}</td>
                                    </tr>
                                    <tr>
                                        <td style={styles.spanLbl}>Производитель: </td>
                                        <td style={styles.spanSNMP}>{this.props.devData1[1]}</td>
                                    </tr>
                                    <tr>
                                        <td style={styles.spanLbl}>Модель: </td>
                                        <td style={styles.spanSNMP}>{this.props.devData1[0]}</td>
                                    </tr>
                                    <tr>
                                        <td style={styles.spanLbl}>S/N: </td>
                                        <td style={styles.spanSNMP}>{this.props.devData1[2]}</td>
                                    </tr>
                                    <tr>
                                        <td style={styles.spanLbl}>Отпечатки: </td>
                                        <td style={styles.spanSNMP}>{this.props.devData1[3]}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div>
                            <h6 className="brown-text"><b>Добавить новое устройство</b></h6>
                        </div>
                        <div className="input-field">
                            <input id="device" type="text" className="validate" ref="device" onBlur={this.props.handleIP} />
                            <label htmlFor="device">FQDN</label>
                        </div>
                        <table><tbody><tr>
                        <td>
                        <label>
                            <input name="group1" type="radio" ref="type" className="with-gap" value="0" defaultChecked />
                            <span>Монохром</span>
                        </label>
                        </td>
                        <td>
                        <label>
                            <input name="group1" type="radio" ref="type" className="with-gap" value="1" />
                            <span>Цветной</span>
                        </label>
                        </td>
                        </tr></tbody></table>
                        <div className="input-field">
                            <input id="build" type="text" className="validate" ref="build" />
                            <label htmlFor="build">Корпус</label>
                        </div>
                        <div className="input-field">
                            <input id="office" type="text" className="validate" ref="office" />
                            <label htmlFor="office">Кабинет</label>
                        </div>
                        <div className="input-field ">
                            <input id="unit" type="text" className="validate" ref="unit" />
                            <label htmlFor="unit">Подразделение/служба</label>
                        </div>
                        <div className="input-field ">
                            <input id="monthlimit" type="text" className="validate" ref="monthlimit" />
                            <label htmlFor="monthlimit">Отпечатков в месяц</label>
                        </div>
                        <div className="center-align">
                            <button className="btn waves-effect waves-light" type="submit" name="action">Добавить
                                 <i className="material-icons right">print</i>
                            </button>
                        </div>
                    </form >
                </div>
            </div>
        )
    }
}