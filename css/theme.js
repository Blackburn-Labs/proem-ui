import { createMuiTheme } from '@material-ui/core/styles';

const themeName = 'Default Theme';

const typography = {
    useNextVariants: true,
};

const error = {
    light: 'rgb(229, 57, 53, 0.33)',
    main: 'rgb(229, 57, 53, 0.66)',
    dark: 'rgb(229, 57, 53)',
    contrastText: '#fff',
};

const warning = {
    light: 'rgb(251, 140, 0, 0.33)',
    main: 'rgb(251, 140, 0, 0.66)',
    dark: 'rgb(251, 140, 0)',
    contrastText: '#fff',
};
const info = {
    light: 'rgb(0, 202, 227, 0.333)',
    main: 'rgb(0, 202, 227, 0.66)',
    dark: 'rgb(0, 202, 227)',
    contrastText: '#fff',
};

const palette = {
    type: 'light',
    primary: { main: 'rgb(156, 39, 176)' },
    secondary: { main: 'rgb(67, 160, 71)' },
    error,
    warning,
    info,
};

export default createMuiTheme({ typography, palette, themeName });
