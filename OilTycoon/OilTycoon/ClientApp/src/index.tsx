import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './styles/Home.css';
import './styles/Login.css';
import './styles/Quotes.css';

import { Login } from './routes/Login';
import { Register } from './routes/Register';
import { Quotes } from './routes/Quotes';
import { UserHistory } from './routes/UserHistory';
import { UserProfile } from './routes/UserProfile';
import { Contact } from './routes/Contact';

export function RoutePages() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/quote" component={Quotes} />
                <Route path="/history" component={UserHistory} />
                <Route path="/profile" component={UserProfile} />
                <Route path="/contact" component={Contact} />
                {/* <Route path="/logout" component={Logout} /> */}
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

