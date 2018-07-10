const defaultState = {
    user: null,
    email: null,
    password: null,

};

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_EMAIL':
            return {
                ...state,
                email: action.value
            };
        case 'SET_PASSWORD':
            return {
                ...state,
                password: action.value
            };
        case 'SET_USER':
            return {
                ...state,
                user: action.value
            };

    }

    return state;
};
