import { Navigation, TitleArea } from '../../components/Reusables';

// HTML for user homepage
export function Quotes() {
	return (
		<div id="logged-in">
			<TitleArea />

			<Navigation />
			<div id="main">
				<div className="ptitle">
					<p className="ptitle">Get Your Free Quote</p>
				</div>
				<form id="quote-form">
					<table id="quote-wrapper">
						<tbody>
							<tr id="qty">
								<td className="section">Quantity</td>
								<td className="inputs">
									<table className="fields">
										<tbody>
											<tr>
												<td><input name="gallons" type="text" pattern="[0-9]" required /></td>
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
												<td data-name="city"><input name="city" type="text" max="100" required /></td>
												<td data-name="state">
													<select name="state" className="dropdown" defaultValue={""} required>
														<option value="">&nbsp;</option>
														<option value="AL">Alabama</option>
														<option value="AK">Alaska</option>
														<option value="AZ">Arizona</option>
														<option value="AR">Arkansas</option>
														<option value="CA">California</option>
														<option value="CO">Colorado</option>
														<option value="CT">Connecticut</option>
														<option value="DE">Delaware</option>
														<option value="DC">District Of Columbia</option>
														<option value="FL">Florida</option>
														<option value="GA">Georgia</option>
														<option value="HI">Hawaii</option>
														<option value="ID">Idaho</option>
														<option value="IL">Illinois</option>
														<option value="IN">Indiana</option>
														<option value="IA">Iowa</option>
														<option value="KS">Kansas</option>
														<option value="KY">Kentucky</option>
														<option value="LA">Louisiana</option>
														<option value="ME">Maine</option>
														<option value="MD">Maryland</option>
														<option value="MA">Massachusetts</option>
														<option value="MI">Michigan</option>
														<option value="MN">Minnesota</option>
														<option value="MS">Mississippi</option>
														<option value="MO">Missouri</option>
														<option value="MT">Montana</option>
														<option value="NE">Nebraska</option>
														<option value="NV">Nevada</option>
														<option value="NH">New Hampshire</option>
														<option value="NJ">New Jersey</option>
														<option value="NM">New Mexico</option>
														<option value="NY">New York</option>
														<option value="NC">North Carolina</option>
														<option value="ND">North Dakota</option>
														<option value="OH">Ohio</option>
														<option value="OK">Oklahoma</option>
														<option value="OR">Oregon</option>
														<option value="PA">Pennsylvania</option>
														<option value="RI">Rhode Island</option>
														<option value="SC">South Carolina</option>
														<option value="SD">South Dakota</option>
														<option value="TN">Tennessee</option>
														<option value="TX">Texas</option>
														<option value="UT">Utah</option>
														<option value="VT">Vermont</option>
														<option value="VA">Virginia</option>
														<option value="WA">Washington</option>
														<option value="WV">West Virginia</option>
														<option value="WI">Wisconsin</option>
														<option value="WY">Wyoming</option>
													</select>
												</td>
												<td data-name="zip"><input name="zip" type="number" pattern="[0-9]" max="9" required /></td>
											</tr>
											<tr className="labels">
												<td><label data-name="state">City</label></td>
												<td><label data-name="state">State</label></td>
												<td><label data-name="zip">ZIP</label></td>
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