// reducers.js
import {
    applyMiddleware,
    combineReducers,
    createStore,
} from 'redux';

import user from './user';
import nav from './navigation';


const reducers = combineReducers({
    nav,
    user,
});

export default reducers;
