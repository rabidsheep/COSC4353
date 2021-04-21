import React from 'react';
import { NavLink } from 'react-router-dom';

import wordart from '../assets/wowoil2.png';

/* nav bar */
export function Navigation() {
	return (
		<div className="navigation-wrapper">
			<ul className="navigation">
				<li><NavLink to="/quote">Get A Quote</NavLink></li>
				<li><NavLink to="/history">User History</NavLink></li>
				<li><NavLink to="/profile">User Profile</NavLink></li>
				<li><NavLink to="/logout">Log Out</NavLink></li>
			</ul>
		</div>
	);
}

/* title area */
export function TitleArea() {

	return (
		<div className="logo">
			<img style={{ width: '100%', maxWidth: '500px', padding: '2%' }} src={wordart} />
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