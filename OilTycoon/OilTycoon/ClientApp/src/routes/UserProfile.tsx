import React, { useEffect } from 'react';
import { Field, Form, Formik, FormikHelpers, useFormikContext } from 'formik';
import * as Yup from 'yup';
import { toPascal } from '../components/InputValidation';
import { Navigation, TitleArea } from '../components/Reusables';
import { UserClient, UpdateDetails, User } from '../generated';
import '../styles/Auth.css';

// A child component is necessary to use the "useFormikContext" hook
// With that hook, we can populate the form with server data
function DataFetcher() {
	const ctx = useFormikContext();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const userClient = new UserClient();
				const myself = await userClient.getMyself();

				ctx.setFieldValue('username', myself.userName!, true);
				ctx.setFieldValue('first_name', myself.firstName!, true);
				ctx.setFieldValue('last_name', myself.lastName!, true);
				ctx.setFieldValue('address1', myself.address1!, true);
				ctx.setFieldValue('address2', myself.address2!, true);
				ctx.setFieldValue('city', myself.city!, true);
				ctx.setFieldValue('state', myself.state!, true);
				ctx.setFieldValue('zip', myself.zipCode!, true);
				
			}
			catch(err) {
				console.warn('there was an issue prefilling the form fields')
				console.error(err);
			}
		}
		fetchData();
	}, []);

	return null;
}

// HTML for user profile
export function UserProfile() {

	interface ProfileFields {
		username: string;
		first_name: string;
		last_name: string;
		address1: string;
		address2: string;
		city: string;
		state: string;
		zip: string;
		current_password: string;
		new_password: string;
	}

	/* update user info */
	const onSubmit = async (values: ProfileFields, actions: FormikHelpers<ProfileFields>) => {
		actions.setSubmitting(true);

		const updateClient = new UserClient();
		const update = await updateClient.updateUser(new UpdateDetails({
			user: new User({
				id: 0,
				userName: undefined,
				firstName: values.first_name,
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
			currentPassword: values.current_password,
			newPassword: values.new_password
		}));
		console.log(update);

		// if update returns null, user entered wrong password
		if (update == null) {
			alert('Error: Incorrect password')
		}
		else {
			alert('profile update successful')
		}

		// prevent repeat actions
		actions.setFieldValue('current_password', '', true);
		actions.setFieldValue('new_password', '', true);

		actions.setSubmitting(false);
	}

	return (
		<div id="user-profile" className="body-wrapper auth">
			<div className="flex-container sidebar">
				<div className="sticky-wrapper">
					<Navigation />
				</div>
			</div>

			<div className="flex-container main">
				<div className="main-bg"></div>
				<div className="main">
					<TitleArea />

						<div className="ptitle">
							<h2>Your User Profile</h2>
						</div>

						<div id="profile-wrapper">
							<Formik<ProfileFields>
								initialValues={{
									username: '',
									first_name: '',
									last_name: '',
									address1: '',
									address2: '',
									city: '',
									state: '',
									zip: '',
									current_password: '',
									new_password: ''
								}}
								validationSchema={Yup.object({
									username: Yup.string(), // cant change username anyway
									first_name: Yup.string()
										.max(100, 'Must be less than 100 characters')
										.typeError('Required')
										.required('First name must be provided'),
									last_name: Yup.string()
										.max(100, 'Must be less than 100 characters')
										.typeError('Required')
										.required('Last name must be provided'),
									address1: Yup.string()
										.max(100, 'Must be less than 100 characters')
										.typeError('Required')
										.required('Address must be provided'),
									address2: Yup.string()
										.nullable(true)
										.max(100, 'Must be less than 100 characters'),
									city: Yup.string()
										.max(100, 'Must be less than 100 characters')
										.typeError('Required')
										.required('City must be provided'),
									state: Yup.string()
										.max(100, 'Must be less than 100 characters')
										.typeError('Required')
										.required('State must be provided'),
									zip: Yup.string()
										.max(100, 'Must be less than 100 characters')
										.typeError('Required')
										.matches(/[0-9]{5}/, 'Must be a 5 digit number')
										.required('Zip-code must be provided.'),
									current_password: Yup.string()
										.typeError('Required')
										.required('Current password is required to make changes to profile'),
								})}
								enableReinitialize
								onSubmit={onSubmit}
								>
								{({ isSubmitting, isValid, errors, touched, values, dirty }) => (
									<Form className="userform">
										<DataFetcher />
										<div className="field-row">
											<div id="uname" className="field floating-label">
											<Field name="username" className="floating-label" placeholder="username" type="text" disabled />
												<label className="floating-label" htmlFor="username">Username</label>
												{errors.username && touched.username ? <span className="errors">{errors.username}</span> : <></>}
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
										</div>

										<div className="field-row">
											<div id="current-pw" className="field floating-label">
												<Field name="current_password" className="floating-label" placeholder="Current password" type="password" disabled={isSubmitting} />
												<label htmlFor="current_password" className="floating-label">Current Password</label>
											</div>
										</div>

										<div className="field-row">
											<div id="new-pw" className="field floating-label">
												<Field name="new_password" className="floating-label" placeholder="New password" type="password" disabled={isSubmitting} />
												<label htmlFor="new_password" className="floating-label">New Password</label>
											</div>

											<div className="hints">
													{values.new_password === "" || values.new_password === " " ? `Password won't be changed` : 'Password will be updated!'}
											</div>
										</div>
										<div className="button-area">
											<button type="submit" disabled={isSubmitting || !isValid}>Update</button>
										</div>
									</Form>
								)}
							</Formik>
						</div>
				</div>
			</div>
		</div>
	);
}