import { getIn } from 'formik';


export function getStyles(touched: any, errors: any, fieldName: any) {
	if (getIn(errors, fieldName) && getIn(touched, fieldName)) {
			if (touched) {
				return {
					borderBottom: '1px solid red',
					backgroundColor: 'rgb(203, 173, 173, 0.5)',
				}
			}
		}
}

export function ValidationBox({ field, form: { errors, touched }, ...props }: { field: any, form: any}) {

	return (
		<input
			{...field}
			{...props}
			style={getStyles(touched, errors, field.name)} />
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