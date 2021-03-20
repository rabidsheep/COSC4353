import React from 'react';
import { NavLink } from 'react-router-dom';

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

export function TitleArea() {
	return (
		<div id="logo">
			<p>Title</p>
		</div>
	)
}