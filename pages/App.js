/* eslint-disable jsx-a11y/anchor-has-content */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    AppBar,
    Drawer,
    IconButton,
    Typography,
    Toolbar,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    withStyles,
} from '@material-ui/core';

import Actions, { actionProvider } from '../actions';
import { Message, MessageArray } from '../domain';
import {
    CloseIcon, InfoIcon, MenuIcon, HomeIcon,
} from '../utils/Icons';
import MessageBox from '../components/MessageBox';

const styles = (theme) => ({
    content: {
        overflowY: 'auto',
        overflowX: 'hidden',
        width: '100%',
        position: 'absolute',
        zIndex: '-1',
        bottom: 0,
        top: 64,
        padding: 0,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        paddingTop: theme.spacing(2),
        justifyContent: 'flex-end',
    },
    errorMsg: {
        margin: theme.spacing(),
    },
});

const propMap = (store) => ({
    errors: store.appState.errors,
    title: store.appState.title,
});

class App extends Component {
    static propTypes = {
        title: PropTypes.string,
        errors: PropTypes.instanceOf(MessageArray),
        children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.node),
            PropTypes.node,
        ]).isRequired,
        history: PropTypes.shape({
            push: PropTypes.func.isRequired,
        }).isRequired,
        actions: PropTypes.instanceOf(Actions).isRequired,
        classes: PropTypes.object.isRequired,
    };

    static defaultProps = {
        title: '',
        errors: new MessageArray(),
    };

    state = {
        open: false,
    };

    componentDidMount() {
        const { actions: { UserActions, AppStateActions } } = this.props;
        UserActions.logRestore();

        window.onerror = (message, url, lineNumber, colNumber, error) => {
            const errorObject = new Message({
                title: 'Client Error',
                details: message,
                source: { error, lineNumber, colNumber },
            });
            AppStateActions.errorFound(errorObject);
            return false;
        };
    }

    closeMenu = () => this.setState({ open: false });

    openMenu = () => this.setState({ open: true });

    handleGoHome = () => {
        this.go('/');
    };

    handleGoAbout = () => {
        this.go('/about');
    };

    go = (path) => {
        const { history } = this.props;
        history.push(path);
        this.closeMenu();
    };

    render() {
        const {
            title, errors, children, classes,
        } = this.props;
        const { open } = this.state;
        return (
            <>
                <Drawer
                    open={open}
                    onClose={this.closeMenu}
                >
                    <div className={classes.drawerHeader}>
                        <IconButton color="inherit" onClick={this.closeMenu}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                    <List>
                        <ListItem button key="Dashboard" onClick={this.handleGoHome}>
                            <ListItemIcon><HomeIcon /></ListItemIcon>
                            <ListItemText primary="Dashboard" />
                        </ListItem>
                        <ListItem button key="About" onClick={this.handleGoAbout}>
                            <ListItemIcon><InfoIcon /></ListItemIcon>
                            <ListItemText primary="About" />
                        </ListItem>
                    </List>
                </Drawer>
                <AppBar position="static" color="primary">
                    <Toolbar>
                        <IconButton color="inherit" onClick={this.openMenu}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" style={{ flexGrow: 1 }}>
                            {title}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <div className={classes.content}>
                    {errors.map((e) => (
                        <MessageBox
                            key={e.id}
                            className={classes.errorMsg}
                            message={e}
                            enabled={e.getSecondsOld() < 6}
                        />
                    ))}
                    {children}
                </div>
            </>
        );
    }
}

export default withRouter(connect(propMap, actionProvider)(withStyles(styles)(App)));
