
import React from 'react';
import { useHistory, useLocation } from 'react-router';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { TitleArea, toPascal } from '../components/Reusables';
import { AuthClient, RegistrationDetails, User, UserClient } from '../generated';
import '../styles/UserForm.css';


export function Register() {
	// identify the type of "state" we might get passed from a redirect
	type PrefilledFileds = { username?: string; password?: string; } | undefined;
	const location = useLocation<PrefilledFileds>();
	// we might want to redirect later, so we grab this real quick
	const history = useHistory();

	interface RegisterFields {
		username: string;
		password: string;
		first_name: string;
		last_name: string;
		address1: string;
		address2: string;
		city: string;
		state: string;
		zip: string;
	}

	const handleBackClick = (values: RegisterFields) => {
		// redirects to login page
		history.push('/', { username: values.username, password: values.password });
	}

	const onSubmit = async (values: RegisterFields, actions: FormikHelpers<RegisterFields>) => {
		actions.setSubmitting(true);
		
		try {
			const auth = new AuthClient();
			// register the user
			await auth.register(new RegistrationDetails({
				user: new User({
					id: 0,
					userName: values.username,
					firstName: toPascal(values.first_name),
					lastName: toPascal(values.last_name),
					address1: toPascal(values.address1),
					address2: toPascal(values.address2),
					city: toPascal(values.city),
					state: (values.state).toUpperCase(),
					zipCode: values.zip,
					passwordHash: undefined,
					passwordSalt: undefined,
					roles: undefined,
				}),
				rawPassword: values.password,
			}));
			
			console.log('registration successful!');
			alert('registration successful!');

			// now we login as the user we just created
			const jwt = await auth.login(values.username, values.password);

			if (jwt !== null) {
				// save the "cookie"
				localStorage.setItem('jwt', jwt);

				// redirect
				history.push('/quote');
			}
			else {
				console.log('jwt is null??')
			}
		}
		catch(err) {
			alert('there was a problem registering for your account');
		}

		actions.setSubmitting(false);
	}

	// HTML for Login page (first page user should see)
	return (
		<div id="register" className="body-wrapper userform">
			<div className="flex-container register-flex">
				<div id="register-area">
					<div className="sticky-wrapper">
						<TitleArea />
						<Formik<RegisterFields>
							initialValues={{
								username: location.state ? (location.state.username || '') : '',
								password: location.state ? (location.state.password || '') : '',
								first_name: '',
								last_name: '',
								address1: '',
								address2: '',
								city: '',
								state: '',
								zip: ''
							}}
							validationSchema={Yup.object({
								username: Yup.string()
									// see: https://stackoverflow.com/a/37658211
									.matches(/^[a-zA-Z0-9]+(?:[_-]?[a-zA-Z0-9])*$/, 'A username can only be alphanumeric with _ -')
									.test('check_duplicate_username', 'A user with the same username already exists', async (value) => {
										const userClient = new UserClient();
										return ! await userClient.checkIfUsernameExists(value);
									})
									.required('Username must be provided'),
								password: Yup.string()
									.required('Password must be provided'),
								first_name: Yup.string()
									.max(100, 'Must be less than 100 characters')
									.required('First name must be provided'),
								last_name: Yup.string()
									.max(100, 'Must be less than 100 characters')
									.required('Last name must be provided'),
								address1: Yup.string()
									.max(100, 'Must be less than 100 characters')
									.required('Address must be provided'),
								address2: Yup.string()
									.max(100, 'Must be less than 100 characters'),
								city: Yup.string()
									.max(100, 'Must be less than 100 characters')
									.required('City must be provided'),
								state: Yup.string()
									.max(100, 'Must be less than 100 characters')
									.required('State must be provided'),
								zip: Yup.string()
									.max(100, 'Must be less than 100 characters')
									.matches(/[0-9]{5}/, 'Must be a 5 digit number')
									.required('Zip-code must be provided.'),
							})}
							enableReinitialize
							onSubmit={onSubmit}>
							{({ isSubmitting, isValid, errors, touched, values }) => (
								<Form id="register-form">
									<div id="register-wrapper">
											<div className="field-row">
												<div id="uname" className="field floating-label">
													<Field name="username" className="floating-label" placeholder="username" type="text" disabled={isSubmitting} />
													<label className="floating-label" htmlFor="username">Username</label>
													{errors.username && touched.username ? <span className="errors">{errors.username}</span> : <></>}
												</div>
											</div>

											<div className="field-row">
												<div id="pword" className="field floating-label">
													<Field name="password" className="floating-label" placeholder="password" type="password" disabled={isSubmitting} />
													<label className="floating-label" htmlFor="password">Password</label>
													{errors.password && touched.password ? <span className="errors">{errors.password}</span> : <></>}
												</div>
											</div>

										<div className="field-row">
											<div className="grid-container fnln">
												<div id="fname" className="field floating-label">
													<Field name="first_name" className="floating-label" placeholder="First name" type="text" disabled={isSubmitting} />
													<label className="floating-label" htmlFor="first_name">First Name</label>
													{errors.first_name && touched.first_name ? <span className="errors">{errors.first_name}</span> : <></>}
												</div>

												<div id="lname" className="field floating-label">
													<Field name="last_name" className="floating-label" placeholder="Last name" type="text" disabled={isSubmitting} />
													<label className="floating-label" htmlFor="last_name">Last Name</label>
													{errors.last_name && touched.last_name ? <span className="errors">{errors.last_name}</span> : <></>}
												</div>
											</div>
										</div> 

										<div className="field-row">
											<div id="add1" className="field floating-label">
												<Field name="address1" className="floating-label" placeholder="Address 1" type="text" disabled={isSubmitting} />
												<label className="floating-label" htmlFor="address1">Address 1</label>
												{errors.address1 && touched.address1 ? <span className="errors">{errors.address1}</span> : <></>}
											</div>
										</div>
	
										<div className="field-row">
											<div id="add2" className="field floating-label">
												<Field name="address2" className="floating-label" placeholder="Address 2" type="text" disabled={isSubmitting} />
												<label className="floating-label" htmlFor="address2">Address 2 (Optional)</label>
												{errors.address2 && touched.address2 ? <span className="errors">{errors.address2}</span> : <></>}
											</div>
										</div>

										<div className="field-row">
											<div className="grid-container csz">
												<div id="city" className="field floating-label">
													<Field name="city" className="floating-label" placeholder="City" type="text" disabled={isSubmitting} />
													<label className="floating-label" htmlFor="city">City</label>
												</div>

												<div id="state" className="field floating-label">
													<Field as="select" name="state" className="floating-label">
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
													</Field>
													<label className="floating-label" htmlFor="state">State</label>
												</div>

												<div id="zip" className="field floating-label">
													<Field name="zip" className="floating-label" placeholder="zip" type="text" disabled={isSubmitting} />
													<label className="floating-label" htmlFor="zip">Zip Code</label>
												</div>
											</div>
											<div className="error">
												{/*{errors.city && touched.city ? <span className="errors">{errors.city}</span> : <></>}
												{errors.state && touched.state ? <span className="errors">{errors.state}</span> : <></>}
												{errors.zip && touched.zip ? <span className="errors">{errors.zip}</span> : <></>}*/}
											</div>
										</div>
									</div>
									<div className="button-area">
											<button onClick={() => handleBackClick(values)}>Back</button> <button type="submit" disabled={isSubmitting || !isValid}>Submit</button>
									</div>
								</Form>
							)}
						</Formik>
					</div>
				</div>
			</div>
			<div className="flex-container main-flex"></div>
		</div>
	);
}
