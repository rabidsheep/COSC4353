import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { TitleArea } from '../components/Reusables';
import { AuthClient, RegistrationDetails, User } from '../generated';
import '../styles/Register.css';

export function Register(props: any) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const history = useHistory();

    const handleRegistration = async (e: any) => {
        e.preventDefault();

        console.log('username: ', username);
        console.log('password: ', password);

        const auth = new AuthClient();
        // register the user
        const user = await auth.register(new RegistrationDetails({
            user: new User({
                id: 0,
                userName: username,
                fullName: "",
                address1: "",
                address2: "",
                city: "",
                state: "",
                zipCode: "",
                passwordHash: undefined,
                passwordSalt: undefined,
                roles: undefined,
            }),
            rawPassword: password,
        }));

        // if registration was successful or not
        if(user === null) {
            alert('there was a problem registering for your account');
        }
        else {
            console.log('registration successful!');

            // now we login as the user we just created
            const jwt = await auth.login(username, password);

            if(jwt !== null) {
                // save the "cookie"
                localStorage.setItem('jwt', jwt);
                // redirect
                history.push('/quote');
            }

        }

        // // array holding user registration info
        // let data = {
        //     username: e.target.elements.username.value,
        //     password: e.target.elements.password.value,
        //     firstName: e.target.elements.firstName.value,
        //     lastName: e.target.elements.lastName.value,
        //     company: e.target.elements.company.value,
        //     email: e.target.elements.email.value,
        //     phone: e.target.elements.phone.value,
        // }

        // console.log(data);

        // // insert code to create new user in database

        // props.history.push('/quote');
        
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
                                <td><input type="text" value={username} onChange={(e) => setUsername(e.target.value)} name="username" required /></td>
                            </tr>
                            <tr>
                                <td>Password: </td>
                                <td><input type="text" value={password} onChange={(e) => setPassword(e.target.value)} name="password" required /></td>
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
                                <td>Company: </td>
                                <td><input type="text" name="company" required /></td>
                            </tr>
                            <tr>
                                <td>E-mail: </td>
                                <td><input type="text" name="email" required /></td>
                            </tr>
                            <tr>
                                <td>Phone: </td>
                                <td><input type="text" pattern="[0-9]{10}" name="phone" required /></td>
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
