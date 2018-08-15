import React from 'react';

import styles from './Styles.css.js';

export default function Footer(props) {

    return (
        <nav className="nav-extended blue darken-4" style={styles.footer}>
                 <div className="nav-wrapper">
                    <div className="brand-logo center">Контроль ОЦО и С-Принт на предмет лажи по МФУ и принтерам</div>
                    <button
                        className="btn-floating btn-large waves-effect waves-light red z-depth-5"
                        style={styles.btnadd}
                        onClick={props.toggleVisible}>
                        <i className="material-icons">add</i>
                    </button>
                    {/* <a href="./report.html" target="_blank"
                className="btn-floating btn-large waves-effect waves-light blue z-depth-5"
                style={styles.btnpdf}>
                <i className="material-icons">assignment</i>
              </a> */}
                </div>
        </nav>)

}