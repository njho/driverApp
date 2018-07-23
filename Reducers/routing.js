const defaultState = {
    optimizedRoutes: [],
    routeInfo: null,
    customerMeta: {},
    acceptedJob: '',
    acceptedJobMeta: {}
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_OPTIMIZED_ROUTES':
            return {
                ...state,
                optimizedRoutes: action.value
            };
        case 'SET_ROUTE_INFO':
            return {
                ...state,
                routeInfo: action.routeInfo,
                customerMeta: action.customerMeta
            };
        case 'SET_CUSTOMER_META':
            return {
                ...state,
                customer: action.value
            };
        case 'SET_ACCEPTED_JOB':
            return {
                ...state,
                acceptedJob: action.value
            };
        case 'SET_ACCEPTED_JOB_META':
            return {
                ...state,
                acceptedJobMeta: action.value
            };
    }
    return state;
};
