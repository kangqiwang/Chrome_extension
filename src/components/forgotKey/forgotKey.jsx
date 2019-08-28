import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class ForgotKey extends React.Component {

    render() {
        return (
            <div className="footer">
                <button onClick={this.supplierlink}>Forgot your Amazon Key?</button>
            </div>
        )
    }
    supplierlink() {
        chrome.tabs.create({ url: "https://www.sourcemogul.com/how-it-works/?_ga=2.268240462.1186817216.1561028523-38667202.1546866640" })
    }
}
module.exports = ForgotKey;