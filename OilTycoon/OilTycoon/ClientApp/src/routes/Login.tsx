import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { handleKeyDown, handleChange } from '../components/InputValidation';
import { TitleArea } from '../components/Reusables';
import { AuthClient } from '../generated'

export function Login() {

    const history = useHistory();

    interface LoginFields {
		username: string;
        password: string;
	}

    const onSubmit = async (values: LoginFields, actions: FormikHelpers<LoginFields>) => {
		actions.setSubmitting(true);
		const auth = new AuthClient();
        const jwt = await auth.login(values.username, values.password);

        if (jwt === null) {
            //bad combination
            alert('wrong username or password combination');
        }
        else {
            console.log('you\'re logged in!');
            localStorage.setItem('jwt', jwt);

            history.push('/quote');
        }
		actions.setSubmitting(false);
	}

    const handleRegClick = (values: LoginFields) => {
        // redirects to another component while providing the other component some state
        history.push('/register', { username: values.username, password: values.password });
    }

    // HTML for Login page (first page user should see)
    return (
        <div id="login">
            <TitleArea />

            <div id="login-wrapper">
                <Formik<LoginFields>
                    initialValues={{
                        username: '',
                        password: '',
                    }}
                    validationSchema={Yup.object({
                        username: Yup.string()
                            // see: https://stackoverflow.com/a/37658211
                            .matches(/^[a-zA-Z0-9]+(?:[_-]?[a-zA-Z0-9])*$/, 'A username can only be alphanumeric with _ -')
                            .required('Username must be provided'),
                        password: Yup.string()
                            .required('Password must be provided'),
                    })}
                    enableReinitialize
                    onSubmit={onSubmit}
                    >
                    {({ isSubmitting, isValid, errors, values }) => (
                        <Form>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Username: </td>
                                        <td>
                                            <Field name="username" type="text" />
                                            {/* <input type="text" onKeyDown={handleKeyDown} onChange={handleChange} name="username" required /> */}
                                        </td>
                                    </tr>
                                    { errors.username ? 													
                                    <tr>
                                        <td colSpan={2} className="errors">
                                            {errors.username}
                                        </td>
                                    </tr>
                                    : <></> }
                                    <tr>
                                        <td>Password: </td>
                                        <td>
                                            <Field name="password" type="password" />
                                            {/* <input type="password" onKeyDown={handleKeyDown} onChange={handleChange} name="password" required /> */}
                                        </td>
                                    </tr>
                                    { errors.password ? 													
                                    <tr>
                                        <td colSpan={2} className="errors">
                                            {errors.password}
                                        </td>
                                    </tr>
                                    : <></> }
                                </tbody>
                            </table>
                            <br />
                            <button type="submit" disabled={isSubmitting || !isValid}>Login</button> <button onClick={() => handleRegClick(values)}>Register</button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}
