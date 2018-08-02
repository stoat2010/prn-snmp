import React from 'react';

import {Bar} from 'react-chartjs-2';

export default function PrintBar(props){

    var graphData= {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
        datasets:[
            {
                label: "",
                data: props.data,
                backgroundColor: "#efebe9",
                borderColor: "#bcaaa4",
                borderWidth: 1
        }]
    };
    var graphOptions= {
        maintainAspectRatio: false,
        responsive: true,
        legend: {
            display: false
        },
        scales: {
            xAxes: [{
                gridLines: {
                    offsetGridLines: true
                },
                barPercentage: 0.8
            }]
        },
        tooltips: {
            backgroundColor: "#9e9e9e"
        }
    };

    return (
        <Bar data={graphData} height={70} options={ graphOptions } />
    )

}