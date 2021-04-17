import React, { useEffect, useState } from 'react';
import { Navigation, TitleArea } from '../components/Reusables';
import { FuelQuote, FuelQuoteClient } from '../generated';
import '../styles/Auth.css';

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
		<div id="quotes" className="body-wrapper auth">
			<div className="flex-container sidebar">
				<div className="sticky-wrapper">
					<Navigation />
				</div>
			</div>

			<div className="flex-container main">
				<div className="main-bg" />
				<div className="main">
					<TitleArea />
					<div className="ptitle">
						<h2>Your User History</h2>
					</div>
					<div id="history-wrapper">
						<table id="history-table">
							<thead>
								<tr>
									<th>Ref #</th>
									<th>Qty</th>
									<th>Delivery Address</th>
									<th>Delivery Date</th>
									<th>Suggested Price</th>
									<th>Total Due</th>
								</tr>
							</thead>
							<tbody>
								{quotes.map(e => <UserHistoryRow key={e.id} quote={e} />)}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
}

export function UserHistoryRow(props: { quote: FuelQuote }) {
	const { id, quantity, deliveryDate, price, totalDue, address1, address2, city, state, zipCode } = props.quote;
	let addStr = address1 + ', ';
	if (address2 !== '' && address2 !== ' ' && address2 != null) {
		addStr += address2 + ', ';
	}
	addStr += city + ', ' + state + ' ' + zipCode;
	return (
		<tr>
			<td>{id}</td>
			<td>{quantity}</td>
			<td><small>{`${addStr}`}</small></td>
			<td>{deliveryDate}</td>
			<td>{price}</td>
			<td>{totalDue}</td>
		</tr>
	);
}