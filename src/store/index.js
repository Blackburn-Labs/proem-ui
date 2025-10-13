import { configureStore, combineReducers } from '@reduxjs/toolkit';
import promiseMiddleware from 'redux-promise-middleware';
import { sessionMiddleware } from './sessionMiddleware';
import auth from './auth';
import profile from './profile';
import ui from './ui';

// Root reducer combining all feature reducers
const rootReducer = combineReducers({
    auth,
    profile,
    ui,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            // [PARSE] Disable serialization checks since we're storing Parse objects directly
            serializableCheck: false,
        })
        .concat(promiseMiddleware)
        .concat(sessionMiddleware), // [PARSE]
    devTools: import.meta.env.DEV,
});
