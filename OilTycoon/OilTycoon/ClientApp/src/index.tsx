import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import './styles/Home.css';
import './styles/Login.css';
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

    const [isAuthenticated, userHasAuthenticated] = useState(false);

    useEffect(() => {
        onLoad();
    }, []);

    // check session token
    async function onLoad() {
        try {
            if (localStorage.getItem('jwt') == null) {
                userHasAuthenticated(false);
            } else {
                userHasAuthenticated(true);
            }
        } catch (e) {
            alert(e);
        }
    }

    return (
        <Router>
            <Switch>
                <UnauthenticatedRoute path={["/", "/login"]} exact component={Login} appProps={{ isAuthenticated }} />
                <UnauthenticatedRoute path="/register" component={Register} appProps={{ isAuthenticated }} />
                <AuthenticatedRoute path="/quote" component={Quotes} appProps={{ isAuthenticated }} />
                <AuthenticatedRoute path="/history" component={UserHistory} appProps={{ isAuthenticated }} />
                <AuthenticatedRoute path="/profile" component={UserProfile} appProps={{ isAuthenticated }} />
                <AuthenticatedRoute path="/contact" component={Contact} appProps={{ isAuthenticated }} />
                <AuthenticatedRoute path="/logout" component={Logout} appProps={{ isAuthenticated }} />
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

