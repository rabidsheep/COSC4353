import React from 'react';
import { handleKeyDown, handleChange } from '../components/InputValidation';
import { TitleArea } from '../components/Reusables';
import { AuthClient } from '../generated'

export function Login(props: any) {

    const handleLoginSubmit = async (e: any) => {
        e.preventDefault();

        const username = e.target.elements.username.value;
        const password = e.target.elements.password.value;

        const auth = new AuthClient();
        const jwt = await auth.login(username, password);

        if(jwt === null) {
            //bad combination
            alert('wrong username or password combination');
        }
        else {
            console.log('you\'re logged in!');
            localStorage.setItem('jwt', jwt);

            window.location.href = '/quote';
        }
    }

    const handleRegClick = async (e: any) => {
        e.preventDefault();
        const username = (document.getElementsByName('username')[0] as HTMLTextAreaElement).value;
        const password = (document.getElementsByName('password')[0] as HTMLTextAreaElement).value;

        localStorage.setItem('tmpUser', username);
        localStorage.setItem('tmpPass', password);

        window.location.href = '/register';
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
                                <td><input type="text" onKeyDown={handleKeyDown} onChange={handleChange} name="username" required /></td>
                            </tr>
                            <tr>
                                <td>Password: </td>
                                <td><input type="password" onKeyDown={handleKeyDown} onChange={handleChange} name="password" required /></td>
                            </tr>
                        </tbody>
                    </table>
                    <br />
                    <button type="submit">Login</button> <button onClick={handleRegClick}>Register</button>
                </form>
            </div>
        </div>
    );
}
