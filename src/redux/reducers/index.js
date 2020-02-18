// reducers.js
import {
    applyMiddleware,
    combineReducers,
    createStore,
} from 'redux';

import user from './user';
import nav from './navigation';
import favoriteReducer from './favoriteReducer';


const reducers = combineReducers({
    nav,
    user,
   favoriteReducer
});

export default reducers;
