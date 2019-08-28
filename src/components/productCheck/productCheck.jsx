import React from 'react';

class ProductCheck extends React.Component{
  
	render() {
	  return (
	  <div className="description clearfix">
        <div className="column compare">
          <h3 className="no-wrap">Amazon Title</h3>
          <p><a href={this.props.data.amazonUrl} target="_blank">{this.props.data.amazonName}</a></p>
          <h3 className="no-wrap">Retailer Title</h3>
          <p><a href={this.props.data.url} target="_blank">{this.props.data.name}</a></p>
        </div>

        <div className="column asin">
          <h5>ASIN <a href="#" className="tips" title="The Amazon identifying number, unique to this product">?</a></h5>
          <p>{this.props.data.asin}</p>
        </div>

        <div className="column no-match" id="">
          <h5 id="product-check">Do the products match ?</h5>
          <div>
            <a className="button ">YES</a>
            <a className="button" id="button-orange">Alternate Asin</a>
          </div>
        </div>
      </div>


	 )
  }
}

export default ProductCheck;