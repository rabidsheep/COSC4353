import React, { useEffect } from 'react';
import { handleKeyDown, toPascal } from '../components/InputValidation';
import { TitleArea } from '../components/Reusables';
import { AuthClient, RegistrationDetails, User } from '../generated';
import '../styles/Register.css';

export function Register(props: any) {

    useEffect(() => {
        // Simulate loading the address data
        // TODO: load address data for the currently logged in user!
        let usr = localStorage.getItem('tmpUser');
        let pw = localStorage.getItem('tmpPass');

        if (usr !== null)
            (document.getElementsByName('username')[0] as HTMLTextAreaElement).value = usr;

        if (pw !== null )
            (document.getElementsByName('password')[0] as HTMLTextAreaElement).value = pw;
    }, [])

    const handleRegistration = async (e: any) => {
        e.preventDefault();

        const username = e.target.elements.username.value;
        const password = e.target.elements.password.value;

        console.log(toPascal(e.target.elements.firstName.value))
        const auth = new AuthClient();
        // register the user
        const user = await auth.register(new RegistrationDetails({
            user: new User({
                id: 0,
                userName: username,
                firstName: toPascal(e.target.elements.firstName.value),
                lastName: toPascal(e.target.elements.lastName.value),
                address1: toPascal(e.target.elements.add1.value),
                address2: toPascal(e.target.elements.add2.value),
                city: toPascal(e.target.elements.city.value),
                state: (e.target.elements.state.value).toUpperCase(),
                zipCode: e.target.elements.zip.value,
                passwordHash: undefined,
                passwordSalt: undefined,
                roles: undefined,
            }),
            rawPassword: password,
        }));

        // if registration was successful or not
        if (user === null || password === null) {
            alert('there was a problem registering for your account');
        }
        else {
            console.log('registration successful!');

            // now we login as the user we just created
            const jwt = await auth.login(username, password);

            if (jwt !== null) {
                // save the "cookie"
                localStorage.setItem('jwt', jwt);
                localStorage.removeItem('tmpUser');
                localStorage.removeItem('tmpPass');

                // redirect
                window.location.href = "/quote"
            }

        }

    }

    // HTML for Login page (first page user should see)
    return (
        <div id="register">
            <TitleArea />

            <div id="register-wrapper">
                <form id="register-form" onSubmit={handleRegistration}>
                    <table>
                        <tbody>
                            <tr>
                                <td>Username: </td>
                                <td><input type="text" name="username" onKeyDown={handleKeyDown} required /></td>
                            </tr>
                            <tr>
                                <td>Password: </td>
                                <td><input type="password" name="password" onKeyDown={handleKeyDown} required /></td>
                            </tr>
                            <tr>
                                <td>First Name: </td>
                                <td><input type="text" name="firstName" required /></td>
                            </tr>
                            <tr>
                                <td>Last Name: </td>
                                <td><input type="text" name="lastName" required /></td>
                            </tr>
                            <tr>
                                <td>Address 1: </td>
                                <td><input type="text" name="add1" required /></td>
                            </tr>
                            <tr>
                                <td>Address 2: </td>
                                <td><input type="text" name="add2" /></td>
                            </tr>
                            <tr>
                                <td>City: </td>
                                <td><input type="text" name="city" required /></td>
                            </tr>
                            <tr>
                                <td>State: </td>
                                <td><input type="text" name="state" maxLength={2} onKeyDown={handleKeyDown} pattern="[A-Za-z]{2}" required /></td>
                            </tr>
                            <tr>
                                <td>Zip Code: </td>
                                <td><input type="text" name="zip" maxLength={5} onKeyDown={handleKeyDown} pattern="[0-9]{5}" required /></td>
                            </tr>
                        </tbody>
                    </table>
                    <br />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}
