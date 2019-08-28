import React from 'react';

import Header from '../header/header.jsx';
import ProductCheck from '../productCheck/productCheck.jsx';
import MoreInformation from '../moreInformation/moreInformation.jsx';

import EnumerateProduct from '../../lib/enumerateProduct.js';
import GetCompetitivePrice from '../../lib/getCompetitivePrice.js';
import GetAmazonFees from '../../lib/getAmazonFees.js';
import SearchProduct from '../../lib/searchProduct.js';

import Filter from '../filter/filter.jsx';

class Opportunity extends React.Component{

    componentWillMount() {
  
        var payload = {
            country: this.props.data.country,
            indexId:  this.props.id,
            name: this.props.data.name,
            url: this.props.data.url,
            price: this.props.data.price
        }

        SearchProduct(payload, function(err, res) {
            //console.log(err);
            //console.log(res);
        });

    }
    getInitialState() {
        return {
            visibility: "hide"
        }
    }
    render() {
        var fullDetailsClass = "full-details " + this.state.visibility;

        return (
            <div className="opportunity clearfix">
                <Header data={this.props.data} handleVisibility={this.handleVisibility} visibility={this.state.visibility} />
                <div className={fullDetailsClass}>
                    <ProductCheck data={this.props.data} />
                    <MoreInformation data={this.props.data} />
                </div>
            </div>
        )   
        
    }
    hasMargin() {
        if(parseFloat(this.props.data.amazonPrice) > parseFloat(this.props.data.price)) {
            return true;
        } else {
            return false;    
        }
        
    }
    hasMarginWithFees() {
        if(this.props.data.profit > 0) {
            return true;
        } else {
            return false;
        }        
    }
    handleVisibility() {

        this.setState({ visibility: "show" });

            if(this.state.visibility === "show") {
                this.setState({ visibility: "hide" })
            }
    }
}

export default Opportunity;
