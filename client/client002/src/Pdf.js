import React from 'react';
import ReactDOM from 'react-dom';

import RowMin from './components/RowMin';

import {Document, Page, Text, View, StyleSheet} from '@react-pdf/renderer';

export default function MyDocument(props){


    const style = StyleSheet.create({
        page: {
            textDirection: 'row',
            backgroundColor: '#e4e4e4'
        },
        section: {
            margin: 10,
            padding: 10,
            flexGrow: 1
        }
    });

    console.log(props);

    ReactDOM.render(
        <Document>
            <Page size="A4" style={style.page}>
                <View style={style.section}>
                {props.map(device => <Text>{device.device}</Text>)})}
                </View>
            </Page>
        </Document>, document.getElementById('pdf')) 

}