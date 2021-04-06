import React, { useEffect } from 'react';
import { Field, Form, Formik, FormikHelpers, useFormikContext } from 'formik';
import * as Yup from 'yup';
import { handleKeyDown, toPascal } from '../components/InputValidation';
import { Navigation, TitleArea } from '../components/Reusables';
import { UserClient, UpdateDetails, User } from '../generated';

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
		<div id="logged-in">
			<TitleArea />

			<Navigation />
			<div id="main">
				<div className="ptitle">
					<p className="ptitle">Your User Profile</p>
				</div>
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
						current_password: Yup.string()
							.required('Current password is required to make changes to profile'),
					})}
					enableReinitialize
					onSubmit={onSubmit}
					>
					{({ isSubmitting, isValid, errors, values }) => (
						<Form>
							<DataFetcher />
							<table id="profile-wrapper">
								<tbody>
									<tr>
										<td>Username: </td>
										<td>
											<Field name="username" type="text" disabled />
										</td>
									</tr>
									<tr>
										<td>First Name: </td>
										<td>
											<Field name="first_name" type="text" disabled={isSubmitting} />
										</td>
									</tr>
									{ errors.first_name ? 													
									<tr>
										<td colSpan={2} className="errors">
											{errors.first_name}
										</td>
									</tr>
									: <></> }
									<tr>
										<td>Last Name: </td>
										<td>
											<Field name="last_name" type="text" disabled={isSubmitting} />
										</td>
									</tr>
									{ errors.last_name ? 													
									<tr>
										<td colSpan={2} className="errors">
											{errors.last_name}
										</td>
									</tr>
									: <></> }
									<tr>
										<td>Address 1: </td>
										<td>
											<Field name="address1" type="text" disabled={isSubmitting} />
										</td>
									</tr>
									{ errors.address1 ? 													
									<tr>
										<td colSpan={2} className="errors">
											{errors.address1}
										</td>
									</tr>
									: <></> }
									<tr>
										<td>Address 2: </td>
										<td>
											<Field name="address2" type="text" disabled={isSubmitting} />
										</td>
									</tr>
									{ errors.address2 ? 													
									<tr>
										<td colSpan={2} className="errors">
											{errors.address2}
										</td>
									</tr>
									: <></> }
									<tr>
										<td>City: </td>
										<td>
											<Field name="city" type="text" disabled={isSubmitting} />
										</td>
									</tr>
									{ errors.city ? 													
									<tr>
										<td colSpan={2} className="errors">
											{errors.city}
										</td>
									</tr>
									: <></> }
									<tr>
										<td>State: </td>
										<td>
											<Field as="select" name="state" className="dropdown" disabled={isSubmitting}>
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
										</td>
									</tr>
									{ errors.state ? 													
									<tr>
										<td colSpan={2} className="errors">
											{errors.state}
										</td>
									</tr>
									: <></> }
									<tr>
										<td>Zip Code: </td>
										<td>
											<Field name="zip" type="text" disabled={isSubmitting} />
										</td>
									</tr>
									{ errors.zip ? 													
									<tr>
										<td colSpan={2} className="errors">
											{errors.zip}
										</td>
									</tr>
									: <></> }
									<tr>
										<td>Current Password: </td>
										<td>
											<Field name="current_password" type="password" disabled={isSubmitting} />
										</td>
									</tr>
									{ errors.current_password ? 													
									<tr>
										<td colSpan={2} className="errors">
											{errors.current_password}
										</td>
									</tr>
									: <></> }
									<tr>
										<td>New Password: </td>
										<td>
											<Field name="new_password" type="password" disabled={isSubmitting} />
										</td>
									</tr>													
									<tr>
										<td colSpan={2} className="hints">
											{values.new_password === "" || values.new_password === " " ? `Password won't be changed` : 'Password will be updated!'}
										</td>
									</tr>
								</tbody>
							</table>
							<button type="submit" disabled={isSubmitting || !isValid}>Update</button>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
}