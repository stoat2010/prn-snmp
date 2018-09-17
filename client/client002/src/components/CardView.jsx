import React from 'react';

import DevCard from './DevCard';

export default function CardView(props) {

        return (
            
            <div style={{ position: 'flex', overflow: 'auto', height: '775px' }}>
                <div className="row col s12" >
                    {props.devices.map(device =>
                        <DevCard
                            key={device._id}
                            device={device}
                            dbConn={props.dbConn}
                        />
                    )}
                </div>
            </div>

        )
    }