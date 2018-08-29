import React, { Component } from 'react';

import styles from './Styles.css';

export default class LoginForm extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div style={styles.loginForm} className="z-depth-5, indigo-text">
                <div className="container">
                    <div className="center"><h3>Авторизация</h3></div>
                    <form onSubmit={this.handleSubmit}>
                        <div className="input-field">
                            <input id="username" type="text" className="validate" ref="username" />
                            <label htmlFor="username">Пользователь</label>
                        </div>
                        <div className="input-field">
                            <input id="password" type="password" className="validate" ref="password" />
                            <label htmlFor="password">Пароль</label>
                        </div>
                        <div className="center-align">
                            <button className="btn waves-effect waves-light indigo" type="submit" name="action">Вход
                            <i className="material-icons right">send</i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}