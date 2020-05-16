import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
    Paper,
    Typography,
    withStyles,
} from '@material-ui/core';

import Actions, { actionProvider } from '../../actions';

const styles = (theme) => ({
    root: {
        padding: theme.spacing(2),
        textAlign: 'center',
        margin: theme.spacing(2),
    },
});

const propMap = (store) => ({
    user: store.user.user,
});

class Dashboard extends Component {
    static propTypes = {
        actions: PropTypes.instanceOf(Actions).isRequired,
        classes: PropTypes.object.isRequired,
    };

    static defaultProps = {
    };

    componentDidMount() {
        const { actions: { AppStateActions } } = this.props;
        AppStateActions.setTitle('Dashboard');
    }

    render() {
        const {
            classes,
        } = this.props;

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
