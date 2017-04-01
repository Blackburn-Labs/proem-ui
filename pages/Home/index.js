import React from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';

// noinspection JSUnresolvedVariable
import styles from './styles.css';

import { changeTitle } from '../../actions/appStateActions';

@connect()
export default class Home extends React.Component {

  componentWillMount() {
    this.props.dispatch(changeTitle('Home'));
  }

  render() {
    const content = (
      <div className={styles.welcome}>
        <h2>Welcome to Proem UI</h2>
        Congratulations! You have successfully installed and executed the app.
      </div>
    );

    return (
      <Paper className="page" zDepth={1}>
        {content}
      </Paper>
    );
  }
}
