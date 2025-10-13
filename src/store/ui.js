import { createSelector } from '@reduxjs/toolkit';
import { Parse } from '../utils/parseProvider.js';

// Action type constants
const PING = 'PING';
const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION';
const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';
const CLEAR_ALL_NOTIFICATIONS = 'CLEAR_ALL_NOTIFICATIONS';

const initialState = {
    notifications: [],
    isConnected: true,
    error: null,
};

// Helper function to generate unique IDs
const generateNotificationId = () => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export function reducer(inboundState = initialState, action) {
    const { type, payload } = action;
    let state = inboundState;

    if (type?.endsWith('_REJECTED') && state.isConnected && payload.code === 100) {
        state = { ...inboundState, isConnected: false };
    } else if (type?.endsWith('_FULFILLED') && !state.isConnected) {
        state = { ...inboundState, isConnected: true };
    }

    switch (type) {
    case 'LOGOUT_USER_PENDING':
    case 'DELETE_USER_PENDING': {
        return initialState;
    }

    case `${SHOW_NOTIFICATION}_PENDING`: {
        return {
            ...state,
            error: null,
        };
    }

    case `${SHOW_NOTIFICATION}_FULFILLED`: {
        const notification = {
            id: generateNotificationId(),
            message: payload.message,
            severity: payload.severity || 'info',
            autoHideDuration: payload.autoHideDuration !== undefined ? payload.autoHideDuration : 6000,
            ...payload, // Include any other options passed
        };

        return {
            ...state,
            notifications: [...state.notifications, notification],
            error: null,
        };
    }

    case `${SHOW_NOTIFICATION}_REJECTED`: {
        return {
            ...state,
            error: payload?.message || 'Failed to show notification',
        };
    }

    case `${REMOVE_NOTIFICATION}_PENDING`: {
        return {
            ...state,
            error: null,
        };
    }

    case `${REMOVE_NOTIFICATION}_FULFILLED`: {
        return {
            ...state,
            notifications: state.notifications.filter(notification => notification.id !== payload),
            error: null,
        };
    }

    case `${REMOVE_NOTIFICATION}_REJECTED`: {
        return {
            ...state,
            error: payload?.message || 'Failed to remove notification',
        };
    }

    case `${CLEAR_ALL_NOTIFICATIONS}_PENDING`: {
        return {
            ...state,
            error: null,
        };
    }

    case `${CLEAR_ALL_NOTIFICATIONS}_FULFILLED`: {
        return {
            ...state,
            notifications: [],
            error: null,
        };
    }

    case `${CLEAR_ALL_NOTIFICATIONS}_REJECTED`: {
        return {
            ...state,
            error: payload?.message || 'Failed to clear notifications',
        };
    }

    default: {
        return state;
    }
    }
}

export const actions = {
    showSuccess: (options) => ({
        type: SHOW_NOTIFICATION,
        meta: { severity: 'success', ...options },
        payload: Promise.resolve({ severity: 'success', ...options }),
    }),

    showError: (options) => ({
        type: SHOW_NOTIFICATION,
        meta: { severity: 'error', ...options },
        payload: Promise.resolve({ severity: 'error', ...options }),
    }),

    showWarning: (options) => ({
        type: SHOW_NOTIFICATION,
        meta: { severity: 'warning', ...options },
        payload: Promise.resolve({ severity: 'warning', ...options }),
    }),

    showInfo: (options) => ({
        type: SHOW_NOTIFICATION,
        meta: { severity: 'info', ...options },
        payload: Promise.resolve({ severity: 'info', ...options }),
    }),

    removeNotification: (id) => ({
        type: REMOVE_NOTIFICATION,
        meta: { id },
        payload: Promise.resolve(id),
    }),

    clearAll: () => ({
        type: CLEAR_ALL_NOTIFICATIONS,
        payload: Promise.resolve(null),
    }),

    /** Health check ping to API **/
    ping: () => ({ type: PING, payload: Parse.Cloud.run('ping') }),
};

export const selectors = {
    activeNotifications: (state) => state.ui.notifications,
    isConnected: (state) => state.ui.isConnected,

    notificationCount: createSelector(
        [(state) => state.ui.notifications],
        (notifications) => notifications.length,
    ),

    error: (state) => state.ui.error,
};

export default reducer;
