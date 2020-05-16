import Config from 'Config';

import { MessageArray, Message } from '../domain';

const initState = {
    title: '',
    errors: new MessageArray(),
};

export default function reducer(state = initState, action) {
    if (action.type.includes('_REJECTED') || action.type.includes('ERROR_')) {
        const errors = state.errors.clone();
        let title = action.payload.title || action.payload.message;
        const { details } = action.payload;

        if (action.type === 'USER_LOGIN_REJECTED') {
            title = 'Login Failed';
        } else if (action.payload != null && action.payload.response != null) {
            switch (action.payload.response.status) {
                case 400:
                case 406: {
                    title = 'Bad Connection';
                    break;
                }

                case 401:
                case 403: {
                    title = 'Login Session Expire or Invalid';
                    break;
                }

                case 404: {
                    title = 'Object Not Found';
                    break;
                }

                case 500: {
                    title = 'Server Error';
                    break;
                }

                case 502:
                case 503:
                case 504: {
                    title = 'Server Unavailable';
                    break;
                }

                default: {
                    title = `Unknown Error (${action.payload.response.status})`;
                }
            }
        }

        const message = new Message({
            title, details, source: action.payload, type: 'error',
        });
        errors.add(message);

        if (Config.isDebugging) {
            // eslint-disable-next-line no-console
            console.error(message);
        }

        return {
            ...state,
            errors,
        };
    }

    switch (action.type) {
        case 'SET_TITLE': {
            return { ...state, ...action.payload };
        }

        default: {
            return state;
        }
    }
}
