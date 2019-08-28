

const addCurrencySymbol = function(country, price) {

	if(country === "uk") {
		price = "£" + parseFloat(price).toFixed(2); 
	} else {
		price = '$' + parseFloat(price).toFixed(2);
	}
	
	return price;
}

export default addCurrencySymbol;