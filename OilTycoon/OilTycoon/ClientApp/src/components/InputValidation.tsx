export const handleChange = (e: any) => {
	if (e.currentTarget.value.includes(" ")) {
		return false;
	}
}

/* prevent spaces in input fields where spaces are not valid */
export const handleKeyDown = (e: any) => {
	var key = e.key;

	if (key === " ") {
		e.preventDefault();
	}

	if (e.target.name === "zip") {
		var a = [];
		var k = e.which;

		for (var i = 48; i < 58; i++)
			a.push(i);

		if (!(a.indexOf(k) >= 0))
			e.preventDefault();
	}

	if (e.target.name === "state") {
		if ( key.toLowerCase() === key.toUpperCase() )
			e.preventDefault();
	}
}

export const toPascal = (s: any) => {
	return s.replace(/\w\S*/g,
		function (t: any) {
			return t.charAt(0).toUpperCase() + t.substr(1).toLowerCase();
		});
}