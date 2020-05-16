import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Paper, Collapse } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { Message } from '../../domain';
import {
    ErrorIcon, WarnIcon, InfoIcon, SuccessIcon,
} from '../../utils/Icons';

const styles = (theme) => ({
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
        color: theme.palette.error.contrastText,
        textAlign: 'center',
        display: 'block',
    },
    warning: {
        margin: 0,
        padding: '1em',
        backgroundColor: theme.palette.warning.main,
        color: theme.palette.warning.contrastText,
        textAlign: 'center',
        display: 'block',
    },
    info: {
        margin: 0,
        padding: '1em',
        backgroundColor: theme.palette.info.main,
        color: theme.palette.info.contrastText,
        textAlign: 'center',
        display: 'block',
    },
    success: {
        margin: 0,
        padding: '1em',
        backgroundColor: theme.palette.success.main,
        color: theme.palette.success.contrastText,
        textAlign: 'center',
        display: 'block',
    },
});

class MessageBox extends Component {
    static propTypes = {
        message: PropTypes.instanceOf(Message).isRequired,
        icon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
        enabled: PropTypes.bool,
        className: PropTypes.string,
        classes: PropTypes.object,
    };

    static defaultProps = {
        icon: undefined,
        enabled: true,
        className: null,
        classes: {},
    };

    render() {
        const {
            message, icon, className, classes, enabled,
        } = this.props;
        const { title, type, details } = message;

        let myIcon = icon;
        let myClass = classes.root;

        switch (type) {
            case 'error':
            case 'err': {
                myIcon = <ErrorIcon className={classes.icon} data-html2canvas-ignore />;
                myClass = classes.error;
                break;
            }
            case 'warning':
            case 'warn': {
                myIcon = <WarnIcon className={classes.icon} data-html2canvas-ignore />;
                myClass = classes.warning;
                break;
            }
            case 'message':
            case 'info': {
                myIcon = <InfoIcon className={classes.icon} data-html2canvas-ignore />;
                myClass = classes.info;
                break;
            }
            case 'success':
            case 'suc': {
                myIcon = <SuccessIcon className={classes.icon} data-html2canvas-ignore />;
                myClass = classes.success;
                break;
            }
            default: {
                myIcon = <ErrorIcon className={classes.icon} data-html2canvas-ignore />;
                myClass = classes.error;
            }
        }

        return (
            <Collapse in={enabled}>
                <Paper className={classnames([className, myClass])} elevation={3}>
                    <div className={classes.messageText}>
                        {myIcon}
                        {title}
                    </div>
                    {(details === undefined || details === '') ? '' : <div>{details}</div>}
                </Paper>
            </Collapse>
        );
    }
}

export default withStyles(styles)(MessageBox);
