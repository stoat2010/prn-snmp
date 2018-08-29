import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import MainTable from './components/MainTable'
import PageHeader from './components/PageHeader';
import LoginForm from './components/LoginForm';
import NotFound from './components/NotFound'

export default function App() {
    return (

        <Router>
            <div>
                <PageHeader />
                <Switch>
                    <Route exact path="/" component={MainTable} />
                    <Route path="/login" component={LoginForm} />
                    {/* <Route path="/report" component={Report} /> */}
                    <Route component={NotFound} />
                </Switch>
            </div>
        </Router>

    )
}                        