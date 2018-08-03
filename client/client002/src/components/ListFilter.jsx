import React from 'react';

export default function FilterList(props){
    return(
        <select 
            id="myTopNavIp" 
            className="browser-default z-depth-50" 
            style={props.style} 
            onChange={props.handleChange}>
                <option value={0}>Все</option>
                {props.values.map(value => <option key={value} value={value}>{value}</option>)}
        </select>
    )
}