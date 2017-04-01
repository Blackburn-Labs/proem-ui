import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';

import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import store from './store';
import App from './pages/App';
import About from './pages/About';
import Home from './pages/Home';
import InvalidState from './pages/InvalidState';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// If user reloads app, restart them from the beginning
window.onbeforeunload = function handleBeforeUnload() {
  function handleReturnHome() {
    window.location = location.href;
  }

  window.setTimeout(handleReturnHome, 0);
  window.onbeforeunload = null; // necessary to prevent infinite loop, that kills your browser
};

// Prevent default browser loading of drag & drop files.
document.ondragover = document.ondrop = (ev) => {
  ev.preventDefault();
};

document.body.ondrop = (ev) => {
  ev.preventDefault();
};

ReactDOM.render((
  <Provider store={store}>
    <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
      <Router history={hashHistory}>
        <Route component={App}>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="*" component={InvalidState} />
        </Route>
      </Router>
    </MuiThemeProvider>
  </Provider>

), document.getElementById('app'));
