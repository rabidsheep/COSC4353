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

        if (pw !== null)
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
                                <td><select name="state" className="dropdown" required>
                                    <option value="">&nbsp;</option>
                                    <option value="AL">AL</option>
                                    <option value="AK">AK</option>
                                    <option value="AZ">AZ</option>
                                    <option value="AR">AR</option>
                                    <option value="CA">CA</option>
                                    <option value="CO">CO</option>
                                    <option value="CT">CT</option>
                                    <option value="DE">DE</option>
                                    <option value="DC">DC</option>
                                    <option value="FL">FL</option>
                                    <option value="GA">GA</option>
                                    <option value="HI">HI</option>
                                    <option value="ID">ID</option>
                                    <option value="IL">IL</option>
                                    <option value="IN">IN</option>
                                    <option value="IA">IA</option>
                                    <option value="KS">KS</option>
                                    <option value="KY">KY</option>
                                    <option value="LA">LA</option>
                                    <option value="ME">ME</option>
                                    <option value="MD">MD</option>
                                    <option value="MA">MA</option>
                                    <option value="MI">MI</option>
                                    <option value="MN">MN</option>
                                    <option value="MS">MS</option>
                                    <option value="MO">MO</option>
                                    <option value="MT">MT</option>
                                    <option value="NE">NE</option>
                                    <option value="NV">NV</option>
                                    <option value="NH">NH</option>
                                    <option value="NJ">NJ</option>
                                    <option value="NM">NM</option>
                                    <option value="NY">NY</option>
                                    <option value="NC">NC</option>
                                    <option value="ND">ND</option>
                                    <option value="OH">OH</option>
                                    <option value="OK">OK</option>
                                    <option value="OR">OR</option>
                                    <option value="PA">PA</option>
                                    <option value="RI">RI</option>
                                    <option value="SC">SC</option>
                                    <option value="SD">SD</option>
                                    <option value="TN">TN</option>
                                    <option value="TX">TX</option>
                                    <option value="UT">UT</option>
                                    <option value="VT">VT</option>
                                    <option value="VA">VA</option>
                                    <option value="WA">WA</option>
                                    <option value="WV">WV</option>
                                    <option value="WI">WI</option>
                                    <option value="WY">WY</option>
                                </select>
                                </td>
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
