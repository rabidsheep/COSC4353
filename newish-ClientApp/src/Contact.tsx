import { Navigation, TitleArea } from './Reusables';

// HTML for user homepage
export default function Contact() {
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