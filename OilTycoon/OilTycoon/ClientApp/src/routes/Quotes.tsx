import React, { useEffect, useState } from 'react';
import { Navigation, TitleArea } from '../components/Reusables';
import { FuelQuote, FuelQuoteClient, UserClient } from '../generated';

// HTML for user homepage
export function Quotes() {

	const roundTo2Decimals = (x: number) => Math.round(x * 100) / 100;
	const generateRandomGasPrice = () => roundTo2Decimals(Math.random() * 2 + 1);

	const [quantity, setQuantity] = useState(0);
	const [price, setPrice] = useState(0);
	const [address1, setAddress1] = useState('');
	const [address2, setAddress2] = useState('');
	const [city, setCity] = useState('');
	const [state, setState] = useState('');
	const [zip, setZip] = useState('');
	const [deliveryDate, setDeliveryDate] = useState('');

	useEffect(() => {
		const fetchData = async () => {
			// Load the address data and current suggested price
			const fuelClient = new FuelQuoteClient();
			const userClient = new UserClient();

			setPrice(await fuelClient.getSuggestedPrice());

			const myself = await userClient.getMyself();

			// TODO: use "myself" to set address data
			setAddress1('123 Fake St'); // could be `setAddress1(myself.address1)`
			setAddress2('Suite 42069'); // could be `setAddress2(myself.address2)`
			setCity('Houston'); // could be `setCity(myself.city)`
			setState('TX'); // could be `setState(myself.state)`
			setZip('77000'); // could be `setZip(myself.zip)`
		}
		fetchData();
	}, []);

	const getQuote = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const fuelClient = new FuelQuoteClient();
			const fuelQuote = await fuelClient.submitQuote(new FuelQuote({
				quantity: quantity,
				deliveryDate: new Date(deliveryDate).toLocaleDateString(),
			}));
			console.log(fuelQuote);
			alert('quote submitted!');
		}
		catch(err) {
			alert('quote failed to submit!');
		}
	}


	return (
		<div id="logged-in">
			<TitleArea />

			<Navigation />
			<div id="main">
				<div className="ptitle">
					<p className="ptitle">Get Your Free Quote</p>
				</div>
				<form id="quote-form" onSubmit={getQuote}>
					<table id="quote-wrapper">
						<tbody>
							<tr id="qty">
								<td className="section">Quantity</td>
								<td className="inputs">
									<table className="fields">
										<tbody>
											<tr>
												<td><input name="gallons" type="number" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} pattern="[0-9]" min="0" /></td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
							<tr id="add">
								<td className="section">Shipping Info</td>
								<td className="inputs">
									<table className="fields">
										<tbody>
											<tr className="input">
												<td colSpan={3}><input name="add1" type="text" max="100" value={address1} disabled required /></td>
											</tr>
											<tr className="labels">
												<td colSpan={3}><label data-name="add1">Address 1</label></td>
											</tr>
											<tr className="input">
												<td colSpan={3}><input name="add2" type="text" max="100" value={address2} disabled required /></td>
											</tr>
											<tr className="labels">
												<td colSpan={3}><label data-name="add2">Address 2</label></td>
											</tr>
											<tr className="input">
												<td><input name="city" type="text" max="100" value={city} disabled required /></td>
												<td>
													<select name="state" className="dropdown" value={state} disabled required>
														<option value="">&nbsp;</option>
														<option value="AL">AL</option>
														<option value="AK">AK</option>
														<option value="AZ">AZ</option>
														<option value="AR">AR</option>
														<option value="CA">CA</option>
														<option value="CO">CO</option>
														<option value="CT">CT</option>
														<option value="DE">DE</option>
														<option value="DC">DC</option>
														<option value="FL">FL</option>
														<option value="GA">GA</option>
														<option value="HI">HI</option>
														<option value="ID">ID</option>
														<option value="IL">IL</option>
														<option value="IN">IN</option>
														<option value="IA">IA</option>
														<option value="KS">KS</option>
														<option value="KY">KY</option>
														<option value="LA">LA</option>
														<option value="ME">ME</option>
														<option value="MD">MD</option>
														<option value="MA">MA</option>
														<option value="MI">MI</option>
														<option value="MN">MN</option>
														<option value="MS">MS</option>
														<option value="MO">MO</option>
														<option value="MT">MT</option>
														<option value="NE">NE</option>
														<option value="NV">NV</option>
														<option value="NH">NH</option>
														<option value="NJ">NJ</option>
														<option value="NM">NM</option>
														<option value="NY">NY</option>
														<option value="NC">NC</option>
														<option value="ND">ND</option>
														<option value="OH">OH</option>
														<option value="OK">OK</option>
														<option value="OR">OR</option>
														<option value="PA">PA</option>
														<option value="RI">RI</option>
														<option value="SC">SC</option>
														<option value="SD">SD</option>
														<option value="TN">TN</option>
														<option value="TX">TX</option>
														<option value="UT">UT</option>
														<option value="VT">VT</option>
														<option value="VA">VA</option>
														<option value="WA">WA</option>
														<option value="WV">WV</option>
														<option value="WI">WI</option>
														<option value="WY">WY</option>
													</select>
												</td>
												<td><input name="zip" type="text" pattern="[0-9]{4}" value={zip} disabled required /></td>
											</tr>
											<tr className="labels">
												<td><label>City</label></td>
												<td><label>State</label></td>
												<td><label>ZIP</label></td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
							<tr id="date">
								<td className="section">Delivery Date</td>
								<td className="inputs">
									<table className="fields">
										<tbody>
											<tr>
												<td><input name="delivery_date" type="date" value={deliveryDate} onChange={(e) => setDeliveryDate(e.target.value)} required /></td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
							<tr id="price">
								<td className="section">Suggested Price</td>
								<td className="inputs">
									<table className="fields">
										<tbody>
											<tr>
												<td><strong>${price} per gallon</strong></td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
							<tr id="total">
								<td className="section">Total Amount Due</td>
								<td className="inputs">
									<table className="fields">
										<tbody>
											<tr>
												<td><strong>${roundTo2Decimals(quantity * price)}</strong></td>
											</tr>
											<tr className="form-button">
												<td colSpan={3}><input type="submit" value="Get Quote" /></td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
				</form>
			</div>
		</div>
	);
}