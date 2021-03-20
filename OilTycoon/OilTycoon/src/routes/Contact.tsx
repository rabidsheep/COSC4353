import { Navigation, TitleArea } from '../components/Reusables';

// HTML for user homepage
export function Contact() {
	return (
		<div id="logged-in">
			<TitleArea />

			<Navigation />
			<div id="main">
				<p>This is the contact page</p>
			</div>
		</div>
	);
}