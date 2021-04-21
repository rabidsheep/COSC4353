
import React from 'react';
import { useHistory, useLocation } from 'react-router';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { TitleArea, toPascal, states } from '../components/Reusables';
import { ValidationBox } from '../components/InputValidation';
import { AuthClient, RegistrationDetails, User, UserClient } from '../generated';
import DropDown from '../components/DropDown';
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
		console.log(values);
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
									.matches(/^[a-zA-Z0-9]+(?:[_-]?[a-zA-Z0-9])*$/, 'Username can only be alphanumeric with _ -')
									.test('check_duplicate_username', 'Username already exists', async (value) => {
										const userClient = new UserClient();
										return ! await userClient.checkIfUsernameExists(value);
									})
									.required('Username must be provided'),
								password: Yup.string()
									.required('Password must be provided'),
								first_name: Yup.string()
									.max(100, 'Must be less than 100 characters')
									.typeError('Required')
									.required('Required'),
								last_name: Yup.string()
									.max(100, 'Must be less than 100 characters')
									.typeError('Required')
									.required('Required'),
								address1: Yup.string()
									.max(100, 'Must be less than 100 characters')
									.typeError('Required')
									.required('Required'),
								address2: Yup.string()
									.nullable(true)
									.max(100, 'Must be less than 100 characters'),
								city: Yup.string()
									.max(100, 'Must be less than 100 characters')
									.typeError('Required')
									.required('Required'),
								state: Yup.string()
									.max(2, 'Please use your state\'s abbreviation.')
									.typeError('required')
									.required('Required'),
								zip: Yup.string()
									.max(100, 'Must be less than 100 characters')
									.typeError('Required')
									.matches(/[0-9]{5}/, 'Must be a 5 digit number')
									.required('Required'),
								current_password: Yup.string()
									.typeError('Required')
									.required('Required'),
							})}
							enableReinitialize
							onSubmit={onSubmit}>
							{({ isSubmitting, isValid, errors, touched, values }) => (
								<Form id="register-form">
									<div id="register-wrapper">
										<div className="field-row">
											<div id="uname" className="field floating-label">
												<Field component={ValidationBox} name="username" className="floating-label" placeholder="Username" type="text" />
												<div className="label-wrapper"><label className="floating-label" htmlFor="username">Username</label></div>
												{errors.username && touched.username ? <span className="errors">{errors.username}</span> : <></>}
											</div>
										</div>

										<div className="field-row">
											<div id="pword" className="field floating-label">
												<Field component={ValidationBox} name="password" className="floating-label" placeholder="Password" type="text" />
												<div className="label-wrapper"><label className="floating-label" htmlFor="password">Password</label></div>
												{errors.password && touched.password ? <span className="errors">{errors.password}</span> : <></>}
											</div>
										</div>

										<div className="field-row">
											<div className="grid-container fnln">
												<div id="fname" className="field floating-label">
													<Field component={ValidationBox} name="first_name" className="floating-label" placeholder="First Name" type="text" disabled={isSubmitting} />
													<div className="label-wrapper"><label className="floating-label" htmlFor="first_name">First Name</label></div>
													{errors.first_name && touched.first_name ? <span className="errors">{errors.first_name}</span> : <></>}
												</div>

												<div id="lname" className="field floating-label">
													<Field component={ValidationBox} name="last_name" className="floating-label" placeholder="Last Name" type="text" disabled={isSubmitting} />
													<div className="label-wrapper"><label className="floating-label" htmlFor="last_name">Last Name</label></div>
													{errors.last_name && touched.last_name ? <span className="errors">{errors.last_name}</span> : <></>}
												</div>
											</div>
										</div>

										<div className="field-row">
											<div id="add1" className="field floating-label">
												<Field component={ValidationBox} name="address1" className="floating-label" placeholder="Address 1" type="text" disabled={isSubmitting} />
												<div className="label-wrapper"><label className="floating-label" htmlFor="address1">Address 1</label></div>
												{errors.address1 && touched.address1 ? <span className="errors">{errors.address1}</span> : <></>}
											</div>
										</div>

										<div className="field-row">
											<div id="add2" className="field floating-label">
												<Field component={ValidationBox} name="address2" className="floating-label" placeholder="Address 2" type="text" disabled={isSubmitting} />
												<div className="label-wrapper"><label className="floating-label" htmlFor="address2">Address 2 (Optional)</label></div>
												{errors.address2 && touched.address2 ? <span className="errors">{errors.address2}</span> : <></>}
											</div>
										</div>

										<div className="field-row">
											<div className="grid-container csz">
												<div id="city" className="field floating-label">
													<Field component={ValidationBox} name="city" className="floating-label" placeholder="City" type="text" disabled={isSubmitting} />
													<div className="label-wrapper"><label className="floating-label" htmlFor="city">City</label></div>
													{errors.city && touched.city ? <span className="errors">{errors.city}</span> : <></>}
												</div>

												<div id="state" className="field floating-label">
													<Field component={DropDown} name="state" options={states} maxLength={2} className="select floating-label" placeholder="" />
													{errors.state && touched.state ? <span className="errors">{errors.state}</span> : <></>}
												</div>

												<div id="zip" className="field floating-label">
													<Field component={ValidationBox} name="zip" className="floating-label" placeholder="zip" type="text" maxLength={5} disabled={isSubmitting} />
													<div className="label-wrapper"><label className="floating-label" htmlFor="zip">Zip Code</label></div>
													{errors.zip && touched.zip ? <span className="errors">{errors.zip}</span> : <></>}
												</div>
											</div>
										</div>
									</div>
									<div className="button-grid">
										<button className="form-button" onClick={() => handleBackClick(values)}>Back</button> <button className="form-button" type="submit" disabled={isSubmitting || !isValid}>Submit</button>
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
