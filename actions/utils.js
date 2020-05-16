import Config from 'Config';

import SessionUtils from '../utils/SessionUtils';

/** A function to help action functions get the HTTP header to the backend server. * */
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

/** Convenience function for quickly making promises for action function to return * */
export function asPromise(packet) {
    return () => new Promise((resolve) => {
        resolve(packet);
    });
}
