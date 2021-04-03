import React, { useEffect, useState } from 'react';
import { Navigation, TitleArea } from '../components/Reusables';
import { FuelQuote, FuelQuoteClient } from '../generated';

// HTML for user homepage
export function UserHistory() {

	const [quotes, setQuotes] = useState<FuelQuote[]>([]);

	useEffect(() => {
		// Load quotes and put them here
		const fetchData = async () => {
			const fuelClient = new FuelQuoteClient();
			const quotes = await fuelClient.getAllForCurrentUser();
			console.log(quotes);
			setQuotes([...quotes]);
		};
		fetchData();
	}, []);

	return (
		<div id="logged-in">
			<TitleArea />

			<Navigation />
			<div id="main">
				<div className="ptitle">
					<p className="ptitle">Your Quote History</p>
				</div>
				<table id="history-table">
					<thead>
						<tr>
							<th>Reference Number</th>
							<th>Quantity</th>
							<th>Delivery Address</th>
							<th>Delivery Date</th>
							<th>Suggested Price</th>
							<th>Total Amount Due</th>
						</tr>
					</thead>
					<tbody>
						{quotes.map(e => <UserHistoryRow key={e.id} quote={e} />)}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export function UserHistoryRow(props: { quote: FuelQuote }) {
	const {id, quantity, deliveryDate, price, totalDue, address1, address2, city, state, zipCode } = props.quote;
	return (
		<tr>
			<td>{id}</td>
			<td>{quantity}</td>
			<td><small>{`${address1}, ${address2}, ${city}, ${state}, ${zipCode}`}</small></td>
			<td>{deliveryDate}</td>
			<td>{price}</td>
			<td>{totalDue}</td>
		</tr>
	);
}