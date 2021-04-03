import React, { useState } from 'react';
import { Navigation, TitleArea } from '../components/Reusables';

// HTML for user homepage
export function Quotes() {

	const roundTo2Decimals = (x: number) => Math.round(x * 100) / 100;
	const generateRandomGasPrice = () => roundTo2Decimals(Math.random() * 2 + 1);

	const [quantity, setQuantity] = useState(0);
	const [price, setPrice] = useState(generateRandomGasPrice());

	const getQuote = (e: any) => {
		e.preventDefault();
		// let data = {
		// 	qty: e.target.elements.gallons.value,
		// 	add1: e.target.elements.add1.value,
		// 	add2: e.target.elements.add2.value,
		// 	city: e.target.elements.city.value,
		// 	state: e.target.elements.state.value,
		// 	zip: e.targe.t.elements.zip.value
		// }

		// check to make sure data is being filled out properly
		//console.log(data);
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
												<td><input name="gallons" type="number" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} pattern="[0-9]" required /></td>
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
												<td colSpan={3}><input name="add1" type="text" max="100" required /></td>
											</tr>
											<tr className="labels">
												<td colSpan={3}><label data-name="add1">Address 1</label></td>
											</tr>
											<tr className="input">
												<td colSpan={3}><input name="add2" type="text" max="100" required /></td>
											</tr>
											<tr className="labels">
												<td colSpan={3}><label data-name="add2">Address 2</label></td>
											</tr>
											<tr className="input">
												<td><input name="city" type="text" max="100" required /></td>
												<td>
													<select name="state" className="dropdown" defaultValue={""} required>
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
												<td><input name="zip" type="text" pattern="[0-9]{4}" required /></td>
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
												<td><input name="delivery_date" type="date" required /></td>
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
							<tr>
								<hr />
							</tr>
							<tr>
								<td className="section">Total Amount Due</td>
								<td className="inputs">
									<table className="fields">
										<tbody>
											<tr>
												<td><strong>${roundTo2Decimals(quantity * price)}</strong></td>
											</tr>
											<tr className="form-button">
												<td colSpan={3}><input type="submit" onClick={getQuote} value="Get Quote" /></td>
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