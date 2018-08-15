import React, { Component } from 'react';

import RowReport from './RowReport'

import styles from './Styles.css';

export default class Report extends Component {

    constructor(props) {
        super(props);
        this.state = {
            devices: []
        }
        this.dbConn = this.dbConn.bind(this);
    }

    dbConn(addr) {
        fetch(addr, { cache: 'no-cache' })
            .then(res => {
                return res.json();
            })
            .then(devices => { this.setState({ devices }); });
    }

    componentDidMount() {
        this.dbConn('http://127.0.0.1:3333/api/devices');
    }

    render() {
        return (
            <div className="white" style={styles.parent}>
                <div className="container">
                    <div className="row col s12 grey darken-1 white-text" style={{ position: 'flex', height: '40px' }}>
                        <div className="col s3" style={{ width: '25%', ...styles.cellCap }}>Описание</div>
                        <div className="col s3" style={{ width: '20%', ...styles.cellCap }}>FQDN/IP</div>
                        <div className="col s2" style={{ width: '20%', ...styles.cellCap }}>Модель</div>
                        <div className="col s2" style={{ width: '20%', ...styles.cellCap }}>Производитель</div>
                        <div className="col s2" style={{ width: '15%', ...styles.cellCap }}>В отчет</div>
                    </div>
                </div>
                <div className="container grey lighten-5" style={{ position: 'flex', overflow: 'auto', height: '750px' }}>
                    {this.state.devices.map(device => (
                        <RowReport key={device._id}
                            device={device}
                        />
                    ))}
                </div>
            </div >
        )
    }
}