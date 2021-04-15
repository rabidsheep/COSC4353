import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import './styles/Home.css';
import './styles/Quotes.css';

import { Login } from './routes/Login';
import { Register } from './routes/Register';
import { Quotes } from './routes/Quotes';
import { UserHistory } from './routes/UserHistory';
import { UserProfile } from './routes/UserProfile';
import { Contact } from './routes/Contact';
import { Logout } from './routes/Logout';

import { AuthenticatedRoute, UnauthenticatedRoute } from './RouteAuthentication'

export function RoutePages() {
	return (
		<Router>
			<Switch>
				<UnauthenticatedRoute path={["/", "/login"]} exact component={Login} />
				<UnauthenticatedRoute path="/register" component={Register} />
				<AuthenticatedRoute path="/quote" component={Quotes} />
				<AuthenticatedRoute path="/history" component={UserHistory} />
				<AuthenticatedRoute path="/profile" component={UserProfile} />
				<AuthenticatedRoute path="/contact" component={Contact} />
				<AuthenticatedRoute path="/logout" component={Logout} />
			</Switch>
		</Router>
	);
}

ReactDOM.render(
	<React.StrictMode>
		<RoutePages />
	</React.StrictMode>,
	document.getElementById('root')
);

