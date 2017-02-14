import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from '../view/App';
import Index from '../view/Index';

export default (

	<Route path="/" component={App}>
		<IndexRoute component={Index}/>
	</Route>
);