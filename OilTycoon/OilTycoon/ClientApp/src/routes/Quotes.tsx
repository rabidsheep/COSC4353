import React, { useEffect, Component } from 'react';
import { Formik, Field, Form, FormikHelpers, useFormikContext } from 'formik';
import * as Yup from 'yup';
import DropDown from '../components/DropDown';
import { ValidationBox } from '../components/InputValidation';
import { Navigation, TitleArea, states } from '../components/Reusables';
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

	return <Field component={ValidationBox} className="floating-label" name="quantity" type="number" min={0} disabled={isSubmitting} onClick={handleUpdate} onKeyUp={handleUpdate} />
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

interface MyProps {

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
								<div className="top-grid">
										<label className="section"><h3>Quantity</h3></label>
									<div className="inputs qty">
										<div id="qty" className="field floating-label">
											<QuantityField />
											{errors.quantity && touched.quantity ? <span className="errors">{errors.quantity}</span> : <></>}
										</div>
									</div>

									<label className="section"><h3>Shipping Info</h3></label>
									<div className="inputs shipping">
											<div className="field-row">
												<div id="add1" className="field floating-label">
													<Field component={ValidationBox} name="address1" className="floating-label" placeholder="Address 1" type="text" disabled={isSubmitting} />
													<div className="label-wrapper"><label className="floating-label" htmlFor="address1">Address 1</label></div>
													{errors.address1 && touched.address1 ? <span className="errors">{errors.address1}</span> : <></>}
												</div>
											</div>

											<div className="field-row">
												<div id="add2" className="field floating-label">
													<Field component={ValidationBox} name="address2" className="floating-label" placeholder="Address 2" type="text" disabled={isSubmitting} />
													<div className="label-wrapper"><label className="floating-label" htmlFor="address2">Address 2 (Optional)</label></div>
													{errors.address2 && touched.address2 ? <span className="errors">{errors.address2}</span> : <></>}
												</div>
											</div>

											<div className="field-row">
												<div className="grid-container csz">
													<div id="city" className="field floating-label">
														<Field component={ValidationBox} name="city" className="floating-label" placeholder="City" type="text" disabled={isSubmitting} />
														<div className="label-wrapper"><label className="floating-label" htmlFor="city">City</label></div>
														{errors.city && touched.city ? <span className="errors">{errors.city}</span> : <></>}
													</div>

													<div id="state" className="field floating-label">
														<Field component={DropDown} name="state" options={states} maxLength={2} className="select floating-label" placeholder="" />
														{errors.state && touched.state ? <span className="errors">{errors.state}</span> : <></>}
													</div>

													<div id="zip" className="field floating-label">
														<Field component={ValidationBox} name="zip" className="floating-label" placeholder="zip" type="text" maxLength={5} disabled={isSubmitting} />
														<div className="label-wrapper"><label className="floating-label" htmlFor="zip">Zip Code</label></div>
														{errors.zip && touched.zip ? <span className="errors">{errors.zip}</span> : <></>}
													</div>
												</div>
											</div>
									</div>

									<label className="section"><h3>Delivery Date</h3></label>
									<div className="inputs delivery">
											<div id="delivery-date" className="field floating-label">
											<Field component={ValidationBox} name="delivery_date" className="floating-label" type="date" disabled={isSubmitting} />
											{errors.delivery_date ? <span className="errors">{errors.delivery_date}</span> : <></>}
										</div>
									</div>
								</div>

								<div className="bottom-grid">
									<div className="bottom-grid__pricing">
										<label className="section"><h3>Suggested Price</h3></label>
										<div className="inputs price">
												<strong>${roundTo2Decimals(values.price)} per gallon</strong>
										</div>

											<label className="section"><h3>Total Amount Due</h3></label>
										<div className="inputs total">
											<strong>${roundTo2Decimals(values.quantity * values.price)}</strong>
										</div>
									</div>

									<div className="bottom-grid__button-area">
										<button className="form-button" type="submit" disabled={isSubmitting || !isValid}>Get Quote</button>
									</div>
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