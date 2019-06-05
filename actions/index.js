import { bindActionCreators } from 'redux';
import axios from 'axios';
import Config from 'Config';

import SessionUtils from '../utils/SessionUtils';

import * as AppStateActions from './appStateActions';
import * as UserActions from './userActions';

axios.defaults.withCredentials = true;

/**
 * An object of all the actions that will be bound inside the `Actions` object
 */
const actionsToBind = {
    AppStateActions,
    UserActions,
};

export default class Actions {
    constructor(dispatch) {
        this.dispatch = dispatch;
        const boundActions = this.generateBoundAction();
        Object.keys(boundActions).forEach(key => (this[key] = boundActions[key]));
    }

    clone = () => new Actions(this.dispatch);

    generateBoundAction = () => {
        const a2b = { ...actionsToBind };
        Object.keys(a2b).forEach(key => (a2b[key] = bindActionCreators(a2b[key], this.dispatch)));
        return a2b;
    };
}

/** A function that creates a action provider, used within a react-redux `connect` injection call **/
export const actionProvider = dispatch => ({ actions: new Actions(dispatch) });

/** A function to help action functions get the HTTP header to the backend server. **/
export function generateHeader() {
    const h = {
        'Content-Type': 'application/json',
        'X-Parse-Application-Id': Config.apiId,
        'X-Parse-JavaScript-Key': Config.apiKey,
        'X-Parse-Revocable-Session': 1,
    };

    const token = SessionUtils.token();
    if (token != null) {
        h['X-Parse-Session-Token'] = token;
    }

    return h;
}

/** Convenience function for quickly making promises for action function to return **/
export function asPromise(packet) {
    return dispatcher => new Promise((resolve) => {
        dispatcher(packet);
        resolve();
    });
}
