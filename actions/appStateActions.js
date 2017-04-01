/* eslint-disable import/prefer-default-export */
export function changeTitle(newTitle) {
  return {
    type: 'TITLE_CHANGE',
    payload: newTitle,
  };
}

export function errorFound(msg, error) {
  return {
    type: 'ERROR_FOUND',
    payload: { msg, error },
  };
}

export function clearError() {
  return {
    type: 'CLEAR_ERROR',
    payload: {},
  };
}

