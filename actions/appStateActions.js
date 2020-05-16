/* eslint-disable import/prefer-default-export */
export function setTitle(title, prevUrl) {
    return {
        type: 'SET_TITLE',
        payload: { title, prevUrl },
    };
}

export function errorFound(error) {
    return {
        type: 'ERROR_FOUND',
        payload: error,
    };
}

export function clearError() {
    return {
        type: 'CLEAR_ERROR',
        payload: {},
    };
}
