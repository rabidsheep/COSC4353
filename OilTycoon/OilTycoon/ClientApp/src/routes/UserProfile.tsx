import { Navigation, TitleArea } from '../components/Reusables';

/* still needed: function to fill out form with customer's current info in the system upon loading page */

// HTML for user profile
export function UserProfile() {

	/* function that runs when update button is clicked - stores all values currently in each field
	update to connect function to database later */
	const handleUpdate = async (e: any) => {
		e.preventDefault();

		// array holding user profile info
		let data = {
			firstName: e.target.elements.firstName.value,
			lastName: e.target.elements.lastName.value,
			address1: e.target.elements.add1.value,
			address2: e.target.elements.add2.value,
			city: e.target.elements.city.value,
			state: e.target.elements.state.value,
			zip: e.target.elements.zip.value,
			currentPw: e.target.elements.currentPw.value,
			newPw: e.target.elements.newPw.value
		}

		// check to make sure passwords match
		if (data.currentPw === localStorage.getItem('password')) {
			console.log("passwords match");
			console.log(data);
			pushUpdate(data);
		} else {
			alert('passwords do not match!');
        }
	}

	const pushUpdate = async (newInfo: any) => {
		/* code to push new profile info to database */
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
							<td><label>First Name: </label></td>
							<td><input name="firstName" type="text" /></td>
						</tr>
						<tr>
							<td><label>Last Name: </label></td>
							<td><input name="lastName" type="text" /></td>
						</tr>
						<tr>
							<td><label>Address 1: </label></td>
							<td><input name="add1" type="text" /></td>
						</tr>
						<tr>
							<td><label>Address 2: </label></td>
							<td><input name="add2" type="text" /></td>
						</tr>
						<tr>
							<td><label>City: </label></td>
							<td><input name="city" type="text" /></td>
						</tr>
						<tr>
							<td><label>State: </label></td>
							<td><input name="state" type="text" /></td>
						</tr>
						<tr>
							<td><label>Zip Code: </label></td>
							<td><input name="zip" pattern="[0-9]{5}" type="text" /></td>
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