import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

/**
 * To add new icons:
 *     - Duplicate one of the SvgIcons elements below.
 *     - Go to: https://material.io/icons/ and find the SVG you want (or find an SVG icon from
 *       some other source)
 *     - Download the SVG, and view its source code (open it in a text editor, or if it opened in
 *       a browser, right-click and view source).
 *     - Find the <path> node that contains the icons path you want. Copy and paste it into your
 *       new SvgIcon.
 *
 * Using these icons are easy. Just include them as such:
 *     import { CloseIcon, ErrorIcon } from '../utils/Icons';
 * Then you can use them in our content like this:
 *     <CloseIcon /> or <ErrorIcon />
 *
 */

export const MenuIcon = props => (
    <SvgIcon {...props}>
        <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
    </SvgIcon>
);

export const ErrorIcon = props => (
    <SvgIcon {...props}>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
    </SvgIcon>
);

export const CloseIcon = props => (
    <SvgIcon {...props}>
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
    </SvgIcon>
);

export const HomeIcon = props => (
    <SvgIcon {...props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
);

export const InfoIcon = props => (
    <SvgIcon {...props}>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
    </SvgIcon>
);

export const WarnIcon = props => (
    <SvgIcon {...props}>
        <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
    </SvgIcon>
);

export const LockIcon = props => (
    <SvgIcon {...props}>
        <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
    </SvgIcon>
);
