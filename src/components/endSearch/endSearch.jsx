import React from 'react';
import request from 'superagent';
import config from "../../config.js";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { searchDiscard, resetRecord, pauseSearch } from '../../actions/actionCreators'

class EndSearch extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			products: 0,
			pages: 0,
			recording: false,
			urlExsts: false,
			urls: []
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



		this.setState({
			recording: JSON.parse(localStorage.getItem('collectingData')) ? JSON.parse(localStorage.getItem('collectingData')) : false,
			urls: JSON.parse(localStorage.getItem('urlsRecorded')) !== null ? JSON.parse(localStorage.getItem('urlsRecorded')) : []
		})

	}

	render() {

		var storageHandler = (changes, area) => {
			if (changes.recordingNum) {
				this.setState({
					products: changes.recordingNum.newValue.product ? changes.recordingNum.newValue.product : 0,
					pages: changes.recordingNum.newValue.page ? changes.recordingNum.newValue.page : 0
				})
			}

			if (changes.collectingData) {

				localStorage.setItem('collectingData', changes.collectingData.newValue)


				this.setState({
					recording: JSON.parse(localStorage.getItem('collectingData')),
					urls: JSON.parse(localStorage.getItem('urlsRecorded'))
				})
			}

			if (changes.urlAlreadyRecorded) {
				this.setState({
					urlExsts: changes.urlAlreadyRecorded.newValue ? changes.urlAlreadyRecorded.newValue : false,
				})
			}
		};

		chrome.storage.onChanged.addListener(storageHandler);





		return (
			<div className="searchIP">

				<div className="searchIPSplit"></div>

				<div className="titleBox">
					<h3 className="title">{JSON.parse(this.state.pages)} Pages / {JSON.parse(this.state.products)} Products recorded <div className="recordingCircle"></div></h3>
				</div>

				<p className="searchName">{this.props.searchName ? this.props.searchName : localStorage.getItem('searchName')}</p>

				{this.state.recording ?

					<div className="tickCon">
						<FontAwesomeIcon spin={true} icon="sync-alt" className="refresh" />
					</div>

					:
					<div>
						<div className="tickCon">
							<FontAwesomeIcon icon="check" className="tick" />
						</div>
						<div>
							{this.state.urlExsts ?
								<p className="alreadyExists">Data already collected for this page, Please go to a new page.</p>
								:
								<p className="nextPage">Please click the next page</p>

							}
						</div>
					</div>
				}




				<div className="infoBox">
					<div className="iconCon">
						<FontAwesomeIcon icon="info-circle" className="icon" />
					</div>

					<p className="tipText">
						Don't forget to click through search pages to record more data.
					</p>
				</div>


				<div className="urlsCollected">
					{this.state.urls?<ul>{this.state.urls.map((one) => {
							return <li>{one}</li>
						})} </ul> : <ul></ul>}					
				</div>

				<div className="buttonCon">
					<button className="searchComplete" onClick={() => this.searchStop()}>Complete Search</button>
					<button className="searchComplete" onClick={() => { this.props.pauseSearch(); this.props.handlePaused() }}>Pause Search</button>
				</div>

				<p className="discardSearch" onClick={() => { this.searchDiscard(); this.props.handlePaused() }}>Discard Search</p>

				<div className="discardSearchUnder"></div>
			</div>
		)
	}
	searchStop() {
		chrome.storage.local.get(['recordingNum', 'searchId'], (values) => {
			request
				.post(config.host + 'endsearch')
				.send({ searchId: values.searchId, userId: JSON.parse(localStorage.getItem('userInfo')), product: values.recordingNum.product, page: values.recordingNum.page })
				.end(function (err, res) {
					if (err) {
						this.refs.errorP.innerHTML = "Error: you cannot search now";
					} else {
						this.props.resetRecord()
					}
				}.bind(this));
		})

		// chrome.storage.local.get('accessKey', function (user) {
		// 	chrome.storage.local.get('recordingNum', function (numberofData) {
		// 		chrome.storage.local.get('searchId', function (data) {
		// 			request
		// 				.post(config.host + 'endsearch')
		// 				.send({ searchId: data.searchId, userId: user.accessKey, product: numberofData.recordingNum.product, page: numberofData.recordingNum.page })
		// 				.end(function (err, res) {
		// 					if (err) {
		// 						this.refs.errorP.innerHTML = "Error: you cannot search now";
		// 					} else {
		// 						this.props.resetRecord()
		// 					}
		// 				});
		// 		}.bind(this))

		// 	}.bind(this))

		// }.bind(this))

	}

	searchDiscard() {
		this.props.searchDiscard()
	}

}

const mapDispatchToProps = dispatch => bindActionCreators(Object.assign({}, {
	resetRecord,
	searchDiscard,
	pauseSearch
}), dispatch)

const mapStateToProps = state => ({
	urlPageInfo: state.urlPageInfo
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EndSearch)
