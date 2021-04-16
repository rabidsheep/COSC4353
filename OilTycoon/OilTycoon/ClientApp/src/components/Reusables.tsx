import React from 'react';
import { NavLink } from 'react-router-dom';

import wordart from '../assets/wordart.png';

/* nav bar */
export function Navigation() {
	return (
		<div id="navigation-wrapper">
			<div id="navigation">
				<NavLink to="/quote">Get A Quote</NavLink>
				<NavLink to="/history">User History</NavLink>
				<NavLink to="/profile">User Profile</NavLink>
				<NavLink to="/contact">Contact Us</NavLink>
				<NavLink to="/logout">Log Out</NavLink>
			</div>
		</div>
	);
}

/* title area */
export function TitleArea() {

	return (
		<div className="logo">
			<img style={{ width: '100%', maxWidth: '300px' }} src={wordart} />
		</div>
	);

	//return <div className="logo"><h3>Title</h3></div>
}

/* function to transform strings to pascalcase -
 every word has first letter capitalized */
export const toPascal = (s: any) => {
	return s.replace(/\w\S*/g,
		function (t: any) {
			return t.charAt(0).toUpperCase() + t.substr(1).toLowerCase();
		});
}