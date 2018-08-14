import React from 'react';

import styles from './Styles.css.js';

export default function TableHeader(){
    return(
        <div className="row col s12 grey darken-1 white-text" style={{ position: 'flex', height: '40px' }}>
          <div className="col s1" style={{ width: '3%', ...styles.cellCap }}>Статус</div>
          <div className="col s1" style={{ width: '15%', ...styles.cellCap }}>Описание</div>
          <div className="col s1" style={{ width: '11%', ...styles.cellCap }}>FQDN/IP</div>
          <div className="col s1" style={{ width: '11%', ...styles.cellCap }}>Модель</div>
          <div className="col s1" style={{ width: '7%', ...styles.cellCap }}>Производитель</div>
          <div className="col s1" style={{ width: '6%', ...styles.cellCap }}>S/N</div>
          <div className="col s1" style={{ width: '6%', ...styles.cellCap }}>Отпечатки</div>
          <div className="col s1" style={{ width: '5%', ...styles.cellCap }}>Опрошен</div>
          <div className="col s1" style={{ width: '4%', ...styles.cellCap }}>Записать</div>
          <div className="col s2" style={{ width: '28%', ...styles.cellCap }}>График {new Date().getFullYear()}</div>
          <div className="col s1" style={{ width: '4%', ...styles.cellCap }}>Удалить</div>
        </div>
    )
}