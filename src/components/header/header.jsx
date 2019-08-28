import React from 'react';
import AddCurrencySymbol from '../../lib/addCurrencySymbol.js';
import Keepa from '../keepa/keepa.jsx';
import Loader from '../loader/loader.jsx';

class Header extends React.Component{

    render() {        

        var keepa = null;
        if(this.props.data.asin) {
           keepa = <Keepa asin={this.props.data.asin} country={this.props.data.country} />
        }

        var amazonPrice = <Loader />;
        if(this.props.data.amazonPrice) {
            amazonPrice = AddCurrencySymbol(this.props.data.country, this.props.data.amazonPrice);
        }        

        var myClass = "dropdown icon-arrow"
        if(this.props.visibility === 'show') {
            myClass = "dropdown icon-arrow arw-rot"
        }

        var profit = <Loader />
        if(this.props.data.profit) {
             profit = AddCurrencySymbol(this.props.data.country, this.props.data.profit)
        }

        var amazonImage = <Loader />
        if(this.props.data.amazonImage) {
            amazonImage = <img alt={this.props.data.amazonName} src={this.props.data.amazonImage} />
        }

        var amazonUrl = null;
        if(this.props.data.amazonUrl) {
            amazonUrl = <a href={this.props.data.amazonUrl} target="_blank">{this.props.data.amazonName}</a>
        }        
        

        return (
    <div>
            <div className="header clearfix">
      <span className="category"><a href={this.props.data.url} target="_blank">{this.props.data.name}</a></span>
      <div className="right hidden-xs">
        <span>Cost Price <a href="#" className="tips" title="Accurate at time of search">?</a></span>
        <span>Amazon Price <a href="#" className="tips" title="Accurate at time of search">?</a></span>
        <span>R.O.I / Profit <a href="#" className="tips" title="Markup after all Amazon fees (not inc. shipping from retailer/ shipping to Amazon)">?</a></span>
        <span>Sales Rank <a href="#" className="tips" title="Sales Rank is an indicator of how well a product is selling overall within its category">?</a></span>
        <span className="short">View more</span>
      </div>
    </div>

       <div className="overview clearfix">
      <div className="summary">
        <div className="placeholder">
          <img alt={this.props.data.name} src={this.props.data.image} />
        </div>
        <div className="placeholder">
          {amazonImage}
        </div>
        <span>
        {amazonUrl}
      </span></div>
      <div className="right">
        <div className="hidden-lg header">
          <span>Buy Price</span>
          <span>Sell Price</span>
          <span>Profit</span>
        </div>
        <div className="column">
          <div className="content">
            <div className="v-align">
              <h4 className="font-size-13">{AddCurrencySymbol(this.props.data.country, this.props.data.price)}</h4>
            </div>
          </div>
        </div>
        <div className="column">
          <div className="content">
            <div className="v-align">
              <h4 className="font-size-13">{amazonPrice}</h4>
            </div>
          </div>
        </div>
        <div className="hidden-lg column">
          <div className="content">
            <div className="v-align">
              <div className="clear ">£3.79</div>
            </div>
          </div>
        </div>
        <div className="hidden-xs column">
          <div className="content">
            <div className="v-align">
              <div className="clear font-size-13">
                {this.props.data.roi}%
              </div>
              <div className="or">
                <div>
                  <span className="spacer"></span>
                  <p>or</p>
                  <span className="spacer"></span>
                </div>
              </div>
              <div className="clear font-size-13">{profit}</div>
            </div>
          </div>
        </div>
        <div className="hidden-lg header" style={{ clear: "left" }}>
          <span>Sales Rank</span>
          <span>PS Rating</span>
          <span>View more</span>
        </div>
        <div className="hidden-lg column">
          <div className="content">
            <div className="v-align">
              <div className="clear ">
                Top 2.97%
              </div>
            </div>
          </div>
        </div>
        <div className="hidden-xs column">
          <div className="content">
            <div className="v-align">
              <div className="clear font-size-13 padding-0">
                {this.props.data.salesRankNo}
              </div>
              <div id="margin-spacer" className="or">
                <div>
                  <span className="spacer"></span>
                  <p>or</p>
                  <span className="spacer"></span>
                </div>
              </div>
              <div className="clear font-size-13 padding-0">
                {this.props.data.salesRankPer}
              </div>
            </div>
          </div>
        </div>
        <div className="column short" title="Find a more detailed breakdown of the product">
          <span className={myClass} id="view-more-arr" onClick={this.props.handleVisibility}><span className="path1"><span className="path2"></span></span></span>
        </div>
      </div>
    </div>
    {keepa}
    </div>

            )
    }
}

export default Header;


