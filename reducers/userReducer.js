import { User } from '../domain';
import SessionUtils from '../utils/SessionUtils';

const initState = {
    user: new User(),
    isAuthenticating: false,
    isAuthenticated: false,
};

const baseName = 'USER';

export default function reducer(state = initState, action) {
    // If any request comes back w/status code 401 or 403, clear session.
    if (
        action.payload != null
        && action.payload.response != null
        && (action.payload.response.status === 401 || action.payload.response.status === 403)
    ) {
        SessionUtils.clear();
        return { ...initState };
    }

    switch (action.type) {
        case `${baseName}_LOGOUT`:
        case `${baseName}_LOGIN_REJECTED`: {
            SessionUtils.clear();
            return { ...initState };
        }

        case `${baseName}_LOGIN_RENDING`: {
            return { ...state, isAuthenticating: true, isAuthenticated: false };
        }

        case `${baseName}_LOGIN_FULFILLED`: {
            const { data } = action.payload;
            const user = new User(data);
            SessionUtils.set(user);
            return {
                ...state,
                user,
                isAuthenticating: false,
                isAuthenticated: true,
            };
        }

        case `${baseName}_RESTORE`: {
            const user = SessionUtils.get();
            if (user) {
                return {
                    ...state,
                    user,
                    isAuthenticated: (user.sessionToken != null),
                    isAuthenticating: false,
                };
            }

            SessionUtils.clear();
            return { ...initState };
        }

        default: {
            return state;
        }
    }
}
