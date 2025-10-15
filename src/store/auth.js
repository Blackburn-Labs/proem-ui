import { Parse } from '../utils/parseProvider';

// Action type constants
const LOGIN = 'LOGIN_USER';
const LOGOUT = 'LOGOUT_USER';
const DELETE_USER = 'DELETE_USER';
const SIGNUP = 'ADD_USER';
const RESET_PASSWORD = 'RESET_PASSWORD';
const RESTORE = 'RESTORE_USER';
const SET_PASSWORD = 'SET_USER_PASSWORD';
const CLEAR_ERROR = 'CLEAR_AUTH_ERROR';
const SET_USER = 'SET_USER';

const initialState = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    isLoaded: false,
    error: null,
    signupSuccess: false,
    resetPasswordSuccess: false,
};

export function reducer(state = initialState, action) {
    const { type, payload } = action;

    // Status code 209 is a special code from Parse, used when the session is invalid or expired.
    // The sessionMiddleware will handle logging out from Parse and showing notification
    if (payload?.code === 209) {
        return {
            ...initialState,
            error: 'Session expired',
        };
    }

    switch (type) {
    case CLEAR_ERROR: {
        return {
            ...state,
            error: null,
            signupSuccess: false,
            resetPasswordSuccess: false,
        };
    }

    case SET_USER: {
        return {
            ...state,
            user: payload ? {
                id: payload.id,
                ...payload.attributes,
            } : null,
            isAuthenticated: !!payload,
        };
    }

    case `${LOGIN}_PENDING`: {
        return {
            ...state,
            isLoading: true,
            error: null,
        };
    }

    case RESTORE:
    case `${LOGIN}_FULFILLED`: {
        if (!payload) {
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                isLoading: false,
                isLoaded: true,
            };
        }

        // Check if user has a valid session token
        // getSessionToken() returns undefined for unverified users
        const hasValidSession = payload.getSessionToken && payload.getSessionToken();

        if (!hasValidSession) {
            // User exists in localStorage but no valid session
            // This happens for unverified email signups
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                isLoading: false,
                isLoaded: true,
                error: null,
            };
        }

        return {
            ...state,
            user: payload,
            isAuthenticated: true,
            isLoading: false,
            isLoaded: true,
            error: null,
        };
    }

    case `${LOGOUT}_PENDING`:
    case `${LOGIN}_REJECTED`: {
        return {
            ...state,
            user: null,
            isAuthenticated: false,
            isLoading: false,
            isLoaded: true,
            error: payload?.message || 'Login failed',
        };
    }

    case `${LOGOUT}_FULFILLED`:
    case `${LOGOUT}_REJECTED`:
    case `${DELETE_USER}_FULFILLED`:
    case `${DELETE_USER}_REJECTED`: {
        return initialState;
    }

    case `${SIGNUP}_PENDING`: {
        return {
            ...state,
            isLoading: true,
            error: null,
        };
    }

    case `${SIGNUP}_FULFILLED`: {
        return {
            ...state,
            user: null,
            isAuthenticated: false,
            isLoading: false,
            isLoaded: true,
            error: null,
            signupSuccess: true,
        };
    }

    case `${SIGNUP}_REJECTED`: {
        return {
            ...state,
            user: null,
            isAuthenticated: false,
            isLoading: false,
            isLoaded: true,
            error: payload?.message || 'Signup failed',
            signupSuccess: false,
        };
    }

    case `${RESET_PASSWORD}_PENDING`: {
        return {
            ...state,
            isLoading: true,
            error: null,
        };
    }

    case `${RESET_PASSWORD}_FULFILLED`: {
        return {
            ...state,
            isLoading: false,
            error: null,
            resetPasswordSuccess: true,
        };
    }

    case `${RESET_PASSWORD}_REJECTED`: {
        return {
            ...state,
            isLoading: false,
            error: payload?.message || 'Password reset failed',
        };
    }

    case `${SET_PASSWORD}_PENDING`: {
        return {
            ...state,
            isLoading: true,
            error: null,
        };
    }

    case `${SET_PASSWORD}_FULFILLED`: {
        return {
            ...state,
            isLoading: false,
            error: null,
        };
    }

    case `${SET_PASSWORD}_REJECTED`: {
        return {
            ...state,
            isLoading: false,
            error: payload?.message || 'Password update failed',
        };
    }

    default: {
        return state;
    }
    }
}

export const actions = {
    login: (credentials) => ({
        type: LOGIN,
        meta: { credentials },
        payload: Parse.User.logIn(credentials.username, credentials.password),
    }),

    logout: () => ({
        type: LOGOUT,
        payload: Parse.User.logOut(),
    }),

    signup: (credentials) => {
        const user = new Parse.User();
        user.set('username', credentials.username);
        user.set('password', credentials.password);
        user.set('email', credentials.email);

        return {
            type: SIGNUP,
            meta: { credentials },
            payload: user.signUp(),
        };
    },

    googleSignup: (credentials) => ({
        type: LOGIN,
        meta: { credentials },
        payload: new Parse.User({ email: decodeGoogleIdToken(credentials.credential)?.email, username: decodeGoogleIdToken(credentials.credential)?.email }).linkWith('google', { authData: {
            id: decodeGoogleIdToken(credentials.credential)?.id,
            id_token: credentials.credential,
            access_token: credentials.access_token || null,
        } }),
    }),

    googleLogin: (credentials) => ({
        type: LOGIN,
        meta: { credentials },
        payload: Parse.User.logInWith('google', { authData: {
            id: decodeGoogleIdToken(credentials.credential)?.id,
            id_token: credentials.credential,
            access_token: credentials.access_token || null,
        } }),
    }),

    resetPassword: (resetData) => ({
        type: RESET_PASSWORD,
        meta: { email: resetData.email },
        payload: Parse.User.requestPasswordReset(resetData.email),
    }),

    restore: () => ({
        type: RESTORE,
        payload: Parse.User.current(),
    }),

    become: (sessionToken) => ({
        type: LOGIN,
        meta: { sessionToken },
        payload: Parse.User.become(sessionToken),
    }),

    setPassword: (newPassword) => {
        const currentUser = Parse.User.current();
        if (!currentUser) {
            return {
                type: SET_PASSWORD,
                meta: { newPassword },
                payload: Promise.reject(new Error('No user logged in')),
            };
        }
        currentUser.set('password', newPassword);

        return {
            type: SET_PASSWORD,
            meta: { newPassword },
            payload: currentUser.save(),
        };
    },

    clearError: () => ({
        type: CLEAR_ERROR,
        payload: Promise.resolve(null),
    }),

    setUser: (user) => ({
        type: SET_USER,
        meta: { user },
        payload: Promise.resolve(user),
    }),

    delete: () => ({
        type: DELETE_USER,
        payload: Parse.Cloud.run('deleteUser'),
    }),
};

export const selectors = {
    me: (state) => state.auth.user,
    isAuthenticated: (state) => state.auth.isAuthenticated,
    isLoading: (state) => state.auth.isLoading,
    isLoaded: (state) => state.auth.isLoaded,
    error: (state) => state.auth.error,
    signupSuccess: (state) => state.auth.signupSuccess,
    resetPasswordSuccess: (state) => state.auth.resetPasswordSuccess,
};

export default reducer;
