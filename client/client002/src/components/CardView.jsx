import React from 'react';

import DevCard from './DevCard';

export default function CardView(props) {

        return (
            
            <div style={{ position: 'flex', overflow: 'auto', flex: '4' }}>
                <div className="row col s12" >
                    {props.devices.map(device =>
                        <DevCard
                            key={device._id}
                            device={device}
                            dbConn={props.dbConn}
                            handleEdit={props.handleEdit}
                        />
                    )}
                </div>
            </div>

        )
    }