import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AppliedRoute from './components/AppliedRoute';
import Home from './containers/Home';
import Signup from './containers/Signup';
import Login from './containers/Login';
import NotFound from './containers/NotFound';

export default function Routes({ appProps }) {
    return (
        <Switch>
            <AppliedRoute path='/' exact component={ Home } appProps={ appProps }/>
            <AppliedRoute path='/login' exact component={ Login } appProps={ appProps }/>
            <AppliedRoute path='/signup' exact component={ Signup } appProps={ appProps }/>
            { /* Finally, NotFound catches all unmatched routes */ }
            <Route component={ NotFound } />
        </Switch>
    );
}