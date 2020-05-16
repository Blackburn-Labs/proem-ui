/* eslint-disable react/jsx-props-no-spreading, react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const propTypes = {
    component: PropTypes.any.isRequired,
    isAuthenticated: PropTypes.bool,
};

const defaultProps = {
    isAuthenticated: false,
};

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
    <Route
        {...rest}
        render={(props) => (
            isAuthenticated
                ? <Component {...props} />
                : <Redirect to="/login" />
        )}
    />
);

PrivateRoute.propTypes = propTypes;
PrivateRoute.defaultProps = defaultProps;
export default connect((store) => ({
    isAuthenticated: store.user.isAuthenticated,
}))(PrivateRoute);
