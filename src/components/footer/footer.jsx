import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Footer extends React.Component{

	render() {
		return (
            <div className="footer">

            <button onClick={this.supplierlink}>Sites we analyse</button>

        }
            </div>
        )
    }
    supplierlink(){
        chrome.tabs.create({url: "https://www-working.sourcemogul.com/sites-we-analyse"})
    }
}
module.exports = Footer;