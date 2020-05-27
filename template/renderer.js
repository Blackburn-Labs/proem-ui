import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';

import theme from './css/theme';
import store from './store';

import App from './pages/App';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import InvalidState from './pages/InvalidState';

// Prevent default browser loading of drag & drop files.
// eslint-disable-next-line no-multi-assign
document.ondragover = document.ondrop = (ev) => ev.preventDefault;
document.body.ondrop = (ev) => ev.preventDefault;


ReactDOM.render((
    <Provider store={store}>
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <App>
                    <Switch>
                        <Route path="/" component={Dashboard} exact />
                        <Route path="/about" component={About} />
                        <Route component={InvalidState} />
                    </Switch>
                </App>
            </Router>
        </MuiThemeProvider>
    </Provider>
), document.getElementById('app'));
