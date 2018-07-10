import {applyMiddleware, createStore, combineReducers} from 'redux';
import thunk from 'redux-thunk';

import common from './Reducers/common';
import auth from './Reducers/auth';
import routing from './Reducers/routing';


const reducer = combineReducers({
    common,
    auth,
    routing
});

const middleware = applyMiddleware(thunk);

const store = createStore(reducer, middleware);

export default store;