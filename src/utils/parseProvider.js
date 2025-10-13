import Parse from 'parse';

const initialize = () => {
    const appId = process.env.PARSE_APP_ID || 'YOUR_APP_ID';
    const jsKey = process.env.PARSE_JS_KEY || 'YOUR_JS_KEY';
    const serverURL = process.env.PARSE_SERVER_URL || 'http://localhost:1234/api';

    Parse.initialize(appId, jsKey);
    Parse.serverURL = serverURL;

    if (process.env.NODE_ENV === 'development') {
        console.warn('Parse initialized with:', { appId, serverURL });
    }
};

initialize();

export { Parse, initialize };
