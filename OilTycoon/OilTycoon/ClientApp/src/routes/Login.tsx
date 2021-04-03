import React, { useState, Component } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { TitleArea } from '../components/Reusables';
import { AuthClient } from '../generated'

export function Login(props: any) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const history = useHistory();

    const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const auth = new AuthClient();
        const jwt = await auth.login(username, password);

        if(jwt === null) {
            //bad combination
            alert('wrong username or password combination');
        }
        else {
            console.log('you\'re logged in!');
            localStorage.setItem('jwt', jwt);

            history.push('/quote');
        }
    }

    // HTML for Login page (first page user should see)
    return (
        <div id="login">
            <TitleArea />

            <div id="login-wrapper">
                <form id="login-form" onSubmit={handleLoginSubmit}>
                    <table>
                        <tbody>
                            <tr>
                                <td>Username: </td>
                                <td><input type="text" value={username} onChange={(e) => setUsername(e.target.value)} name="username" required /></td>
                            </tr>
                            <tr>
                                <td>Password: </td>
                                <td><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" required /></td>
                            </tr>
                        </tbody>
                    </table>
                    <br />
                    <button type="submit">Login</button> <NavLink to="/register"><button>Register</button></NavLink>
                </form>
            </div>
        </div>
    );
}
