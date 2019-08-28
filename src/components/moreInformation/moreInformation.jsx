import React from 'react';
import AddCurrencySymbol from '../../lib/addCurrencySymbol.js';

class ProductCheck extends React.Component{

    render() {
      return (
        <div className="row">
        <div className="col-4">
          <div className="content">
            <div className="heading clearfix">
              <span className="icon-dimensions"></span>
              <h2>Product Dimensions</h2><br />
              <h3>Useful for shipping</h3>
            </div>

            <div className="vertical">
              <p><strong>{this.props.data.weight}</strong></p>
            </div>

            <div className="vertical">
              <p><strong>{this.props.data.height}</strong></p>
            </div>

            <div className="vertical">
              <p><strong>{this.props.data.width}</strong></p>
            </div>

            <div className="vertical">
              <p><strong>{this.props.data.lengh}</strong></p>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="content">
            <div className="heading clearfix">
              <span className="icon-competition"></span>
              <h2>Product Competition</h2><br/>
              <h3>Current prices of top 5 sellers</h3>
            </div>
            <h4 className="clearfix">
              <span>Seller 1</span>
              <span>{this.props.data.seller1Price}</span>
              <span>Amazon or FBA</span>
            </h4><h4 className="clearfix">
              <span>Seller 2</span>
              <span>{this.props.data.seller2Price}</span>
              <span>Amazon or FBA</span>
            </h4><h4 className="clearfix">
              <span>Seller 3</span>
              <span>{this.props.data.seller3Price}</span>
              <span>Amazon or FBA</span>
            </h4><h4 className="clearfix">
              <span>Seller 4</span>
              <span >{this.props.data.seller4Price}</span>
              <span>Merchant Fulfilled</span>
            </h4><h4 className="clearfix">
              <span>Seller 5</span>
              <span>{this.props.data.seller5Price}</span>
              <span>Merchant Fulfilled</span>
            </h4>
          </div>
        </div>
        <div className="col-4">
          <div className="content">
            <div className="heading">
              <span className="icon-calculator"></span>
              <h2>Fee Calculator</h2><br />
              <h3>Select fulfillment method</h3>
            </div>
            <h5>Selling Price<span>{this.props.data.amazonPrice}</span></h5>
            <h5>Cost Price<span>{AddCurrencySymbol(this.props.data.country, this.props.data.price)}</span></h5>
            <h5>Amazon Referral Fee<span>{this.props.data.arf}</span></h5>
            <h5>Fulfilment By Amazon Fee<span>{this.props.data.fbaf}</span><a href="#" className="tips alt" title="This amount is the 'Pick &amp; Pack' &amp; 'Weight Handling' fee combined">?</a></h5>
            <h5>Total Cost <span>{this.props.data.totalCost}</span></h5>
            <h5 className="green">Estimated Profit <span>{this.props.data.estimatedProfit}</span></h5>
            <h5 className="green">ROI%<span>{this.props.data.roi}</span><a href="#" className="tips alt" title="The percentage (or amount) of return you get back from selling the item (inc. fees)">?</a></h5>
            <h5>Margin<span>{this.props.data.margin}</span><a href="#" className="tips alt" title="Profit expressed as percentage of sales price">?</a></h5>
          </div>
        </div>
        <div className="col-4">
          <div className="content">
            <div className="heading clearfix">
              <span className="icon-links"></span>
              <h2>External Links</h2><br />
              <h3>Reviews, ranks and stock</h3>
            </div>
            <div className="vertical external">
              <a className="button grey" href={this.props.data.camelcamelUrl} target="_blank">Price &amp; Sales Rank History</a>
              <small>Via CamelCamelCamel</small>
            </div>
            <div className="vertical external">
              <a className="button grey" href={this.props.data.amazonUrl} target="_blank">Check Product Details</a>
              <small>Via Amazon</small>
            </div>
            <div className="vertical external">
              <a className="button" href={this.props.data.url} target="_blank">Check Availability</a>
              <small>Via Retailer</small>
            </div>
          </div>
        </div>
      </div>

     )
  }
}

export default ProductCheck;