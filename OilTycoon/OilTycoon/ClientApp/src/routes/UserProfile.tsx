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
			company: e.target.elements.company.value,
			email: e.target.elements.email.value,
			phone: e.target.elements.phone.value,
			currentPw: e.target.elements.currentPw.value,
			newPw: e.target.elements.newPw.value,
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
							<td><label>Company: </label></td>
							<td><input name="company" type="text" /></td>
						</tr>
						<tr>
							<td><label>E-mail: </label></td>
							<td><input name="email" type="text" /></td>
						</tr>
						<tr>
							<td><label>Phone: </label></td>
							<td><input name="phone" pattern="[0-9]{10}" type="text" /></td>
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