import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Typography, withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

import Actions, { actionProvider } from '../../actions';
import MessageBox from '../../components/MessageBox';
import { Message } from '../../domain';

const styles = (theme) => ({
    root: {
        padding: theme.spacing(2),
        textAlign: 'center',
    },
});

const propMap = () => ({});

class About extends Component {
    static propTypes = {
        actions: PropTypes.instanceOf(Actions).isRequired,
        classes: PropTypes.object.isRequired,
    };

    static defaultProps = {};

    state = {};

    componentDidMount() {
        const { actions: { AppStateActions } } = this.props;
        AppStateActions.setTitle('About');
    }

    render() {
        const { classes } = this.props;

        return (
            <Paper className={classes.root} elevation={3}>
                <Typography variant="h2">
                    About
                </Typography>
                <MessageBox
                    message={new Message({
                        title: 'Reminder',
                        details: 'Add your app\'s information and support links here.',
                    })}
                />
            </Paper>
        );
    }
}

export default withRouter(connect(propMap, actionProvider)(withStyles(styles)(About)));
