import React, { useEffect, useState } from 'react';
import { handleKeyDown, toPascal } from '../components/InputValidation';
import { Navigation, TitleArea } from '../components/Reusables';
import { UserClient } from '../generated';

/* still needed: function to fill out form with customer's current info in the system upon loading page */

// HTML for user profile
export function UserProfile() {
	const [username, setUsername] = useState('');
	const [firstname, setFirstName] = useState('');
	const [lastname, setLastName] = useState('');
	const [address1, setAddress1] = useState('');
	const [address2, setAddress2] = useState('');
	const [city, setCity] = useState('');
	const [state, setState] = useState('');
	const [zip, setZip] = useState('');

	useEffect(() => {
		const fetchData = async () => {
					const userClient = new UserClient();
					const myself = await userClient.getMyself();

					// TODO: use "myself" to set address data

					setUsername(myself.userName!);
					setFirstName(myself.firstName!);
					setLastName(myself.lastName!);
					setAddress1(myself.address1!); // could be `setAddress1(myself.address1`
					setAddress2(myself.address2!); // could be `setAddress2(myself.address2)`
					setCity(myself.city!); // could be `setCity(myself.city)`
					setState(myself.state!); // could be `setState(myself.state)`
					setZip(myself.zipCode!); // could be `setZip(myself.zip)`
			}
			fetchData();
		}, []);

	/* function that runs when update button is clicked - stores all values currently in each field
	update to connect function to database later */
	const handleUpdate = async (e: any) => {
		e.preventDefault();

		const userClient = new UserClient();
		const myself = await userClient.getMyself();
	}

	return (
		<div id="logged-in">
			<TitleArea />

			<Navigation />
			<div id="main">
				<div className="ptitle">
					<p className="ptitle">Your User Profile</p>
				</div>

				<form id="profile-form" onSubmit={handleUpdate}>
					<table id="profile-wrapper" data-loginrequired>
						<tbody>
							<tr>
								<td>Username: </td>
								<td><input type="text" value={username} name="username" onKeyDown={handleKeyDown} required /></td>
							</tr>
							<tr>
								<td><label>First Name: </label></td>
									<td><input name="firstName" value={firstname} type="text" /></td>
							</tr>
							<tr>
								<td><label>Last Name: </label></td>
									<td><input name="lastName" value={lastname} type="text" /></td>
							</tr>
							<tr>
								<td>Address 1: </td>
									<td><input type="text" value={address1} name="add1" required /></td>
							</tr>
							<tr>
								<td>Address 2: </td>
									<td><input type="text" value={address2} name="add2" /></td>
							</tr>
							<tr>
								<td>City: </td>
									<td><input type="text" value={city} name="city" required /></td>
							</tr>
							<tr>
								<td>State: </td>
								<td><select name="state" className="dropdown" value={state} required>
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
									<td><input type="text" name="zip" value={zip} maxLength={5} onKeyDown={handleKeyDown} pattern="[0-9]{5}" required /></td>
							</tr>
							<tr>
								<td><label>Current Password: </label></td>
								<td><input name="currentPw" type="text" /></td>
							</tr>
							<tr>
								<td><label>New Password: </label></td>
								<td><input name="newPw" type="text" /></td>
							</tr>
						</tbody>
					</table>
					<button type="submit">Update</button>
				</form>
			</div>
		</div>
	);
}