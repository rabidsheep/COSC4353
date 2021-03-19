import React from 'react';
import { TitleArea } from '../../components/Reusables';

export function Login(props: any) {
    // Using this to test storing session data and switching pages
    /*let user = {
        username: '',
        password: '',
        loggedIn: false
    }*/

    /*const handleUsernameChange = (e: any) => {
        user.username = e.target.value;
    }

    const handlePasswordChange = (e: any) => {
        user.password = e.target.value;
    }*/

    const handleLoginSubmit = async (e: any) => {
        e.preventDefault();

        let username = e.target.elements.username.value;
        let password = e.target.elements.password.value;

        /* change this part later to instead verify login by connecting to backend */
        let hardcodedCred = {
            username: 'admin',
            password: 'password'
        }

        if ((username === hardcodedCred.username) && (password === hardcodedCred.password)) {
            console.log('you\'re logged in!');
            localStorage.setItem('username', username);
            localStorage.setItem('loggedIn', 'true');
            console.log(e.target.elements.username.value);
            props.history.push('/quote');
        } else {
            //bad combination
            alert('wrong username or password combination');
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
                    <button type="submit">Test login</button>
                </form>
            </div>
        </div>
    );
}
