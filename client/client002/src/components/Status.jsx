import React from 'react';
var classN = "btn-floating btn-small waves-effect waves-light red lighten-3";

export default function Status(props) {
    
        props.classes === 1 ? classN = "btn-floating btn-small waves-effect waves-light red lighten-3" : classN = "btn-floating btn-small waves-effect waves-light teal lighten-3"
        return(
            <button className={classN}><i className="material-icons">refresh</i></button>
        )
    }
