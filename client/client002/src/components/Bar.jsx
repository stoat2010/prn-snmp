import React from 'react';

import {Bar} from 'react-chartjs-2';

export default function PrintBar(props){

    var graphData= {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
        datasets:[
            /* {
                label: "",
                type: "line",
                data: [470, 470, 470, 470, 470, 470, 470, 470, 470, 470, 470, 470],
                borderColor: "#ad1457",
                fill: false,
                borderWidth: 0.5,
                radius: 0
            }, */
            {
                label: "",
                //data: [530, 600, 550, 500, 590, 560, 505, 180, 490, 540, 580, 300],
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