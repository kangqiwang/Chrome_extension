import React from 'react';
import request from 'superagent';
import config from "../../config.js";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { resetRecord, resetChrome, resumeSearch } from '../../actions/actionCreators'

class Discard extends React.Component {

    constructor(props) {
		super(props)
		this.state = {
		   products: 0,
		   pages: 0
        }
	}

	componentWillMount() {
		chrome.storage.local.get('recordingNum', (data) => {
			var products = data.recordingNum.product ? data.recordingNum.product : 0
			var pages = data.recordingNum.page ? data.recordingNum.page : 0

			this.setState({
				products: products,
				pages: pages
			})
		})
	}

	render() {
		return (
            <div className="stopSearch">
                <div className="searchStopSplit"></div>

                <div className="titleBox">
                    <h3 className="title">{this.state.pages} Pages / {this.state.products} Products recorded <div className="recordingCircle"></div></h3>
                </div>

                <p className="stopRecording">Stop recording and cancel?</p>

                <div className="buttonCon">
                    <button className="buttonStop" onClick={() => this.discardAndClose()} >Yes, Cancel</button>
                </div>

                <p className="continueSearch" onClick={() => {this.props.resumeSearch(); this.props.handleResume()}}>No continue recording</p>

				<div className="continueSearchUnder"></div>
            </div>
		)
    }
    discardAndClose() {
        chrome.storage.local.get('searchId', function (data) {
            request
                .post(config.host + 'discard')
                .send(data.searchId)
                .end(function (err, res) {
                    if (err) {
                        this.refs.errorP.innerHTML = "Error: you cannot discard now";
                    } else {
                        this.props.resetChrome()
                
                        
                    }
    
                }.bind(this));
            }.bind(this))
    
    }
    

    /** Do not need to start a new search just resume the current one */

	// startSearch() {
    //     chrome.storage.local.get('searchId', function (data) {
    //         request
    //             .post(config.endPoint + 'discard')
    //             .send(data.searchId)
    //             .end(function (err, res) {
    //                 if (err) {
    //                     this.refs.errorP.innerHTML = "Error: you cannot discard now";
    //                 } else {
    //                     this.props.resetRecord()
                        
    //                     // if (confirm("Do you still want to start another search")) {
    //                     // 	this.props.resetRecord()
    //                     //   } else {
    //                     // 	this.props.resetChrome()
    //                     //   }
                
                        
    //                 }
    
    //             }.bind(this));
    //         }.bind(this))
    
    // }
}

const mapDispatchToProps = dispatch => bindActionCreators(Object.assign({},{
    resetRecord,
    resetChrome,
    resumeSearch
}), dispatch)

const mapStateToProps = state => ({
	urlPageInfo: state.urlPageInfo
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Discard)
