import React from 'react';
import { TitleArea } from '../components/Reusables';
import '../styles/Register.css';

export function Register(props: any) {

    const handleRegistration = async (e: any) => {
        e.preventDefault();

        // array holding user registration info
        let data = {
            username: e.target.elements.username.value,
            password: e.target.elements.password.value,
            firstName: e.target.elements.firstName.value,
            lastName: e.target.elements.lastName.value,
            company: e.target.elements.company.value,
            email: e.target.elements.email.value,
            phone: e.target.elements.phone.value,
        }

        console.log(data);

        // insert code to create new user in database

        props.history.push('/quote');
        
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
                                <td><input type="text" name="username" required /></td>
                            </tr>
                            <tr>
                                <td>Password: </td>
                                <td><input type="text" name="password" required /></td>
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
