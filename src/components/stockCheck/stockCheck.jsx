import React from 'react';
import request from 'superagent';
import config from "../../config.js";

class EndSearch extends React.Component{
	render() {
		return (
            <div className = "containStockCheck">
            <button className="searchStop" onClick={this.searchStop} >Stop Search</button>
            </div>
			)
	}
	
    searchStop(){
		
        chrome.storage.local.get('searchId',function(data){

		request
		.post(config.host + 'endsearch')
		.send({searchId: data.searchId})
		.end(function(err, res){
			if(err){
			  this.refs.errorP.innerHTML = "Error: you cannot search now";
		  } else {

			  if(res.response==1){
				  //localStorage.setItem("accessKey", this.refs.accessKey.value);
			}
			  this.props.resetRecord()
		  }
		   
	  }.bind(this));
	}.bind(this))

    }

}
const mapStateToProps = state => ({
    apiKeys: state.apiKeys,
    user: state.user
})

const mapDispatchToProps = dispatch => bindActionCreators({
    api_key_validation
}, dispatch)

export default connect (
    mapStateToProps,
    mapDispatchToProps
)(EndSearch)

