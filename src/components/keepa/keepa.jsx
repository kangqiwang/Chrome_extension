import React from 'react';
class Keepa extends React.Component{

	render() {

		var domain = this.props.country === 'uk' ? 'co.uk' : 'com';
 		var keepaGraphImg = "https://dyn.keepa.com/pricehistory.png?salesrank=1&asin=" + this.props.asin + "&domain=" + domain;

		return (
			<div className="keepa">
				<div>
					<img className="keepa-graph" alt="Keepa Graph" src={keepaGraphImg} />
					<a className="button" id="wish-list-btn">Add to wish list</a>
					<a className="button" id="button-red">Not Interested</a>
				</div>
			</div>

		)
	}
}

export default Keepa;
