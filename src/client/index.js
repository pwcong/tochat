import React from 'react';
import ReactDOM from 'react-dom';

import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import { Router, hashHistory } from 'react-router';

import routes from './routes';
import reducer from './reducer';

// import io from 'socket.io-client';

// global.socket = io();

// socket.on("message", msg => {
// 	console.log(msg)
// });


const store = createStore(
	reducer, 
	applyMiddleware(thunkMiddleware)
);

ReactDOM.render(
	<Provider store={store}>
		<Router routes={routes} history={hashHistory}/>
	</Provider>,
	document.getElementById('app')
);

setInterval( () => {
	console.log(store.getState());
}, 5000);