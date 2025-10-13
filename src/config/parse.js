import Parse from 'parse';

/**
 * [PARSE]
 * Initialize Parse SDK
 */
const initializeParse = () => {
    const appId = process.env.PARSE_APP_ID || 'myAppId';
    const jsKey = process.env.PARSE_JS_KEY || 'myJSKey';
    const serverURL = process.env.PARSE_SERVER_URL || 'http://localhost:1337/api';

    Parse.initialize(appId, jsKey);
    Parse.serverURL = serverURL;
};

export default initializeParse;
