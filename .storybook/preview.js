import React from "react";
import { addDecorator } from '@storybook/react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../css/theme';
import '../css/app.css';

createMuiTheme(theme);

addDecorator((storyFn) => <MuiThemeProvider theme={theme}>{storyFn()}</MuiThemeProvider>);
