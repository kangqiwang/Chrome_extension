import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import products from './products.js';
import htmlPageInfo from './htmlPageInfo.js';
import urlPageInfo from './urlPageInfo.js';

const rootReducer = combineReducers({
    products,
    htmlPageInfo,
    urlPageInfo,
    routing: routerReducer })

export default rootReducer;
