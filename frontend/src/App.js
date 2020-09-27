import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Home from './pages/Home';
import Post from './pages/Post';

export default function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" exact component={Home}/>
				<Route path="/post/:slug" exact component={Post}/>
			</Switch>
		</BrowserRouter>
	);
}
