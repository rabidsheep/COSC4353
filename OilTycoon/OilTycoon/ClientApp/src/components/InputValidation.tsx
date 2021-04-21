import { getIn } from 'formik';


export function changeBorder(touched: any, errors: any, fieldName: any, disabled: any) {
	if (getIn(errors, fieldName) && getIn(touched, fieldName) && !disabled) {
		if (touched) {
			return { borderBottom: '1px solid red' }
		}
	}
}

function changeBackground(touched: any, errors: any, fieldName: any, disabled: any) {
	if (getIn(errors, fieldName) && getIn(touched, fieldName) && !disabled) {
		console.log(disabled);
		if (touched) {
			return { backgroundColor: 'rgba(216, 148, 148, 0.5)' }
		}
	}
}

export function ValidateInput({ field, disabled, form: { errors, touched }, ...props }: { field: any, disabled: any, form: any }) {

	return (
		<div
			className="border-wrapper"
			style={changeBorder(touched, errors, field.name, disabled)} >
			<input
				{...field}
				{...props}
				disabled={disabled}
				style={changeBackground(touched, errors, field.name, disabled)} />
		</div>
	);
}

export function ValidateSelect({ field, disabled, form: { errors, touched }, ...props }: { field: any, disabled: any, form: any }) {

	return (
		<div
			className="border-wrapper"
			style={changeBorder(touched, errors, field.name, disabled)} >
				<select
				{...field}
				{...props}
				disabled={disabled}
				style={changeBackground(touched, errors, field.name, disabled)}			/>
		</div>
	);
}

export const handleChange = (e: any) => {
	if (e.currentTarget.value.includes(" "))
		return false;
}

/* prevent spaces in input fields where spaces are not valid */
export const handleKeyDown = (e: any) => {
	var key = e.key;

	if (key === " ")
		e.preventDefault();

	if (e.target.name === "zip") {
		var a = [];
		var k = e.which;

		for (var i = 48; i < 58; i++)
			a.push(i);

		if (!(a.indexOf(k) >= 0))
			e.preventDefault();
	}

	if (e.target.name === "state") {
		if (key.toLowerCase() === key.toUpperCase())
			e.preventDefault();
	}
}