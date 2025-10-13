import { Parse } from '../utils/parseProvider';
import { actions as uiActions } from './ui';

/**
 * [PARSE]
 * Redux middleware to handle Parse session token errors (code 209)
 *
 * When a Parse API call returns error code 209 (invalid session token):
 * 1. Logs the user out from Parse
 * 2. Shows an error notification to the user
 * 3. The auth reducer will reset the auth state
 *
 * This keeps the reducer pure while handling side effects properly
 */
export const sessionMiddleware = store => next => action => {
    // Check if this action has a Parse session error
    if (action.payload?.code === 209 && !action.meta?.sessionHandled) {
        // Mark as handled to prevent duplicate processing
        action.meta = { ...action.meta, sessionHandled: true };

        // Let the action complete first (reducers will reset state)
        const result = next(action);

        // Then handle the session expiry side effects
        setTimeout(() => {
            // Log out from Parse (clears session)
            Parse.User.logOut().catch(err => {
                console.error('Error during session expiry logout:', err);
            });

            // Notify the user
            store.dispatch(uiActions.showError({
                message: 'Your session has expired. Please log in again.',
                autoHideDuration: 10000,
            }));
        }, 0);

        return result;
    }

    // Pass through all other actions unchanged
    return next(action);
};
