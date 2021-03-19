import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import '../../styles/Home.css';
import '../../styles/Login.css';
import '../../styles/Quotes.css';

import { Login } from '../Login/Login';
import { Quotes } from '../Quote/Quotes';
import { UserHistory } from '../History/UserHistory';
import { UserProfile } from '../Profile/UserProfile';
import { Contact } from '../Contact/Contact';
//import { Login } from '../Login/Login';

export function Root() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/quote" component={Quotes} />
                <Route path="/history" component={UserHistory} />
                <Route path="/profile" component={UserProfile} />
                <Route path="/contact" component={Contact} />
                {/* <Route path="/logout" component={Logout} /> */}
            </Switch>
        </Router>
    );
}