const initState = {
  title: '',
  isAuthenticated: false,
  isAuthenticating: false,
  errorMsg: null,
  errorObject: null,
};

export default function reducer(state = initState, action) {
  switch (action.type) {
    case 'TITLE_CHANGE': {
      return { ...state, title: action.payload, errorMsg: null, errorObject: null, isError: false };
    }

    case 'ERROR_FOUND': {
      // console.error(action.payload.message, action.payload);
      return {
        ...state,
        errorMsg: action.payload.message,
        errorObject: action.payload,
        isError: true,
      };
    }

    case 'CLEAR_ERROR': {
      return { ...state, errorMsg: null, errorObject: null, isError: false };
    }

    default: {
      return state;
    }
  }
}
