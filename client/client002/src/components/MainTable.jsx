import React, { Component } from 'react';
import swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Calendar } from 'ch-calendar';

import Row from './Row';
import TopNav from './TopNav';
import TableHeader from './TableHeader';
import Sidenav from './Sidenav';
import ReportFAB from './ReportFAB';

import styles from './Styles.css';
import "ch-calendar/dist/ch-calendar.css";

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
      devName: '',
      repDate: new Date()
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
    this.pdf2create = this.pdf2create.bind(this);
    this.pdf3create = this.pdf3create.bind(this);
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

    fetch("http://192.168.1.102:3333/devdata/" + devid, options)
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

    fetch("http://192.168.1.102:3333/devname/" + devid, options)
      .then((res => {
        if (res.status === 200) { return res.json(); }
        swal("Имя не найдено в DNS").then(this.setState({ loadSNMP: false }));
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
    this.state.isVisible === true ? this.sideStyle = styles.sidenav : this.sideStyle = styles.sidenavActive;
  }

  toggleTopVisible() {
    const newTopVisibleState = !this.state.isTopVisible;
    this.setState({ isTopVisible: newTopVisibleState, });
    this.state.isTopVisible === true ? this.topStyle = styles.topnav : this.topStyle = styles.topnavActive;
    this.state.isTopVisible === true ? this.setState({ btnArrows: 'arrow_downward' }) : this.setState({ btnArrows: 'arrow_upward' });
  }

  resetForm() {

    this.setState({ devData1: {}, devName: '' });
    this.toggleVisible();
  }

  handleChange(event) {
    var addr = '';
    if (event.target.value === '0') {
      addr = 'http://192.168.1.102:3333/api/devices';
    } else {
      addr = 'http://192.168.1.102:3333/api/devcol/' + event.target.value;
    }
    this.dbConn(addr);
  }

  handleChangeBuild(event) {
    var addr = '';
    if (event.target.value === '0') {
      addr = 'http://192.168.1.102:3333/api/devices';
    } else {
      addr = 'http://192.168.1.102:3333/api/buildcol/' + event.target.value;
    }
    this.dbConn(addr);
  }

  handleChangeUnit(event) {
    var addr = '';
    if (event.target.value === '0') {
      addr = 'http://192.168.1.102:3333/api/devices';
    } else {
      addr = 'http://192.168.1.102:3333/api/unitcol/' + event.target.value;
    }
    this.dbConn(addr);
  }

  handleChangeVendor(event) {
    var addr = '';
    if (event.target.value === '0') {
      addr = 'http://192.168.1.102:3333/api/devices';
    } else {
      addr = 'http://192.168.1.102:3333/api/vendorcol/' + event.target.value;
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
    fetch('http://192.168.1.102:3333/api/devices', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(submitted)
    })
      .then(res => {
        this.dbConn('http://192.168.1.102:3333/api/devices');
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
    this.dbConn('http://192.168.1.102:3333/api/devices');
    this.dbConnInit('http://192.168.1.102:3333/api/devices');
  }

  pdf2create() {

    const mySwal = withReactContent(swal);

    mySwal.fire({
      showConfirmButton: false,
      title: 'Выбрать месяц и год',
      html: <div style={{ display: 'flex', justifyContent: 'center' }}><Calendar isMonth date={new Date()} onSelect={(repDate) => { this.setState({ repDate }); mySwal.clickConfirm() }} /></div>,
    })
      .then((createReport) => {
        if (createReport.value) {
          fetch('http://192.168.1.102:3333/api/pdf2', {
            method: 'POST',
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              repdate: this.state.repDate,
              month: new Date(this.state.repDate).getMonth() + 1,
              year: new Date(this.state.repDate).getFullYear()
            })
          }).then(res => (res.blob())).then((data) => window.open(URL.createObjectURL(data)))
            .then(() => (this.setState({ repDate: new Date() })))}
      })
  }

  pdf3create() {

    const mySwal = withReactContent(swal);

    mySwal.fire({
      showConfirmButton: false,
      title: 'Выбрать месяц и год',
      html: <div style={{ display: 'flex', justifyContent: 'center' }}><Calendar isMonth date={new Date()} onSelect={(repDate) => { this.setState({ repDate }); mySwal.clickConfirm() }} /></div>,
    })
      .then(() => {
        fetch('http://192.168.1.102:3333/api/pdf3', {
          method: 'POST',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            repdate: this.state.repDate,
            month: new Date(this.state.repDate).getMonth() + 1,
            year: new Date(this.state.repDate).getFullYear()
          })
        }).then(res => (res.blob())).then((data) => window.open(URL.createObjectURL(data)))
          .then(() => (this.setState({ repDate: new Date() })))
      })
  }

  render() {

    return (
      <div style={styles.parent} className="white">

        <TableHeader />

        <div style={{ position: 'flex', overflow: 'auto', height: '720px' }}>
          <div className="row col s12" >
            {this.state.devices.map(device =>
              <Row
                key={device._id}
                device={device}
                dbConn={this.dbConn}
              />
            )}
          </div>
        </div>

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
    );
  }
}

export default MainTable;
