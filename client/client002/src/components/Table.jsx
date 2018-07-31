import React from 'react';

//import CommandRow from './CommandRow';
import Row from './Row';

export default function MainTable(props) {
    return(
        <div className="row">
        <table className='centered col s12'>
            <thead className="grey darken-1 white-text">
                <tr>
                    <th>Статус</th>
                    <th>IP</th>
                    <th>Описание</th>
                    <th>Модель</th>
                    <th>Производитель</th>
                    <th>S/N</th>
                    <th>Отпечатки</th>
                    <th>Опрошен</th>
                    <th>Записать</th>
                    <th>График {new Date().getFullYear()}</th>
                    <th>Удалить</th>
                </tr>
                {/* <CommandRow devices={props.devlist} toggleVisible={props.toggleVisible} handleChange={props.handleChange} /> */}
            </thead>
            <tbody>
                
                {props.devices.map(device=> <Row key={device._id} device={device} dbConn={props.dbConn} />)}
            </tbody>
        </table>
        </div>
    )

}