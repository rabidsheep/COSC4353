import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, FormikHelpers, useFormikContext } from 'formik';
import * as Yup from 'yup';

import { Navigation, TitleArea } from '../components/Reusables';
import { FuelQuote, FuelQuoteClient, UserClient } from '../generated';

// A child component is necessary to use the "useFormikContext" hook
// With that hook, we can populate the form with server data
function DataFetcher() {
	const ctx = useFormikContext();

	useEffect(() => {
		const fetchData = async () => {
			try {
				// Load the address data and current suggested price
				const fuelClient = new FuelQuoteClient();
				const userClient = new UserClient();

				ctx.setFieldValue('price', await fuelClient.getSuggestedPrice(), true);

				const myself = await userClient.getMyself();

				ctx.setFieldValue('address1', myself.address1!, true);
				ctx.setFieldValue('address2', myself.address2!, true);
				ctx.setFieldValue('city', myself.city!, true);
				ctx.setFieldValue('state', myself.state!, true);
				ctx.setFieldValue('zip', myself.zipCode!, true);
			}
			catch(err) {
				console.warn('there was an issue prefilling the form fields')
				console.error(err);
			}
		}
		fetchData();
	}, []);
	
	return null;
}

// Main Quote submission component
export function Quotes() {

	const roundTo2Decimals = (x: number) => (Math.round(x * 100) / 100).toFixed(2);
	const generateRandomGasPrice = () => roundTo2Decimals(Math.random() * 2 + 1);

	interface QuoteFields {
		quantity: number;
		price: number;
		address1: string;
		address2: string;
		city: string;
		state: string;
		zip: string;
		delivery_date: string;
	}

	const onSubmit = async (values: QuoteFields, actions: FormikHelpers<QuoteFields>) => {
		actions.setSubmitting(true);
		try {
			const fuelClient = new FuelQuoteClient();
			const fuelQuote = await fuelClient.submitQuote(new FuelQuote({
				quantity: values.quantity,
				deliveryDate: new Date(values.delivery_date).toLocaleDateString(),
			}));
			console.log(fuelQuote);
			alert('quote submitted!');
			actions.resetForm();
		}
		catch (err) {
			alert('quote failed to submit!');
		}
		actions.setSubmitting(false);
	}


	return (
		<div id="logged-in">
			<TitleArea />

			<Navigation />
			<div id="main">
				<div className="ptitle">
					<p className="ptitle">Get Your Free Quote</p>
				</div>
				<Formik<QuoteFields>
					initialValues={{
						quantity: 0,
						price: 0,
						address1: '',
						address2: '',
						city: '',
						state: '',
						zip: '',
						delivery_date: '',
					}}
					validationSchema={Yup.object({
						quantity: Yup.number()
							.min(1, 'Must be at least 1 gallon'),
						price: Yup.number()
							.min(0.01, 'Must not be free'),
						address1: Yup.string()
							.max(100, 'Must be less than 100 characters')
							.required('Address must be provided'),
						address2: Yup.string()
							.max(100, 'Must be less than 100 characters'),
						city: Yup.string()
							.max(100, 'Must be less than 100 characters')
							.required('City must be provided'),
						state: Yup.string()
							.max(100, 'Must be less than 100 characters')
							.required('State must be provided'),
						zip: Yup.string()
							.max(100, 'Must be less than 100 characters')
							.matches(/[0-9]{5}/, 'Must be a 5 digit number')
							.required('Zip-code must be provided.'),
						delivery_date: Yup.date() // This calculates the next midnight: https://stackoverflow.com/a/15790005
							.min(new Date(new Date().setHours(24, 0, 0, 0)), 'The earliest you can request a delivery is tomorrow')
							.required('Delivery date must be provided')
					})}
					onSubmit={onSubmit}>
					{({ isSubmitting, isValid, errors, values }) => (
						<Form>
							<DataFetcher />
							<table id="quote-wrapper">
								<tbody>
									<tr id="qty">
										<td className="section">Quantity</td>
										<td className="inputs">
											<table className="fields">
												<tbody>
													<tr>
														<td>
															<Field name="quantity" type="number" min={0} disabled={isSubmitting} />
														</td>
														<td colSpan={4} className="errors">
															{ errors.quantity ? 
															<label>{errors.quantity}</label>
															: <></> }
														</td>
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
														<td colSpan={3}>
															<Field name="address1" type="text" disabled />
														</td>
														<td colSpan={4} className="errors">
															{ errors.address1 ? 
															<label>{errors.address1}</label>
															: <></> }
														</td>
													</tr>
													<tr className="labels">
														<td colSpan={3}><label data-name="address1">Address 1</label></td>
													</tr>
													<tr className="input">
														<td colSpan={3}>
															<Field name="address2" type="text" disabled />
														</td>
														<td colSpan={4} className="errors">
															{ errors.address2 ? 
															<label>{errors.address2}</label>
															: <></> }
														</td>
													</tr>
													<tr className="labels">
														<td colSpan={3}><label data-name="add2">Address 2</label></td>
													</tr>
													<tr className="input">
														<td>
															<Field name="city" type="text" disabled />
														</td>
														<td>
															<Field as="select" name="state" className="dropdown" disabled>
															{/* <select name="state" className="dropdown" value={state} disabled required> */}
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
															{/* </select> */}
															</Field>
														</td>
														<td>
															<Field name="zip" type="text" disabled />
														</td>
													</tr>
													<tr className="labels">
														<td><label>City</label></td>
														<td><label>State</label></td>
														<td><label>ZIP</label></td>
													</tr>
													<tr>
														<td colSpan={3} className="errors">
															{ errors.city ? 
															<label>{errors.city}</label>
															: <></> }
															&nbsp;
															{ errors.state ? 
															<label>{errors.state}</label>
															: <></> }
															&nbsp;
															{ errors.zip ? 
															<label>{errors.zip}</label>
															: <></> }
														</td>
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
														<td>
															<Field name="delivery_date" type="date" disabled={isSubmitting} />
														</td>
														<td colSpan={4} className="errors">
															{ errors.delivery_date ? 
															<label>{errors.delivery_date}</label>
															: <></> }
														</td>
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
														<td><strong>${values.price} per gallon</strong></td>
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
														<td><strong>${roundTo2Decimals(values.quantity * values.price)}</strong></td>
													</tr>
													<tr className="form-button">
														<td colSpan={3}>
															<input type="submit" value="Get Quote" disabled={isSubmitting || !isValid} />
														</td>
													</tr>
												</tbody>
											</table>
										</td>
									</tr>
								</tbody>
							</table>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
}