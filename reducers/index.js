import { combineReducers } from 'redux';

import appState from './appStateReducer';
import user from './userReducer';

export default combineReducers({
    appState,
    user,
});
