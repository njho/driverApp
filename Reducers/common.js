const defaultState = {
    octane: null,
    loginState: 0,
    isOnShift: false
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'OCTANE_SELECTED':
            return {
                ...state,
                octane: action.octane
            };
        case 'SET_LOGIN_STATE':
            return {
                ...state,
                loginState: action.value
            };
        case 'SET_DRIVER_ON_SHIFT':
            return {
                ...state,
                isOnShift: action.value
            }
    }

    return state;
};
