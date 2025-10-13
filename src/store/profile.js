import { createSelector } from '@reduxjs/toolkit';
import { Parse } from '../utils/parseProvider';
import { Profile } from '../domain';

// Action type constants
const GET = 'GET_PROFILE';
const CREATE = 'CREATE_PROFILE';
const UPDATE = 'UPDATE_PROFILE';
const CLEAR = 'CLEAR_PROFILE';

const initialState = {
    data: null,
    isLoading: false,
    isLoaded: false,
    error: null,
};

export function reducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
    case 'LOGOUT_USER_PENDING':
    case 'DELETE_USER_PENDING':
    case `${CLEAR}_PENDING`: {
        return initialState;
    }

    case `${GET}_PENDING`: {
        return {
            ...state,
            isLoading: true,
            error: null,
        };
    }

    case `${GET}_FULFILLED`: {
        return {
            ...state,
            data: payload,
            isLoading: false,
            isLoaded: true,
            error: null,
        };
    }

    case `${GET}_REJECTED`: {
        return {
            ...state,
            data: null,
            isLoading: false,
            isLoaded: true,
            error: payload?.message || 'Failed to fetch profile',
        };
    }

    case `${CREATE}_PENDING`: {
        return {
            ...state,
            isLoading: true,
            error: null,
        };
    }

    case `${CREATE}_FULFILLED`: {
        return {
            ...state,
            data: payload,
            isLoading: false,
            isLoaded: true, // A new profile is loaded
            error: null,
        };
    }

    case `${CREATE}_REJECTED`: {
        return {
            ...state,
            isLoading: false,
            error: payload?.message || 'Failed to create profile',
        };
    }

    case `${UPDATE}_PENDING`: {
        return {
            ...state,
            isLoading: true,
            error: null,
        };
    }

    case `${UPDATE}_FULFILLED`: {
        return {
            ...state,
            data: payload,
            isLoading: false,
            error: null,
        };
    }

    case `${UPDATE}_REJECTED`: {
        return {
            ...state,
            isLoading: false,
            error: payload?.message || 'Failed to update profile',
        };
    }

    case `${CLEAR}_FULFILLED`: {
        return {
            ...state,
            data: null,
            error: null,
        };
    }

    default: {
        return state;
    }
    }
}

export const actions = {
    get: () => ({
        type: GET,
        payload: new Parse.Query(Profile)
            .equalTo('user', Parse.User.current().toPointer())
            .select(Profile.FIELDS)
            .first(),
    }),
    create: ({ name, phone }) => ({
        type: CREATE,
        payload: new Profile({ name, phone, status: Profile.STATUS_ACTIVE }).save(),
    }),
    update: (profile) => ({
        type: UPDATE,
        meta: { profile },
        payload: profile.save(),
    }),
    setOrganization: (profile, organization) => {
        // Set the current organization on the profile
        profile.set('currentOrganization', organization?.toPointer() || null);

        return {
            type: UPDATE,
            meta: { profile, organization },
            payload: profile.save(),
        };
    },
    clear: () => ({
        type: CLEAR,
        payload: Promise.resolve(null),
    }),
};

export const selectors = {
    me: (state) => state.profile.data,
    meta: createSelector(
        [(state) => state.profile.isLoading, (state) => state.profile.isLoaded],
        (isLoading, isLoaded) => ({
            isLoading,
            isLoaded,
        }),
    ),
    isLoading: (state) => state.profile.isLoading,
    isLoaded: (state) => state.profile.isLoaded,
    error: (state) => state.profile.error,
    currentOrganization: createSelector(
        [(state) => state.profile.data],
        (profile) => profile?.currentOrganization || null,
    ),
    name: createSelector(
        [(state) => state.profile.data],
        (profile) => profile?.name || '',
    ),
    email: createSelector(
        [(state) => state.profile.data],
        (profile) => profile?.email || '',
    ),
    phone: createSelector(
        [(state) => state.profile.data],
        (profile) => profile?.phone || '',
    ),
    pic: createSelector(
        [(state) => state.profile.data],
        (profile) => profile?.pic || null,
    ),
    picUrl: createSelector(
        [(state) => state.profile.data],
        (profile) => profile?.picUrl || null,
    ),
    initials: createSelector(
        [(state) => state.profile.data],
        (profile) => profile?.initials || '',
    ),
};

export default reducer;
