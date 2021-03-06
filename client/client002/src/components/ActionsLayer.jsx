import React, { Component } from 'react';
import swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Calendar } from 'ch-calendar';
import FileSaver from 'file-saver';

import TopNav from './TopNav';
import Sidenav from './Sidenav';
import CardView from './CardView';
import ReportFAB from './ReportFAB';
import MainTable from './MainTable';
import EditForm from './EditForm';

import { SvgViewTable, SvgViewCard, SvgBtnAdd, SvgBtnRefresh, SvgBtnSave, SvgBtnArrUp, SvgBtnArrDown } from './Svg';
import { srvParams } from '../srvParams';

import styles from './Styles.css';
import "ch-calendar/dist/ch-calendar.css";
import "./frmcss.css"


class ActionsLayer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tab: 0,
      devices: [],
      devlist: [],
      isVisible: false,
      isTopVisible: false,
      btnArrows: <SvgBtnArrDown fill="white" />,
      devData1: {},
      loadSNMP: false,
      devName: '',
      repDate: new Date(),
      view: JSON.parse(localStorage.getItem('view')),
      toggleEdit: false
    };

    this.resetForm = this.resetForm.bind(this);
    this.toBase = this.toBase.bind(this);
    this.readDataFull = this.readDataFull.bind(this);
    this.Refresh = this.Refresh.bind(this);
    this.dbConn = this.dbConn.bind(this);
    this.toggleVisible = this.toggleVisible.bind(this);
    this.toggleView = this.toggleView.bind(this);
    this.toggleTopVisible = this.toggleTopVisible.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleChangeBuild = this.handleChangeBuild.bind(this);
    this.handleChangeUnit = this.handleChangeUnit.bind(this);
    this.handleChangeVendor = this.handleChangeVendor.bind(this);
    this.handleIP = this.handleIP.bind(this);
    this.pdfCreate = this.pdfCreate.bind(this);
    this.devDataUpdate = this.devDataUpdate.bind(this);
    this.sideStyle = styles.sidenav;
    this.topStyle = styles.topnav;
  }

  readDataFull(devid) {

    this.setState({ loadSNMP: true });

    var options = {
      method: 'GET',
      mode: 'cors',
      cache: 'default'
    };

    fetch("http://" + srvParams.srvAddr + ":" + srvParams.srvPort + "/devdatafull/" + devid, options)
      .then((res => {
        return res.json();
      }))
      .then(devData1 => { this.setState({ devData1, loadSNMP: false }); console.log(devid) });
  }

  readName(devid) {

    this.setState({ loadSNMP: true });

    var options = {
      method: 'GET',
      mode: 'cors',
      cache: 'default'
    };

    fetch("http://" + srvParams.srvAddr + ":" + srvParams.srvPort + "/devname/" + devid, options)
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
    if (!localStorage['view']) { localStorage.key = 'view' }
    localStorage['view'] = JSON.stringify(newViewState);
    this.Refresh();
  }

  toggleTopVisible() {
    const newTopVisibleState = !this.state.isTopVisible;
    this.setState({ isTopVisible: newTopVisibleState, });
    this.state.isTopVisible === true ? this.topStyle = styles.topnav : this.topStyle = styles.topnavActive;
    this.state.isTopVisible === true ? this.setState({ btnArrows: <SvgBtnArrDown fill="white" /> }) : this.setState({ btnArrows: <SvgBtnArrUp fill="white" /> });
  }

  resetForm() {

    this.setState({ devData1: {}, devName: '' });
    this.toggleVisible();
  }

  Refresh() {
    this.setState({ devices: [] });
    this.dbConn("http://" + srvParams.srvAddr + ":" + srvParams.srvPort + "/api/devices");
  }

  handleChange(event) {
    var addr = '';
    if (event.target.value === '0') {
      addr = "http://" + srvParams.srvAddr + ":" + srvParams.srvPort + "/api/devices";
    } else {
      addr = "http://" + srvParams.srvAddr + ":" + srvParams.srvPort + "/api/devcol/" + event.target.value;
    }
    this.dbConn(addr);
  }

  handleChangeBuild(event) {
    var addr = '';
    if (event.target.value === '0') {
      addr = "http://" + srvParams.srvAddr + ":" + srvParams.srvPort + "/api/devices";
    } else {
      addr = "http://" + srvParams.srvAddr + ":" + srvParams.srvPort + "/api/buildcol/" + event.target.value;
    }
    this.dbConn(addr);
  }

  handleChangeUnit(event) {
    var addr = '';
    if (event.target.value === '0') {
      addr = "http://" + srvParams.srvAddr + ":" + srvParams.srvPort + "/api/devices";
    } else {
      addr = "http://" + srvParams.srvAddr + ":" + srvParams.srvPort + "/api/unitcol/" + event.target.value;
    }
    this.dbConn(addr);
  }

  handleChangeVendor(event) {
    var addr = '';
    if (event.target.value === '0') {
      addr = "http://" + srvParams.srvAddr + ":" + srvParams.srvPort + "/api/devices";
    } else {
      addr = "http://" + srvParams.srvAddr + ":" + srvParams.srvPort + "/api/vendorcol/" + event.target.value;
    }
    this.dbConn(addr);
  }

  handleIP(event) {
    event.preventDefault()

    if (event.target.value.length > 0) {
      this.readName(event.target.value)
      this.readDataFull(event.target.value);
    }
  }

  handleEdit(device) {
    this.setState({ toggleEdit: !this.state.toggleEdit })
    this.devToEdit = device;
  }

  toBase(submitted) {
    fetch("http://" + srvParams.srvAddr + ":" + srvParams.srvPort + "/api/devices", {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(submitted)
    })
      .then(res => {
        this.dbConn("http://" + srvParams.srvAddr + ":" + srvParams.srvPort + "/api/devices");
      });
  }

  devDataUpdate(submitted) {
    fetch("http://" + srvParams.srvAddr + ":" + srvParams.srvPort + "/api/device", {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(submitted)
    })
      .then(res => {
        this.dbConn("http://" + srvParams.srvAddr + ":" + srvParams.srvPort + "/api/devices");
        this.setState({ toggleEdit: false })
        return res.json();
      }).then(status => status === 0 ? swal("Данные изменены") : swal("Ошибка записи"));
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
    if (!localStorage['view']) {
      localStorage.key = 'view'
      localStorage['view'] = JSON.stringify(1);
    }
    this.setState({ view: JSON.parse(localStorage['view']) })


    this.dbConn("http://" + srvParams.srvAddr + ":" + srvParams.srvPort + "/api/devices");
    this.dbConnInit("http://" + srvParams.srvAddr + ":" + srvParams.srvPort + "/api/devices");
  }

  cl = () => this.state.view === 1 ? <CardView devices={this.state.devices} dbConn={this.dbConn} handleEdit={this.handleEdit} /> : <MainTable devices={this.state.devices} dbConn={this.dbConn} />;
  ic = () => this.state.view === 1 ? <SvgViewTable fill="white" /> : <SvgViewCard fill="white" />;
  ed = () => this.state.toggleEdit && <EditForm device={this.devToEdit} handleEdit={this.handleEdit} readDataFull={this.readDataFull} devData1={this.state.devData1} devDataUpdate={this.devDataUpdate} />;

  render() {

    return (
      <div style={styles.parent} className="white">

        {this.cl()}
        {this.ed()}
        <div className="blue lighten-5" style={{ flex: "1" }}>
          
          <div className="right" style={{ display: 'flex', marginTop: '1em', alignItems: "center", paddingRight:"1.5em", flexDirection: 'row', justifyContent: 'space-between' }}>
            
            <button
              className="btn-floating btn-large waves-effect waves-light green z-depth-1"
              style={{ display: 'flex', justifyContent: "center", margin: "0 5px"}}
              onClick={this.toggleVisible}>
              <SvgBtnAdd fill="white" />
            </button>
            <button
              className="btn-floating btn-large waves-effect waves-light indigo z-depth-1"
              style={{ display: 'flex', justifyContent: "center", margin: "0 5px"}}
              onClick={this.Refresh}>
              <SvgBtnRefresh fill="white" />
            </button>
            <ReportFAB pdfCreate={this.pdfCreate} />
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

      </div>
    );
  }
}

export default ActionsLayer;
