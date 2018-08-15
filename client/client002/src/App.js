import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import MainTable from './components/MainTable'
import Report from './components/Report';
import PageHeader from './components/PageHeader';
import NotFound from './components/NotFound'

export default function App() {
    return (

        <Router>
            <div>
                <PageHeader />
                <Switch>
                    <Route exact path="/" component={MainTable} />
                    <Route path="/report" component={Report} />
                    <Route component={NotFound} />
                </Switch>
            </div>
        </Router>

    )
}                        