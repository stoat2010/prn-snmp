import React, { Component } from 'react';

import Row from './Row';
import TableHeader from './TableHeader';


export default function MainTable(props){

    return (
      <div>
        <TableHeader />

        <div style={{ position: 'flex', overflow: 'auto', height: '720px' }}>
          <div className="row col s12" >
            {props.devices.map(device =>
              <Row
                key={device._id}
                device={device}
                dbConn={props.dbConn}
              />
            )}
          </div>
        </div>
      </div>
    );
}
