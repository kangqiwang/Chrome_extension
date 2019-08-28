export default function products(state = [], action) {
	// console.log(action.type);
    switch(action.type) {
    	case 'RECIEVE_PRODUCTS':    	    
    		return [].concat(action.products)
    	case 'RECIEVE_ASIN':			    	    
    		return updatedAsin(state, action);
    	case 'RECIEVE_COMPETITIVE_PRICE':
    	    return updatePrice(state, action);
    	case 'RECIEVE_FEES':
    		return updateFees(state, action);
        default:
         return state;
    }
}


function updatedAsin(state, action) {
	var newState = [];

	state.map(function(product, index) {		
		if(index === action.indexId) {
			// console.log(action);
			product.asin = action.asin;
			product.asins = action.asins;
			product.amazonName = action.amazonName;
			product.amazonUrl = action.amazonUrl;
			product.amazonImage = action.amazonImage;
			newState.push(product);
		} else {
			newState.push(product);
		}
	})

	return newState;
}

function updatePrice(state, action) {
	var newState = [];

	state.map(function(product, index) {		
		if(index === action.indexId) {
			product.salesRank = action.salesRank;
			product.amazonPrice = action.price;
			newState.push(product);
		} else {
			newState.push(product);
		}
	})

	return newState;	
}

function updateFees(state, action) {
	var newState = [];
	
	state.map(function(product, index) {		
		if(index === action.indexId) {
			product.profit = action.profit;
			product.roi = action.roi;
			product.fees = action.fees;
			newState.push(product);
		} else {
			newState.push(product);
		}
	})

	return newState;
}