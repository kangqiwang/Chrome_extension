import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store, { history } from './store.js';

import App from './app.jsx';
import Welcome from './welcome.jsx';

const router = (
			<Provider store={store}>
		    <Router history={history}>
		        <Route path="/popup.html" component={App}>
		           
		        </Route>
		    </Router>
		    </Provider>


		)


export default router;
