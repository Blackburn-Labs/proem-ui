import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Paper, Typography, withStyles } from '@material-ui/core';

import Actions, { actionProvider } from '../../actions';

const styles = theme => ({
    root: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
    },
});

const propMap = () => ({});

class Dashboard extends Component {
    static propTypes = {
        actions: PropTypes.instanceOf(Actions),
        classes: PropTypes.object.isRequired,
    };

    static defaultProps = {};

    state = {};

    componentWillMount() {
        const { actions: { AppStateActions } } = this.props;
        AppStateActions.setTitle('Home');
    }

    render() {
        const { classes } = this.props;

        return (
            <Paper className={classes.root} elevation={1}>
                <Typography variant="h2">
                    Welcome to Proem UI
                </Typography>
                <Typography paragraph>
                    Congratulations! You have successfully installed and executed the app.
                </Typography>
            </Paper>
        );
    }
}

export default withRouter(connect(propMap, actionProvider)(withStyles(styles)(Dashboard)));
