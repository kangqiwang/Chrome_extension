import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { searchComplete } from '../../actions/actionCreators'


class CompletedSearch extends React.Component {

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

	componentWillReceiveProps() {
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
            <div className="searchComplete">
                <div className="searchCompleteSplit"></div>

                <div className="titleBox">
                    <h3 className="title">Search sent to SourceMogul</h3>
                </div>

                <p className="searchName">{this.props.searchName ? this.props.searchName : localStorage.getItem('searchName')}</p>

				<div className="tickCon">
					<FontAwesomeIcon  icon="check" className="tick" />
				</div>

                <p className="searchName">{this.state.pages} Pages / {this.state.products} Products Recorded</p>

                <div className="infoBox">
					<div className="iconCon">
						<FontAwesomeIcon icon="info-circle" className="icon" />
					</div>

					<p className="tipText">
						Search has been sent to SourceMogul and will appear in Status in your dashboard.
					</p>
				</div>

                <div className="buttonCon">
					<a href="https://x4-sm-working.sourcemogul.com/status" target="_blank">
                        <button className="goTo">Go to Search</button>
                    </a>
                </div>

                <div className="startButtonCon">
					<button onClick={() => this.props.searchComplete()} className="goTo">Start new Search</button>
				</div>

            </div>
        )
    }
}


const mapDispatchToProps = dispatch => bindActionCreators(Object.assign({}, {
    searchComplete
}), dispatch)

const mapStateToProps = state => ({
    urlPageInfo: state.urlPageInfo
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CompletedSearch)