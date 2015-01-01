function bodyParser(string) {
	var isKey = true,
	result = {},
	key = "",
	value = "",
	parsedVal = "";
	
	for (var i = 0, length = string.length; i < length; i++) {

		if ((string[i] !== '=' && string[i] !== '&')) {
			if (string[i] === '%') {
				parsedVal = decodePercent("%" + string[i+1] + string[i + 2]);
				i += 2;
			}
			parsedVal.length ? (isKey ? key += parsedVal : value += parsedVal) : (isKey ? key += string[i] : value += string[i]);
			if (parsedVal.length) parsedVal = "";
			if (i === length - 1) result[key] = value;
		}
		else if (string[i] === '=')
			isKey = false;
		else {
			isKey = true,
			result[key] = value,
			key = "",
			value = "";
		}
	}
	return result;
}

function decodePercent(string) {
	var table = {
		"%0A": "\n",
		"%0D": "\n",
		"%0D%0A": "\n",
		"%20": " ",
		"%22": "\"",
		"%25": "%",
		"%2D": "-",
		"%2E": ".",
		"%3C": "<",
		"%3E": ">",
		"%5C": "\\",
		"%5E": "^",
		"%5F": "_",
		"%60": "`",
		"%7B": "{",
		"%7C": "|",
		"%7D": "}",
		"%7E": "~",
		"%21": "!",
		"%23": "#",
		"%24": "$",
		"%26": "&",
		"%27": "'",
		"%28": "(",
		"%29": ")",
		"%2A": "*",
		"%2B": "+",
		"%2C": ",",
		"%2F": "/",
		"%3A": ":",
		"%3B": ";",
		"%3D": "=",
		"%3F": "?",
		"%40": "@",
		"%5B": "[",
		"%5D": "]"
	}
	return table[string];
}

var s = "firstName=Mark&lastName=Brown&email=mark.philosophe%40gmail.com&phoneNumber=%28845%29+853-6256";
console.log(bodyParser(s));

// firstName=Mark&lastName=Brown&email=mark.philosophe%40gmail.com&phoneNumber=%28845%29+853-6256