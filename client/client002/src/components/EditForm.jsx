import React, { Component } from 'react';

import {SvgBtnClose} from './Svg';

import styles from './Styles.css.js';

export default class Sidenav extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event) {
        event.preventDefault();
        var send = {};

        send = {
            device: this.props.devName,
            build: this.refs['build'].value,
            office: this.refs['office'].value,
            unit: this.refs['unit'].value,
            vendor: this.refs['vendor'].value,
            model: this.props.refs['model'].value,
            monthlimit: this.refs['monthlimit'].value,
        }

        this.props.toBase(send);
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
                <div style={{ position: "absolute", 
                    width: "70%", 
                    height: "70%", 
                    top: "15%", 
                    left: "15%", 
                    backgroundColor: "white", 
                    zIndex: 1000000,
                    borderStyle: "solid",
                    borderColor: "#bdbdbd"
                }}>
                    {this.props.device.device}
                    <button
                        className="btn-flat white lighten-3"
                        style={styles.btclose}
                        onClick={()=>this.props.handleEdit({})}>
                        <SvgBtnClose fill="black"/>
                    </button>
                </div>
            </div>
        )
    }
}