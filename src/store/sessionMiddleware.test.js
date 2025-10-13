import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { sessionMiddleware } from './sessionMiddleware';
import { Parse } from '../utils/parseProvider';
import { actions as uiActions } from './ui';

// Mock Parse.User.logOut
vi.mock('../utils/parseProvider', () => ({
    Parse: {
        User: {
            logOut: vi.fn(() => Promise.resolve()),
        },
    },
}));

// Mock ui actions
vi.mock('./ui', () => ({
    actions: {
        showError: vi.fn((payload) => ({
            type: 'SHOW_NOTIFICATION',
            payload,
        })),
    },
}));

describe('sessionMiddleware', () => {
    let store;
    let next;
    let middleware;

    beforeEach(() => {
        // Reset all mocks
        vi.clearAllMocks();
        
        // Create mock store and next function
        store = {
            dispatch: vi.fn(),
            getState: vi.fn(() => ({})),
        };
        next = vi.fn((action) => action);
        
        // Create middleware instance
        middleware = sessionMiddleware(store)(next);
        
        // Clear timers
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('should pass through actions without code 209', () => {
        const action = {
            type: 'SOME_ACTION',
            payload: { data: 'test' },
        };

        const result = middleware(action);

        expect(next).toHaveBeenCalledWith(action);
        expect(result).toBe(action);
        expect(Parse.User.logOut).not.toHaveBeenCalled();
        expect(store.dispatch).not.toHaveBeenCalled();
    });

    it('should pass through actions with errors other than 209', () => {
        const action = {
            type: 'SOME_ACTION_REJECTED',
            payload: { code: 500, message: 'Server error' },
        };

        const result = middleware(action);

        expect(next).toHaveBeenCalledWith(action);
        expect(result).toBe(action);
        expect(Parse.User.logOut).not.toHaveBeenCalled();
        expect(store.dispatch).not.toHaveBeenCalled();
    });

    it('should handle code 209 errors', () => {
        const action = {
            type: 'LOAD_FEATURES_REJECTED',
            payload: { code: 209, error: 'Invalid session token' },
        };

        const result = middleware(action);

        // Action should be passed through with sessionHandled flag
        expect(next).toHaveBeenCalledWith({
            ...action,
            meta: { sessionHandled: true },
        });
        expect(result).toEqual({
            ...action,
            meta: { sessionHandled: true },
        });

        // Side effects should be scheduled
        expect(Parse.User.logOut).not.toHaveBeenCalled();
        expect(store.dispatch).not.toHaveBeenCalled();

        // Fast-forward timers to trigger side effects
        vi.runAllTimers();

        // Now side effects should have been called
        expect(Parse.User.logOut).toHaveBeenCalledTimes(1);
        expect(uiActions.showError).toHaveBeenCalledWith({
            message: 'Your session has expired. Please log in again.',
            autoHideDuration: 10000,
        });
        expect(store.dispatch).toHaveBeenCalledWith({
            type: 'SHOW_NOTIFICATION',
            payload: {
                message: 'Your session has expired. Please log in again.',
                autoHideDuration: 10000,
            },
        });
    });

    it('should not process code 209 if already handled', () => {
        const action = {
            type: 'SOME_ACTION_REJECTED',
            payload: { code: 209, error: 'Invalid session token' },
            meta: { sessionHandled: true },
        };

        const result = middleware(action);

        expect(next).toHaveBeenCalledWith(action);
        expect(result).toBe(action);

        // Run timers - nothing should happen
        vi.runAllTimers();

        expect(Parse.User.logOut).not.toHaveBeenCalled();
        expect(store.dispatch).not.toHaveBeenCalled();
    });

    it('should preserve existing meta properties', () => {
        const action = {
            type: 'SOME_ACTION_REJECTED',
            payload: { code: 209, error: 'Invalid session token' },
            meta: { someOtherProp: 'value' },
        };

        middleware(action);

        expect(next).toHaveBeenCalledWith({
            ...action,
            meta: { someOtherProp: 'value', sessionHandled: true },
        });
    });

    it('should handle Parse.User.logOut errors gracefully', async () => {
        const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
        Parse.User.logOut.mockRejectedValueOnce(new Error('Logout failed'));

        const action = {
            type: 'SOME_ACTION_REJECTED',
            payload: { code: 209, error: 'Invalid session token' },
        };

        middleware(action);

        // Fast-forward timers to trigger the setTimeout
        vi.runAllTimers();

        // Wait for the Promise rejection to be handled
        await vi.waitFor(() => {
            expect(consoleErrorSpy).toHaveBeenCalled();
        });

        // Should still dispatch notification even if logout fails
        expect(store.dispatch).toHaveBeenCalled();
        expect(consoleErrorSpy).toHaveBeenCalledWith(
            'Error during session expiry logout:',
            expect.any(Error),
        );

        consoleErrorSpy.mockRestore();
    });
});