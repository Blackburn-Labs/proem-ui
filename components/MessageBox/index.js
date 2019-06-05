import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Paper, Collapse } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { Message } from '../../domain';
import { ErrorIcon, WarnIcon, InfoIcon } from '../../utils/Icons';





const styles = theme => ({
    root: {},
    messageText: {
        display: 'inline-block',
        fontWeight: 400,
        lineHeight: '24px',
        fontSize: 20,
        verticalAlign: 'top',
        marginBottom: 8,
    },
    icon: {
        float: 'left',
        marginRight: '0.25em',
    },
    error: {
        margin: 0,
        padding: '1em',
        backgroundColor: theme.palette.error.main,
        borderLeftColor: theme.palette.error.dark,
        borderLeftStyle: 'solid',
        borderLeftWidth: 16,
        color: theme.palette.error.contrastText,
        textAlign: 'center',
        display: 'block',
    },
    warn: {
        margin: 0,
        padding: '1em',
        backgroundColor: theme.palette.warning.main,
        borderLeftColor: theme.palette.warning.dark,
        borderLeftStyle: 'solid',
        borderLeftWidth: 16,
        color: theme.palette.warning.contrastText,
        textAlign: 'center',
        display: 'block',
    },
    info: {
        margin: 0,
        padding: '1em',
        backgroundColor: theme.palette.info.main,
        borderLeftColor: theme.palette.info.dark,
        borderLeftStyle: 'solid',
        borderLeftWidth: 16,
        color: theme.palette.info.contrastText,
        textAlign: 'center',
        display: 'block',
    },
});

const propTypes = {
    message: PropTypes.instanceOf(Message).isRequired,
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    enabled: PropTypes.bool,
    className: PropTypes.any,
    classes: PropTypes.object,
};

const defaultProps = {
    message: '',
    details: '',
    icon: undefined,
    type: 'message',
    enabled: true,
    classes: {},
};

class MessageBox extends Component {
    render() {
        const { message, icon, className, classes, enabled } = this.props;
        const { title, type, details } = message;

        let myIcon = icon;
        let myClass = classes.root;

        if (type === undefined || type === 'error' || type === 'ERR') {
            myIcon = <ErrorIcon className={classes.icon} data-html2canvas-ignore />;
            myClass = classes.error;
        } else if (type === 'warn' || type === 'ISS') {
            myIcon = <WarnIcon className={classes.icon} data-html2canvas-ignore />;
            myClass = classes.warn;
        } else if (type === 'message' || type === 'OBS') {
            myIcon = <InfoIcon className={classes.icon} data-html2canvas-ignore />;
            myClass = classes.info;
        }

        return (
            <Collapse in={enabled}>
                <Paper className={classnames([className, myClass])} elevation={3}>
                    <div className={classes.messageText}>{myIcon}{title}</div>
                    {(details === undefined || details === '') ? '' : <div>{details}</div>}
                </Paper>
            </Collapse>
        );
    }
}

MessageBox.propTypes = propTypes;
MessageBox.defaultProps = defaultProps;
export default withStyles(styles)(MessageBox);
