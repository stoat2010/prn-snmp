import React, { Component } from 'react';
import swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Calendar } from 'ch-calendar';
import FileSaver from 'file-saver';

import TopNav from './TopNav';
import Sidenav from './Sidenav';
import ReportFAB from './ReportFAB';
import MainTable from './MainTable';
import CardView from './CardView';
import {SvgViewTable, SvgViewCard, SvgBtnAdd, SvgBtnRefresh, SvgBtnSave} from './Svg';

import styles from './Styles.css';
import "ch-calendar/dist/ch-calendar.css";


class ActionsLayer extends Component {

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
      repDate: new Date(),
      view: false
    };

    this.resetForm = this.resetForm.bind(this);
    this.toBase = this.toBase.bind(this);
    this.readData = this.readData.bind(this);
    this.Refresh = this.Refresh.bind(this);
    this.dbConn = this.dbConn.bind(this);
    this.toggleVisible = this.toggleVisible.bind(this);
    this.toggleView = this.toggleView.bind(this);
    this.toggleTopVisible = this.toggleTopVisible.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeBuild = this.handleChangeBuild.bind(this);
    this.handleChangeUnit = this.handleChangeUnit.bind(this);
    this.handleChangeVendor = this.handleChangeVendor.bind(this);
    this.handleIP = this.handleIP.bind(this);
    this.pdfCreate = this.pdfCreate.bind(this);
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

  toggleView() {
    const newViewState = !this.state.view;
    this.setState(
      {
        view: newViewState
      });

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

  Refresh() {
    this.setState({devices: []});
    this.dbConn('http://192.168.1.102:3333/api/devices');
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

  pdfCreate(props) {

    const mySwal = withReactContent(swal);

    mySwal.fire({
      showConfirmButton: false,
      title: 'Выбрать месяц и год',
      html: <div style={{ display: 'flex', justifyContent: 'center' }}><Calendar isMonth date={new Date()} onSelect={(repDate) => { this.setState({ repDate }); mySwal.clickConfirm() }} /></div>,
    })
      .then(() => {
        fetch(props.addr, {
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
        }).then(res => (res.blob())).then((data) => FileSaver.saveAs(data, props.name))
          .then(() => (this.setState({ repDate: new Date() })))
      })
  }

  componentDidMount() {
    this.dbConn('http://192.168.1.102:3333/api/devices');
    this.dbConnInit('http://192.168.1.102:3333/api/devices');
  }

  cl=() => this.state.view === true ? <CardView devices={this.state.devices} dbConn={this.dbConn} /> : <MainTable devices={this.state.devices} dbConn={this.dbConn} />;
  ic=() => this.state.view === true ? <SvgViewTable fill="white" /> : <SvgViewCard fill="white" />;

  render() {

    return (
      <div style={styles.parent} className="white">

        {this.cl()}

        <button
          className="btn-floating btn-large waves-effect waves-light green z-depth-1"
          style={styles.btnadd}
          onClick={this.toggleVisible}>
          <SvgBtnAdd fill="white" />
        </button>

        <button
          className="btn-floating btn waves-effect waves-light indigo z-depth-1"
          style={styles.btnview}
          onClick={this.toggleView}>
          {this.ic()}
        </button>
        <button
          className="btn-floating btn waves-effect waves-light indigo z-depth-1"
          style={styles.btnrefresh}
          onClick={this.Refresh}>
          <SvgBtnRefresh fill="white"/>
        </button>
        <button
          className="btn-floating btn waves-effect waves-light indigo z-depth-1"
          style={styles.btnsave}>
          <SvgBtnSave fill="white"/>
        </button>

        <ReportFAB pdfCreate={this.pdfCreate} />
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

export default ActionsLayer;
