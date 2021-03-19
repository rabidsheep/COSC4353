import { Navigation, TitleArea } from './Reusables';

// HTML for user homepage
export default function Logout() {
	return (
		<div id="logged-in">
			<TitleArea />

			<Navigation />
			<div id="main">
				<p>This is the logout page</p>
			</div>
		</div>
	);
}