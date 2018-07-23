const defaultState = {
    octane: null,
    loginState: 0,
    isOnShift: false,
    emergencyText: '',
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
            };
        case 'SET_CANCELLATION_CAUSE':
            return {
                ...state,
                isOnShift: action.value
            }
        case 'SET_EMERGENCY_TEXT':
            return {
                ...state,
                emergencyText: action.value
            }
    }

    return state;
};
