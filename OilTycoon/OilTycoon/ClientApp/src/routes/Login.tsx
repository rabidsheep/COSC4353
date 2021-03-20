import React from 'react';
import { TitleArea } from '../components/Reusables';

interface fakeDb {
    username: string,
    password: string,
}

export function Login(props: any) {

    const goToRegister = () => {
        props.history.push('/register');
    }

    const handleLoginSubmit = async (e: any) => {
        e.preventDefault();

        let username = e.target.elements.username.value;
        let password = e.target.elements.password.value;

        // change this part later to instead verify login by connecting to backend
        let fakeUsers: fakeDb[] = [
            {
                username: 'admin',
                password: 'password'
            },
            {
                username: 'fakeuser',
                password: 'fakepw'
            }
        ]


        if ((fakeUsers.find(user => user.username === username))) {
            if ((fakeUsers.find(user => user.password === password))) {
                console.log('you\'re logged in!');

                // store logged in status to keep track across app
                localStorage.setItem('username', username);
                localStorage.setItem('password', password);
                localStorage.setItem('loggedIn', 'true');


                // bring user to user homepage
                props.history.push('/quote');
            } else {
                //bad combination
                alert('wrong username or password combination');
            }
        } else {
            // if username doesn't exist, bring user to registration 
            props.history.push('/register');
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
                                <td><input type="text" name="username" required /></td>
                            </tr>
                            <tr>
                                <td>Password: </td>
                                <td><input type="text" name="password" required /></td>
                            </tr>
                        </tbody>
                    </table>
                    <br />
                    <button type="submit">Login</button> <button onClick={goToRegister}>Register</button>
                </form>
            </div>
        </div>
    );
}
