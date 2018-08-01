import React, { Component } from 'react';
import swal from 'sweetalert';

import MainTable from './components/Table';
import TopNav from './components/TopNav';
import styles from './components/Styles.css.js';
const isIp = require ('is-ip');

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      tab: 0,
      devices: [],
      devlist: [],
      isVisible: false,
      isTopVisible: false,
      btnArrows: 'arrow_downward'
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.toBase = this.toBase.bind(this);
    this.dbConn = this.dbConn.bind(this);
    this.toggleVisible = this.toggleVisible.bind(this);
    this.toggleTopVisible = this.toggleTopVisible.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeBuild = this.handleChangeBuild.bind(this);
    this.sideStyle = styles.sidenav;
    this.topStyle = styles.topnav;
  }

  toggleVisible() {
    const newVisibleState = !this.state.isVisible;
    this.setState({isVisible: newVisibleState});
    this.state.isVisible === false ? this.sideStyle=styles.sidenav : this.sideStyle=styles.sidenavActive;
  }

  toggleTopVisible() {
    const newTopVisibleState = !this.state.isTopVisible;
    this.setState({isTopVisible: newTopVisibleState});
    this.state.isTopVisible === false ? this.topStyle=styles.topnav : this.topStyle=styles.topnavActive;
    this.state.isTopVisible === false ? this.setState({btnArrows: 'arrow_downward'}) : this.setState({btnArrows: 'arrow_upward'});
  }

  handleSubmit(event) {
    event.preventDefault();
    var send = {};

    var rightIp = isIp(this.refs['device'].value);
    
    if (rightIp) {

      send = {
        device: this.refs['device'].value,
        build: this.refs['build'].value,
        office: this.refs['office'].value,
        unit: this.refs['unit'].value,
        balance: this.refs['balance'].value
      };

      this.toBase(send);
      this.refs['device'].value = '';
      this.refs['build'].value = '';
      this.refs['office'].value = '';
      this.refs['unit'].value = '';
      this.refs['balance'].value = '';
      this.toggleVisible();
    }else{
      swal('Ошибка при вводе IP адреса!');
    }
  }

  handleChange(event){
    var addr ='';
    if (event.target.value === '0'){
      addr = 'http://127.0.0.1:3333/api/devices';
    }else{
      addr = 'http://127.0.0.1:3333/api/devcol/'+event.target.value;
    }
    this.dbConn(addr);
  }

  handleChangeBuild(event){
    var addr ='';
    if (event.target.value === '0'){
      addr = 'http://127.0.0.1:3333/api/devices';
    }else{
      addr = 'http://127.0.0.1:3333/api/buildcol/'+event.target.value;
    }
    this.dbConn(addr);
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
    fetch(addr, {cache: 'no-cache'})
        .then(res => {
            return res.json();
        })
        .then(devices => {this.setState({ devices });});
  }
  dbConnInit(addr) {
    fetch(addr, {cache: 'no-cache'})
        .then(res => {
            return res.json();
        })
        .then(devices => {this.setState({ devlist: devices });});
  }

  componentDidMount() {
    this.dbConn('http://127.0.0.1:3333/api/devices');
    this.dbConnInit('http://127.0.0.1:3333/api/devices');
  }

  render() {

    return (
      <div>

        <nav className="nav-extended teal lighten-3">
            <div className="nav-wrapper">
                <div className="brand-logo">SNMP опрос сетевых МФУ и принтеров</div>
            </div>
        </nav>

        <MainTable devices={this.state.devices} devlist={this.state.devlist} dbConn={this.dbConn} toggleVisible={this.toggleVisible} handleChange={this.handleChange} />

        <div id="mySidenav" className="z-depth-5" style={this.sideStyle}>
          <button
            className="btn-flat grey lighten-3"
            style={styles.btclose}
            onClick={this.toggleVisible}>
            <i className="material-icons">close</i>
          </button>
          <div className="container">
            <form onSubmit={this.handleSubmit}>
              <div>
                <h6 className="brown-text"><b>Добавить новое устройство</b></h6>
              </div>
              <div className="input-field">
                <input id="device" type="text" className="validate" ref="device" />
                <label htmlFor="device">IP адрес</label>
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
              <div className="input-field ">
                <input id="balance" type="text" className="validate" ref="balance" />
                <label htmlFor="unit">Начальный остаток</label>
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
          handleChangeBuild={this.handleChangeBuild} />
        
        <button className="btn-floating btn-large waves-effect waves-light red z-depth-5" style={styles.btnadd} onClick={this.toggleVisible}><i className="material-icons">add</i></button>
      </div>
    );
  }
}

export default App;
