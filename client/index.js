import React from 'react'
import ReactDOM from 'react-dom'

import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import { Router, browserHistory } from 'react-router'

import routes from './routes'
import reducer from './reducer'

const initialState = window.__INITIAL_STATE__

const store = createStore(
	reducer, 
	initialState, 
	applyMiddleware(thunkMiddleware)
)


ReactDOM.render(
	<Provider store={store}>
		<Router routes={routes} history={browserHistory}/>
	</Provider>,
	document.getElementById('app')
)
