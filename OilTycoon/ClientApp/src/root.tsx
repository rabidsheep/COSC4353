import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './css/Home.css';
import './css/Login.css';
import './css/Quotes.css';
import Login from './Login';
import Quotes from './Quotes';
import History from './UserHistory';
import UserProfile from './UserProfile';
import Contact from './Contact';
import Logout from './Logout';

export default function Root() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/quote" component={Quotes} />
                <Route path="/history" component={History} />
                <Route path="/profile" component={UserProfile} />
                <Route path="/contact" component={Contact} />
                <Route path="/logout" component={Logout} />
            </Switch>
        </Router>
    );
}