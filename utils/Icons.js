import React from 'react';
import SvgIcon from 'material-ui/SvgIcon';

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

export const ErrorIcon = (props) => (
  <SvgIcon {...props}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
  </SvgIcon>
);

export const CloseIcon = (props) => (
  <SvgIcon {...props}>
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  </SvgIcon>
);

export const HomeIcon = (props) => (
  <SvgIcon {...props}>
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </SvgIcon>
);

export const InfoIcon = (props) => (
  <SvgIcon {...props}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
  </SvgIcon>
);

