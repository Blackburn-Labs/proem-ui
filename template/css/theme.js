import { createMuiTheme } from '@material-ui/core/styles';

const themeName = 'Default Theme';

const typography = {
    useNextVariants: true,
};

const error = {
    light: '#e18c88',
    main: '#d2504b',
    dark: '#a72e2a',
    contrastText: '#fff',
};

const warning = {
    light: '#f5ce97',
    main: '#eead51',
    dark: '#dd8a16',
    contrastText: '#fff',
};
const info = {
    light: '#56cbd4',
    main: '#2da7b0',
    dark: '#1d6d73',
    contrastText: '#fff',
};

const success = {
    light: '#9ad69a',
    main: '#64c064',
    dark: '#3e993e',
    contrastText: '#fff',
};

const palette = {
    type: 'light',
    primary: {
        light: '#c34cd7',
        main: '#9c27b0',
        dark: '#641971',
        contrastText: '#fff',
    },
    secondary: {
        light: '#9ad69a',
        main: '#64c064',
        dark: '#3e993e',
        contrastText: '#fff',
    },
    error,
    warning,
    info,
    success,
};

export default createMuiTheme({ typography, palette, themeName });
