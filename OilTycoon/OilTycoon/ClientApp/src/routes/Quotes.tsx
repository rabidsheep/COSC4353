import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, FormikHelpers, useFormikContext } from 'formik';
import * as Yup from 'yup';

import { Navigation, TitleArea } from '../components/Reusables';
import { FuelQuote, FuelQuoteClient, UserClient } from '../generated';
import '../styles/Auth.css';

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

	return <Field name="quantity" type="number" min={0} disabled={isSubmitting} onClick={handleUpdate} onKeyUp={handleUpdate} />
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
					<div id="quote-wrapper">
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
					{({ isSubmitting, isValid, errors, touched, values }) => (
							<Form className="userform">
								<DataFetcher />
								<div className="grid">
									<label className="section">Quantity</label>
									<div className="inputs qty">
										<QuantityField />
										{errors.quantity && touched.quantity ? <span className="errors">{errors.quantity}</span> : <></>}
									</div>

									<label className="section">Shipping Info</label>
									<div className="inputs shipping">
										<div className="field-row">
											<div id="add1" className="field floating-label">
												<Field name="address1" className="floating-label" type="text" disabled />
												<label htmlFor="address1" className="floating-label">Address 1</label>
												{errors.address1 && touched.address1 ? <span className="errors">{errors.address1}</span> : <></>}
											</div>
										</div>

										<div className="field-row">
											<div id="add2" className="field floating-label">
												<Field name="address2" className="floating-label" type="text" disabled />
												<label htmlFor="address2" className="floating-label">Address 2</label>
													{errors.address2 && touched.address2 ? <span className="errors">{errors.address2}</span> : <></>}
											</div>
										</div>

										<div className="field-row">
											<div className="grid-container csz">
												<div id="city" className="field floating-label">
													<Field name="city" className="floating-label" type="text" disabled />
													<label htmlFor="city" className="floating-label">City</label>
												</div>

												<div id="state" className="field floating-label">
													<Field as="select" name="state" className="floating-label" disabled>
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
													<label htmlFor="state" className="floating-label">State</label>
												</div>

												<div id="zip" className="field floating-label">
													<Field name="zip" className="floating-label" type="text" disabled />
													<label htmlFor="zip" className="floating-label">Zip Code</label>
												</div>
												{errors.city && touched.city ? <span className="errors">{errors.city}</span> : <></>}
												{errors.state && touched.state ? <span className="errors">{errors.state}</span> : <></>}
												{errors.zip && touched.zip ? <span className="errors">{errors.zip}</span> : <></>}
											</div>
										</div>
									</div>

									<label className="section">Delivery Date</label>
									<div className="inputs delivery">
										<div id="delivery-date" className="field floating-label">
											<Field name="delivery_date" type="date" disabled={isSubmitting} />
											{errors.delivery_date ? <span className="errors">{errors.delivery_date}</span> : <></>}
										</div>
									</div>

									<label className="section">Suggested Price</label>
									<div className="inputs price">
											<strong>${roundTo2Decimals(values.price)} per gallon</strong>
									</div>

									<label className="section">Total Amount Due</label>
									<div className="inputs total">
										<strong>${roundTo2Decimals(values.quantity * values.price)}</strong>
									</div>
								</div>

								<div className="button-area">
									<button type="submit" disabled={isSubmitting || !isValid}>Get Quote</button>
								</div>
							</Form>
						)}
						</Formik>
					</div>
				</div>
			</div>
		</div>
	);
}