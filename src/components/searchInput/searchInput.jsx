import React from 'react';
import request from 'superagent';
import config from "../../config.js";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { saveRecord, changeSearchName, saveNameToStore, workingTrue, start } from '../../actions/actionCreators';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class SearchInput extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {

		return (

			<div className="searchCon">
				<div className="searchSplit"></div>

				<div className="titleBox">
					<h3 className="title">Start a new search</h3>
				</div>

				<p className="searchName">Search Name</p>

				<div className="inputCon">
					<input type="text" className="inputClass" ref="formSearchName" placeholder="Search Name" defaultValue={"Chrome extension Search  " + this.props.urlPageInfo.lastDomain} />
				</div>

				<p className="discountCode">Discount Code (%)</p>

				{/* <div>
					<input type="checkbox" defaultChecked={this.props.urlPageInfo.autoDomain} onChange={this.props.changeSearchName} />auto change search Name when you search Different Domain
				</div> */}

				<div className="inputCon">
					<input type="number" className="inputClass" ref="formVoucher" placeholder="Discount code/Voucher" defaultValue="0" />
				</div>

				<div className="inputCon">
					<button className="searchStartBtn" onClick={() => { this.searchStart(); this.props.start(this.refs.formSearchName.value) }} >Search</button>
				</div>

				<p className="notification" ref="errorP"></p>

				<a className="noStyle" href="https://www.sourcemogul.com/sites-we-analyse" target="_blank">
					<p className="sitesWe"> Sites we analyse</p>
				</a>

				<div className="footerAlign">
					<div className="underCon">
						<div className="sitesWeUnder"></div>
					</div>

					<div className="iconCon">
						<a href="app.sourcemogul.com/ce-help" target="_blank">
							<FontAwesomeIcon icon="question-circle" className="icon" />
						</a>
					</div>
				</div>
			</div>
		)
	}

	searchStart() {

		chrome.tabs.reload()


		if (this.refs.formSearchName.value && this.refs.formVoucher.value) {
			var error = false;
			var that = this;


			request
				.post(config.host + 'search')
				.send({ formSearchName: this.refs.formSearchName.value, formVoucher: this.refs.formVoucher.value, domain: this.props.urlPageInfo.lastDomain, userId: JSON.parse(localStorage.getItem('userInfo')) })
				.end(function (err, res) {
					if (err) {
						this.refs.errorP.innerHTML = "Error: you cannot search now";
					} else {
						if (res.xhr.readyState == 4 && res.xhr.status == 200) {
							this.props.saveRecord(res.body)
							chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
								var backgroundFunction = chrome.extension.getBackgroundPage()

								backgroundFunction.sendMessage(tabs[0].url, tabs[0].id)
							})


						}
					}

				}.bind(this));

		} else {
			this.refs.errorP.innerHTML = "Error: No Search Name Input. Please enter an search name";
		}

	}
}


const mapDispatchToProps = dispatch => bindActionCreators({
	saveRecord, 
	changeSearchName, 
	saveNameToStore,
	workingTrue,
	start
}, dispatch)

const mapStateToProps = state => ({
	urlPageInfo: state.urlPageInfo
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SearchInput)
