import React, { Component } from 'react';

import swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Calendar } from 'ch-calendar';

import TopNav from './TopNav';
import Sidenav from './Sidenav';
import ReportFAB from './ReportFAB';

import styles from './Styles.css';
import "ch-calendar/dist/ch-calendar.css";

export default class ActionsLayer extends Component {


    render() {
        return (
            <div>
                <button
                    className="btn-floating btn-large waves-effect waves-light green z-depth-1"
                    style={styles.btnadd}
                    onClick={this.toggleVisible}>
                    <i className="material-icons">add</i>
                </button>

                <ReportFAB pdf2create={this.pdf2create} pdf3create={this.pdf3create} />
                <Sidenav
                    toggleVisible={this.toggleVisible}
                    toBase={this.toBase}
                    resetForm={this.resetForm}
                    handleIP={this.handleIP}
                    loadSNMP={this.state.loadSNMP}
                    devName={this.state.devName}
                    devData1={this.state.devData1}
                    sideStyle={this.sideStyle}
                />
                <TopNav
                    btnArrows={this.state.btnArrows}
                    topStyle={this.topStyle}
                    toggleTopVisible={this.toggleTopVisible}
                    devices={this.state.devlist}
                    handleChange={this.handleChange}
                    handleChangeBuild={this.handleChangeBuild}
                    handleChangeUnit={this.handleChangeUnit}
                    handleChangeVendor={this.handleChangeVendor}
                />
            </div>
        )
    }
}