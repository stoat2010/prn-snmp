import React, { Component } from 'react';

import DevCard from './DevCard';

export default class CardView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            devices: [],
        };

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
        this.dbConn('http://192.168.1.102:3333/api/devices');
    }

    render() {

        return (
            
            <div style={{ position: 'flex', overflow: 'auto', height: '800px' }}>
                <div className="row col s12" >
                    {this.state.devices.map(device =>
                        <DevCard
                            key={device._id}
                            device={device}
                            dbConn={this.dbConn}
                        />
                    )}
                </div>
            </div>

        )
    }
}