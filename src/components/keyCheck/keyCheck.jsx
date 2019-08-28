import React from 'react';
import {resetKey} from '../../actions/actionCreators'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class KeyCheck extends React.Component{

	render() {
		return (
			<div>
			<h2>CHECK KEY</h2>
			{/* <button onClick={() => this.localCheck()}>Show Key</button> */}
			<button onClick={() => this.props.resetKey()}>Log out</button>
			<p id="showKey" ref="keyOut"></p>
			</div>
			)
	}
	// localCheck() {
	// 	//refs=this.refs.accessKey.value
	// 	chrome.storage.local.get('accessKey', function (obj){
	// 		this.refs.keyOut.innerHTML = "Access Key: " + obj.accessKey.username
	// 	}.bind(this))
	// }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    resetKey
}, dispatch)

const mapStateToProps = state => ({
})

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(KeyCheck)
