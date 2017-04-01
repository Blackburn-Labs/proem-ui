import React from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';

import { changeTitle } from '../../actions/appStateActions';

@connect()
export default class Dashboard extends React.Component {

  componentWillMount() {
    this.props.dispatch(changeTitle('About'));
  }

  render() {
    const content = (
      <div>
        <h2>Learn more about Proem</h2>
        <ul>
          <li><a href="https://github.com/rwblackburn/proem-ui">Proem UI Home Page</a></li>
          <li><a href="https://github.com/rwblackburn/proem-server">Proem Server Home Page</a></li>
        </ul>
      </div>
    );

    return (
      <Paper className="page" zDepth={1}>
        {content}
      </Paper>
    );
  }
}
