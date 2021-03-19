import { Navigation, TitleArea } from '../../components/Reusables';

// HTML for user profile
export function UserProfile() {
	return (
		<div id="logged-in">
			<TitleArea />

			<Navigation />
			<div id="main">
				<div className="ptitle">
					<p className="ptitle">Your User Profile</p>
				</div>

				<form id="profile-form">
					<table id="profile-wrapper" data-loginrequired>
						<tr>
							<td><label>First Name: </label></td>
							<td><input name="first-name" type="text" /></td>
						</tr>
						<tr>
							<td><label>Last Name: </label></td>
							<td><input name="last-name" type="text" /></td>
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
							<td><input name="phone" type="number" /></td>
						</tr>
						<tr>
							<td><label>Current Password: </label></td>
							<td><input name="current-password" type="text" /></td>
						</tr>
						<tr>
							<td><label>New Password: </label></td>
							<td><input name="new-password" type="text" /></td>
						</tr>
					</table>
					<button type="submit">Update</button>
				</form>
			</div>
		</div>
	);
}