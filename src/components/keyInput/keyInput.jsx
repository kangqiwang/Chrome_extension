import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { saveKey } from '../../actions/actionCreators'
import request from 'superagent';
import config from "../../config.js";

class KeyInput extends React.Component {

	constructor(props) {
		super(props)
		this.state = { error: null }
	}

	render() {
		return (
			<div className="keyInput">
				<p className="keyMessage">Please enter your SourceMogul Key below</p>
				<p className="errorMessage" id="errorPa" ref="errorP"></p>

				<div className="alignInput">
					<input type="text" className="keyInputBox" ref="accessKey" name="accessKey" placeholder="SourceMogul Key" />
				</div>

				<div className="inputButtonCon">
					<button className="inputButton" onClick={() => this.localSave()}>Login</button>
				</div>
				
				<a href="https://www.sourcemogul.com" target="_blank" className="noStyle">
					<p className="forgotMsg">Forgot your SourceMogul key ?</p>
				</a>
				<div className="forgotMsgUnder"></div>
			</div>
		)
	}
	localSave() {
		if (this.refs.accessKey.value) {
			var error = false;
			var that = this;

			request
				.post(config.host + 'check-key')
				.send({ accessKey: this.refs.accessKey.value })
				.end(function (err, res) {
					console.log(err)
					if (err) {
						this.refs.errorP.innerHTML = "Invalid Key. Please try again";
					} else {
						//localStorage.setItem("accessKey", this.refs.accessKey.value);
						// chrome.storage.local.get('accessKey', function (data) {
						// 	data.accessKey=newState.key
						// 	chrome.storage.local.set(data)
						// })

						// chrome.storage.local.set({"accessKey": this.refs.accessKey.value})
						if (res.xhr.readyState == 4 && res.xhr.status == 200) {

							//this.props.saveRecord(res.body.id)
							res.body.id = this.refs.accessKey.value
							this.props.saveKey(res.body);
							this.props.handleKey()
						}

					}

				}.bind(this));

		} else {
			this.refs.errorP.innerHTML = "No key entered. Please enter an access key";
		}
	}
}



const mapDispatchToProps = dispatch => bindActionCreators({
	saveKey
}, dispatch)

const mapStateToProps = state => ({
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(KeyInput)
