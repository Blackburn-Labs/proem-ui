/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import Config from 'Config';

import { asPromise, generateHeader } from './utils';

const baseUrl = Config.apiUrl;
const baseName = 'USER';

export function logIn(u, p) {
    const headers = generateHeader();
    return {
        type: `${baseName}_LOGIN`,
        payload: axios.get(`${baseUrl}/login?username=${u}&password=${p}`, { headers }),
    };
}

export function logOut() {
    return {
        type: `${baseName}_LOGOUT`,
        payload: asPromise({}),
    };
}

export function logRestore() {
    return {
        type: `${baseName}_LOGIN_RESTORE`,
        payload: asPromise({}),
    };
}
