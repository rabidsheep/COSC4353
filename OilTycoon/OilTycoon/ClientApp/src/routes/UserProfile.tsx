import React, { useEffect } from 'react';
import { handleKeyDown, toPascal } from '../components/InputValidation';
import { Navigation, TitleArea } from '../components/Reusables';
import { UserClient, UpdateDetails, User } from '../generated';

/* still needed: function to fill out form with customer's current info in the system upon loading page */

// HTML for user profile
export function UserProfile() {

	useEffect(() => {
		const fetchData = async () => {
					const userClient = new UserClient();
					const myself = await userClient.getMyself();

					(document.getElementsByName('username')[0] as HTMLTextAreaElement).value = myself.userName!;
					(document.getElementsByName('firstName')[0] as HTMLTextAreaElement).value = myself.firstName!;
					(document.getElementsByName('lastName')[0] as HTMLTextAreaElement).value = myself.lastName!;
					(document.getElementsByName('add1')[0] as HTMLTextAreaElement).value = myself.address1!;
					(document.getElementsByName('add2')[0] as HTMLTextAreaElement).value = myself.address2!;
					(document.getElementsByName('city')[0] as HTMLTextAreaElement).value = myself.city!;
					(document.getElementsByName('state')[0] as HTMLTextAreaElement).value = myself.state!;
					(document.getElementsByName('zip')[0] as HTMLTextAreaElement).value = myself.zipCode!;
			}
			fetchData();
		}, []);

	/* update user info */
	const handleUpdate = async (e: any) => {
		e.preventDefault();

		const updateClient = new UserClient();
		const update = await updateClient.updateUser(new UpdateDetails({
			user: new User({
				id: 0,
				userName: e.target.elements.username.value,
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
			currentPassword: e.target.elements.currentPw.value,
			newPassword: e.target.elements.newPw.value
		}));

		// if update returns null, user entered wrong password
		if (update == null) {
			alert("Error: Incorrect password")
		};

		(document.getElementsByName('currentPw')[0] as HTMLTextAreaElement).value = "";
		(document.getElementsByName('newPw')[0] as HTMLTextAreaElement).value = "";

		console.log(update);
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
								<td><input type="text" name="username" onKeyDown={handleKeyDown} disabled required /></td>
							</tr>
							<tr>
								<td><label>First Name: </label></td>
									<td><input name="firstName" type="text" /></td>
							</tr>
							<tr>
								<td><label>Last Name: </label></td>
									<td><input name="lastName" type="text" /></td>
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
							<tr>
								<td><label>Current Password: </label></td>
								<td><input name="currentPw" type="password" /></td>
							</tr>
							<tr>
								<td><label>New Password: </label></td>
								<td><input name="newPw" type="password" /></td>
							</tr>
						</tbody>
					</table>
					<button type="submit">Update</button>
				</form>
			</div>
		</div>
	);
}