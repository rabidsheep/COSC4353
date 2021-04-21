import React from 'react';
import { NavLink } from 'react-router-dom';

import wordart from '../assets/wordart.png';

export const states = [
	{ value: '', label: '' },
	{ value: 'AL', label: 'AL' },
	{ value: 'AK', label: 'AK' },
	{ value: 'AZ', label: 'AZ' },
	{ value: 'AR', label: 'AR' },
	{ value: 'CA', label: 'CA' },
	{ value: 'CO', label: 'CO' },
	{ value: 'CT', label: 'CT' },
	{ value: 'DE', label: 'DE' },
	{ value: 'DC', label: 'DC' },
	{ value: 'FL', label: 'FL' },
	{ value: 'GA', label: 'GA' },
	{ value: 'HI', label: 'HI' },
	{ value: 'ID', label: 'ID' },
	{ value: 'IL', label: 'IL' },
	{ value: 'IN', label: 'IN' },
	{ value: 'IA', label: 'IA' },
	{ value: 'KS', label: 'KS' },
	{ value: 'KY', label: 'KY' },
	{ value: 'LA', label: 'LA' },
	{ value: 'ME', label: 'ME' },
	{ value: 'MD', label: 'MD' },
	{ value: 'MA', label: 'MA' },
	{ value: 'MI', label: 'MI' },
	{ value: 'MN', label: 'MN' },
	{ value: 'MS', label: 'MS' },
	{ value: 'MO', label: 'MO' },
	{ value: 'MT', label: 'MT' },
	{ value: 'NE', label: 'NE' },
	{ value: 'NV', label: 'NV' },
	{ value: 'NH', label: 'NH' },
	{ value: 'NJ', label: 'NJ' },
	{ value: 'NM', label: 'NM' },
	{ value: 'NY', label: 'NY' },
	{ value: 'NC', label: 'NC' },
	{ value: 'ND', label: 'ND' },
	{ value: 'OH', label: 'OH' },
	{ value: 'OK', label: 'OK' },
	{ value: 'OR', label: 'OR' },
	{ value: 'PA', label: 'PA' },
	{ value: 'RI', label: 'RI' },
	{ value: 'SC', label: 'SC' },
	{ value: 'SD', label: 'SD' },
	{ value: 'TN', label: 'TN' },
	{ value: 'TX', label: 'TX' },
	{ value: 'UT', label: 'UT' },
	{ value: 'VT', label: 'VT' },
	{ value: 'VA', label: 'VA' },
	{ value: 'WA', label: 'WA' },
	{ value: 'WV', label: 'WV' },
	{ value: 'WI', label: 'WI' },
	{ value: 'WY', label: 'WY' }];

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