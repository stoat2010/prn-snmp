import React, { Component } from 'react';
import swal from 'sweetalert';
import { FadeLoader } from 'react-spinners';

import Row from './components/Row';
import TopNav from './components/TopNav';
import styles from './components/Styles.css.js';
const isIp = require('is-ip');

class App extends Component {

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

    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleSubmit(event) {
    event.preventDefault();
    var send = {};

    var rightIp = isIp(this.refs['device'].value);

    if (this.refs['device'].value.length > 0) {

      send = {
        device: this.state.devName,
        build: this.refs['build'].value,
        office: this.refs['office'].value,
        unit: this.refs['unit'].value,
        balance: this.state.devData1[3],
        serial: this.state.devData1[2],
        vendor: this.state.devData1[1],
        model: this.state.devData1[0],
        name: this.refs['device'].value,
        start_date: new Date()
      };

      this.toBase(send);
      this.refs['device'].value = '';
      this.refs['build'].value = '';
      this.refs['office'].value = '';
      this.refs['unit'].value = '';
      this.setState({ devData1: {}, devName: '' });
      this.toggleVisible();
    } else {
      swal('Ошибка при вводе имени!');
    }
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
      <div style={styles.parent}>

        <nav className="nav-extended teal lighten-3">
          <div className="nav-wrapper">
            <div className="brand-logo">SNMP опрос сетевых МФУ и принтеров</div>
          </div>
        </nav>

        <div className="row col s12 grey darken-1 white-text" style={{ position: 'flex', height: '40px' }}>
          <div className="col s1" style={{ width: '3%', ...styles.cellCap }}>Статус</div>
          <div className="col s1" style={{ width: '14%', ...styles.cellCap }}>Описание</div>
          <div className="col s1" style={{ width: '11%', ...styles.cellCap }}>FQDN/IP</div>
          <div className="col s1" style={{ width: '11%', ...styles.cellCap }}>Модель</div>
          <div className="col s1" style={{ width: '7%', ...styles.cellCap }}>Производитель</div>
          <div className="col s1" style={{ width: '6%', ...styles.cellCap }}>S/N</div>
          <div className="col s1" style={{ width: '6%', ...styles.cellCap }}>Отпечатки</div>
          <div className="col s1" style={{ width: '5%', ...styles.cellCap }}>Опрошен</div>
          <div className="col s1" style={{ width: '4%', ...styles.cellCap }}>Записать</div>
          <div className="col s2" style={{ width: '28%', ...styles.cellCap }}>График {new Date().getFullYear()}</div>
          <div className="col s1" style={{ width: '5%', ...styles.cellCap }}>Удалить</div>
        </div>
        <div className="row col s12" >
          <div style={{ position: 'flex', overflow: 'auto', height: '720px' }}>
            {this.state.devices.map(device => <Row key={device._id} device={device} dbConn={this.dbConn} />)}
          </div>
        </div>
        <div id="mySidenav" className="z-depth-5" style={this.sideStyle}>
          <button
            className="btn-flat grey lighten-3"
            style={styles.btclose}
            onClick={this.toggleVisible}>
            <i className="material-icons">close</i>
          </button>
          <div className="container">
            <div style={styles.loader}>
              <FadeLoader color={'#123abc'}
                loading={this.state.loadSNMP} />
            </div>
            <form onSubmit={this.handleSubmit}>
              <div className="container grey lighten-3">
                <table>
                  <tbody>
                    <tr>
                      <td style={styles.spanLbl}>IP: </td>
                      <td style={styles.spanSNMP}>{this.state.devName}</td>
                    </tr>
                    <tr>
                      <td style={styles.spanLbl}>Вендор: </td>
                      <td style={styles.spanSNMP}>{this.state.devData1[1]}</td>
                    </tr>
                    <tr>
                      <td style={styles.spanLbl}>Модель: </td>
                      <td style={styles.spanSNMP}>{this.state.devData1[0]}</td>
                    </tr>
                    <tr>
                      <td style={styles.spanLbl}>S/N: </td>
                      <td style={styles.spanSNMP}>{this.state.devData1[2]}</td>
                    </tr>
                    <tr>
                      <td style={styles.spanLbl}>Отпечатки: </td>
                      <td style={styles.spanSNMP}>{this.state.devData1[3]}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div>
                <h6 className="brown-text"><b>Добавить новое устройство</b></h6>
              </div>
              <div className="input-field">
                <input id="device" type="text" className="validate" ref="device" onBlur={this.handleIP} />
                <label htmlFor="device">FQDN</label>
              </div>
              <div className="input-field">
                <input id="build" type="text" className="validate" ref="build" />
                <label htmlFor="build">Корпус</label>
              </div>
              <div className="input-field">
                <input id="office" type="text" className="validate" ref="office" />
                <label htmlFor="office">Кабинет</label>
              </div>
              <div className="input-field ">
                <input id="unit" type="text" className="validate" ref="unit" />
                <label htmlFor="unit">Подразделение/служба</label>
              </div>

              <div className="center-align">
                <button className="btn waves-effect waves-light" type="submit" name="action">Добавить
                  <i className="material-icons right">print</i>
                </button>
              </div>
            </form >
          </div>
        </div>
        <TopNav
          btnArrows={this.state.btnArrows}
          topStyle={this.topStyle}
          toggleTopVisible={this.toggleTopVisible}
          devices={this.state.devlist}
          handleChange={this.handleChange}
          handleChangeBuild={this.handleChangeBuild}
          handleChangeUnit={this.handleChangeUnit}
          handleChangeVendor={this.handleChangeVendor} />

        <nav className="nav-extended teal lighten-3">
          <div className="nav-extended teal lighten-3" style={styles.footer}>
            <div className="nav-wrapper">
              <div className="brand-logo">Контроль ОЦО и С-Принт на предмет лажи по МФУ и принтерам</div>
              <button
                className="btn-floating btn-large waves-effect waves-light red z-depth-5"
                style={styles.btnadd}
                onClick={this.toggleVisible}>
                <i className="material-icons">add</i></button>
            </div>
          </div>
        </nav>

      </div>
    );
  }
}

export default App;
