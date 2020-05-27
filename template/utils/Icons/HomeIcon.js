/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

export default (props) => (
    <SvgIcon {...props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
);
