import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from '../view/app';
import Index from '../view/index';
import Home from '../view/home'
import Hall from '../view/hall'
import About from '../view/about'



export default (

	<Route path="/" component={App}>
		<IndexRoute component={Index}/>
		<Route path="home" component={Home}>
			<IndexRoute component={Hall}/>
			<Route path="about" component={About}/>
		</Route>

	</Route>
);