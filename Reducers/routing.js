const defaultState = {
    optimizedRoutes: [],
    routeInfo: null,
    customerMeta: {}
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
    }
    return state;
};
