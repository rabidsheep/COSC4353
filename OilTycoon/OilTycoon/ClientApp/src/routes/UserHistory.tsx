import React, { useEffect, useState } from 'react';
import { Navigation, TitleArea } from '../components/Reusables';
import { FuelQuote, FuelQuoteClient } from '../generated';

// HTML for user homepage
export function UserHistory() {

	const [quotes, setQuotes] = useState<FuelQuote[]>([]);

	useEffect(() => {
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
	return (
		<tr>
			<td>{props.quote.id}</td>
			<td>{props.quote.quantity}</td>
			<td>N/A</td>
			<td>{props.quote.deliveryDate}</td>
			<td>{props.quote.price}</td>
			<td>{props.quote.totalDue}</td>
		</tr>
	);
}