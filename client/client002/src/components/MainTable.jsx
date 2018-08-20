import React, { Component } from 'react';

import Row from './Row';
import TopNav from './TopNav';
import TableHeader from './TableHeader';
import Sidenav from './Sidenav';

import styles from './Styles.css';

class MainTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tab: 0,
      devices: [],
      devlist: [],
      isVisible: false,
      isTopVisible: false,
      btnArrows: 'arrow_downward',
      devData1: {},
      loadSNMP: false,
      devName: ''
    };

    this.resetForm = this.resetForm.bind(this);
    this.toBase = this.toBase.bind(this);
    this.readData = this.readData.bind(this);
    this.dbConn = this.dbConn.bind(this);
    this.toggleVisible = this.toggleVisible.bind(this);
    this.toggleTopVisible = this.toggleTopVisible.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeBuild = this.handleChangeBuild.bind(this);
    this.handleChangeUnit = this.handleChangeUnit.bind(this);
    this.handleChangeVendor = this.handleChangeVendor.bind(this);
    this.handleIP = this.handleIP.bind(this);
    this.sideStyle = styles.sidenav;
    this.topStyle = styles.topnav;
  }

  readData(devid) {

    this.setState({ loadSNMP: true });

    var options = {
      method: 'GET',
      mode: 'cors',
      cache: 'default'
    };

    fetch("http://127.0.0.1:3333/devdata/" + devid, options)
      .then((res => {
        return res.json();
      }))
      .then(devData1 => { this.setState({ devData1, loadSNMP: false }); });
  }

  readName(devid) {

    this.setState({ loadSNMP: true });

    var options = {
      method: 'GET',
      mode: 'cors',
      cache: 'default'
    };

    fetch("http://127.0.0.1:3333/devname/" + devid, options)
      .then((res => {
        return res.json();
      }))
      .then(devName => { this.setState({ devName }); });
  }

  toggleVisible() {
    const newVisibleState = !this.state.isVisible;
    this.setState(
      {
        isVisible: newVisibleState,
        devData1: {}
      });
    this.state.isVisible === false ? this.sideStyle = styles.sidenav : this.sideStyle = styles.sidenavActive;
  }

  toggleTopVisible() {
    const newTopVisibleState = !this.state.isTopVisible;
    this.setState({ isTopVisible: newTopVisibleState, });
    this.state.isTopVisible === false ? this.topStyle = styles.topnav : this.topStyle = styles.topnavActive;
    this.state.isTopVisible === false ? this.setState({ btnArrows: 'arrow_downward' }) : this.setState({ btnArrows: 'arrow_upward' });
  }

  resetForm() {

    this.setState({ devData1: {}, devName: '' });
    this.toggleVisible();
  }


  handleChange(event) {
    var addr = '';
    if (event.target.value === '0') {
      addr = 'http://127.0.0.1:3333/api/devices';
    } else {
      addr = 'http://127.0.0.1:3333/api/devcol/' + event.target.value;
    }
    this.dbConn(addr);
  }

  handleChangeBuild(event) {
    var addr = '';
    if (event.target.value === '0') {
      addr = 'http://127.0.0.1:3333/api/devices';
    } else {
      addr = 'http://127.0.0.1:3333/api/buildcol/' + event.target.value;
    }
    this.dbConn(addr);
  }

  handleChangeUnit(event) {
    var addr = '';
    if (event.target.value === '0') {
      addr = 'http://127.0.0.1:3333/api/devices';
    } else {
      addr = 'http://127.0.0.1:3333/api/unitcol/' + event.target.value;
    }
    this.dbConn(addr);
  }

  handleChangeVendor(event) {
    var addr = '';
    if (event.target.value === '0') {
      addr = 'http://127.0.0.1:3333/api/devices';
    } else {
      addr = 'http://127.0.0.1:3333/api/vendorcol/' + event.target.value;
    }
    this.dbConn(addr);
  }

  handleIP(event) {
    event.preventDefault()

    if (event.target.value.length > 0) {
      this.readName(event.target.value)
      this.readData(event.target.value);
    }
  }

  toBase(submitted) {

    fetch('http://127.0.0.1:3333/api/devices', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(submitted)
    })
      .then(res => {
        this.dbConn('http://127.0.0.1:3333/api/devices');
      });
  }

  dbConn(addr) {
    fetch(addr, { cache: 'no-cache' })
      .then(res => {
        return res.json();
      })
      .then(devices => { this.setState({ devices }); });
  }
  dbConnInit(addr) {
    fetch(addr, { cache: 'no-cache' })
      .then(res => {
        return res.json();
      })
      .then(devices => { this.setState({ devlist: devices }); });
  }

  componentDidMount() {
    this.dbConn('http://127.0.0.1:3333/api/devices');
    this.dbConnInit('http://127.0.0.1:3333/api/devices');
  }

  render() {

    return (
      <div style={styles.parent} className="grey lighten-5">

        <TableHeader />

        <div className="row col s12" >
          <div style={{ position: 'flex', overflow: 'auto', height: '750px' }}>
            {this.state.devices.map(device =>
              <Row
                key={device._id}
                device={device}
                dbConn={this.dbConn}
              />
            )}
          </div>
        </div>

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
        {/* <Footer toggleVisible={this.toggleVisible} /> */}
        <button
          className="btn-floating btn-large waves-effect waves-light red z-depth-5"
          style={styles.btnadd}
          onClick={this.toggleVisible}>
          <i className="material-icons">add</i>
        </button>
        <a href="http://127.0.0.1:3333/api/pdf"
                className="btn-floating btn-large waves-effect waves-light blue z-depth-5"
                style={styles.btnpdf}>
                <i className="material-icons">assignment</i>
        </a>
      </div>
    );
  }
}

export default MainTable;
