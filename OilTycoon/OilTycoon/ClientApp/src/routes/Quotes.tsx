import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, FormikHelpers, useFormikContext } from 'formik';
import * as Yup from 'yup';

import { ValidateInput, ValidateSelect } from '../components/InputValidation';
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

				const myself = await userClient.getMyself();

				ctx.setFieldValue('address1', myself.address1!, true);
				ctx.setFieldValue('address2', myself.address2!, true);
				ctx.setFieldValue('city', myself.city!, true);
				ctx.setFieldValue('state', myself.state!, true);
				ctx.setFieldValue('zip', myself.zipCode!, true);

				ctx.setFieldValue('price', await fuelClient.getSuggestedPrice(0, myself.state), true);
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

function QuantityField() {
	const { isSubmitting, setFieldValue, values } = useFormikContext<QuoteFields>();

	const handleUpdate = async () => {
		const fuelClient = new FuelQuoteClient();
		setFieldValue('price', await fuelClient.getSuggestedPrice(values.quantity || 0, values.state || ''), true);
	}

	// We can't listen to the event "onChange" because it breaks formik for some reason, so we have to listen to alternative
	// ways of knowing when the field has changed

	return <Field component={ValidateInput} name="quantity" type="number" min={0} disabled={isSubmitting} onClick={handleUpdate} onKeyUp={handleUpdate} />
}

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

// Main Quote submission component
export function Quotes() {

	const roundTo2Decimals = (x: number) => (Math.round(x * 100) / 100).toFixed(2);
	const generateRandomGasPrice = () => roundTo2Decimals(Math.random() * 2 + 1);

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
						<h2>Get Your Free Quote</h2>
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
							.min(1, 'Must be at least 1 gallon')
							.required('Required'),
						price: Yup.number()
							.min(0.01, 'Must not be free')
							.required('Required'),
						address1: Yup.string()
							.max(100, 'Must be less than 100 characters')
							.required('Required'),
						address2: Yup.string()
							.max(100, 'Must be less than 100 characters'),
						city: Yup.string()
							.max(100, 'Must be less than 100 characters')
							.required('Required'),
						state: Yup.string()
							.max(100, 'Must be less than 100 characters')
							.required('Required'),
						zip: Yup.string()
							.max(100, 'Must be less than 100 characters')
							.matches(/[0-9]{5}/, 'Must be a 5 digit number')
							.required('Required'),
						delivery_date: Yup.date() // This calculates the next midnight: https://stackoverflow.com/a/15790005
							.min(new Date(new Date().setHours(24, 0, 0, 0)), 'The earliest you can request a delivery is tomorrow')
							.required('Required'),
					})}
					onSubmit={onSubmit}>
						{({ isSubmitting, isValid, errors, touched, values }: { isSubmitting: any, isValid: any, errors: any, touched: any, values: any }) => (
							// or this can be left as: { isSubmitting, isValid, errors, touched, values } only, but to avoid errors, we explicitly init as 'any'
							<Form id="quotes-form" className="userform">
								<div id="quote-wrapper">
								<DataFetcher />
									<div className="top-grid">
										<label className="section qty"><h3>Quantity</h3></label>
										<div className="inputs qty">
											<div className="field-row">
												<div id="qty" className="field floating-label">
													<QuantityField />
													{/*errors.quantity && touched.quantity ? <span className="errors">{errors.quantity}</span> : <></>*/}
												</div>
											</div>
										</div>

										<label className="section shipping"><h3>Shipping Info</h3></label>
										<div className="inputs shipping">
											<div className="field-row">
												<div id="add1" className="field floating-label">
													<Field component={ValidateInput} name="address1" className="floating-label" type="text" disabled />
													<label className="floating-label" htmlFor="address1">Address 1</label>
													{/*errors.address1 && touched.address1 ? <span className="errors">{errors.address1}</span> : <></>*/}
												</div>
											</div>

											<div className="field-row">
												<div id="add2" className="field floating-label">
													<Field component={ValidateInput} name="address2" className="floating-label" type="text" disabled />
													<label className="floating-label" htmlFor="address2">Address 2 (Optional)</label>
												</div>
											</div>

											<div className="field-row">
												<div className="grid-container csz">
													<div id="city" className="field floating-label">
														<Field component={ValidateInput} name="city" className="floating-label" type="text" disabled />
														<label className="floating-label" htmlFor="city">City</label>
													</div>

													<div id="state" className="field floating-label">
														<Field component={ValidateSelect} as="select" name="state" className="floating-label" disabled>
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
														</Field>
														<label className="floating-label" htmlFor="state">State</label>
													</div>

													<div id="zip" className="field floating-label">
														<Field component={ValidateInput} name="zip" className="floating-label" type="text" disabled />
														<label className="floating-label" htmlFor="zip">Zip Code</label>
													</div>
												</div>
												<div className="error">
													{/*{errors.city && touched.city ? <span className="errors">{errors.city}</span> : <></>}
													{errors.state && touched.state ? <span className="errors">{errors.state}</span> : <></>}
													{errors.zip && touched.zip ? <span className="errors">{errors.zip}</span> : <></>}*/}
												</div>
											</div>
										</div>

										<label className="section delivery"><h3>Delivery Date</h3></label>
										<div className="inputs delivery">
											<div id="delivery-date" className="field floating-label">
												<Field component={ValidateInput} name="delivery_date" className="floating-label" type="date" disabled={isSubmitting} />
												{errors.delivery_date && touched.delivery_date ? <span className="errors">{errors.delivery_date}</span> : <></>}
											</div>
										</div>
									</div>

									<div className="bottom-grid">
										<div className="bottom-grid__pricing">
											<label className="section"><h3>Suggested Price</h3></label>
											<div className="inputs price">
												<div id="price" className="field floating-label">
													<div className="border-wrapper">
														<p>${roundTo2Decimals(values.price)} per gallon</p>
													</div>
												</div>
											</div>

											<label className="section"><h3>Total Amount Due</h3></label>
											<div className="inputs total">
												<div id="total" className="field floating-label">
													<div className="border-wrapper">
														<p>${roundTo2Decimals(values.quantity * values.price)}</p>
													</div>
												</div>
											</div>
										</div>

										<div className="bottom-grid__button-area">
											<button className="form-button" type="submit" disabled={isSubmitting || !isValid}>Get Quote</button>
										</div>
									</div>
								</div>
							</Form>
						)}
					</Formik>
				</div>
			</div>
		</div>
	);
}