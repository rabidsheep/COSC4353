import React from 'react';

import { AuthClient, UserClient, WeatherForecastClient } from './generated/index';

import logo from './logo.svg';
import './App.css';

function App() {

  const testLogin = async () => {
    let userClient = new UserClient();
    let authClient = new AuthClient();
    let weatherClient = new WeatherForecastClient();
    console.log('userClient.getAll() => ', await userClient.getAll());
    console.log('userClient.getById(1) => ', await userClient.getById(1));

    // Try to get an endpoint where Auth is needed without logging in first
    // (this should fail)
    try {
      // make sure we don't have a saved login from before
      localStorage.removeItem('jwt');
      // actually do request
      console.log('weatherClient.get() => ', await weatherClient.get());
    }
    catch(err) {
      console.log('weatherClient.get() => ', 'failed');
    }

    // You may ask: What is a JWT?
    // Well, glad you asked: https://jwt.io/introduction
    let jwt = await authClient.login('admin', 'password');
    console.log(`authClient.login('admin', 'password') => `, jwt);

    // save JWT, similar to a Cookie
    localStorage.setItem('jwt', jwt);
    // use JWT in request where Auth is needed
    console.log('weatherClient.get() => ', await weatherClient.get());
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={testLogin}>Test login</button>
      </header>
    </div>
  );
}

export default App;
