import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { logOut } from '../../actions/actionCreators'


class HeaderLogo extends React.Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        // chrome.storage.local.get('workingStatus', function (data) {
        //     if (data.workingStatus) {
        //         this.setState({ working: data.workingStatus })
        //     }
        // }.bind(this))
    }

    render() {

        var props = this.props

        return (
            <header className="header">
                <div className="inlineFlex">
                    <a href="https://www.sourcemogul.com" target="_blank">
                        <img className="logo" alt="SourceMogul Logo" src="/img/SMCElogo.png" />
                    </a>
                    <div className="iconContainer">
                        {props.hasKey ?
                            <FontAwesomeIcon onClick={() => this.props.logOut()} icon="sign-out-alt" className="icon" />
                            :
                            <a href="app.sourcemogul.com/ce-help" target="_blank">
                                <FontAwesomeIcon icon="question-circle" className="icon" />
                            </a>
                        }


                    </div>

                    <div className="splitter"></div>

                    <div className="iconContainer">
                        <FontAwesomeIcon icon='times' onClick={() => this.closeWindow()} className="icon" />
                    </div>

                    {/* <button  onClick={() => this.props.changeWorking()}>Click</button> */}
                </div>




                {/* <div className="help" onClick={() => this.props.changeWorking()}>
                    <FontAwesomeIcon icon="question-circle" size="1x" />
                </div>

                <div className="poweroff" onClick={() => this.props.changeWorking()}>
                    <FontAwesomeIcon icon='times' size="1x" className="offButton" color="black" />
                </div> */}

            </header>
        )
    }

    closeWindow() {
        window.close();
    }
}
const mapDispatchToProps = dispatch => bindActionCreators({
    logOut
}, dispatch)

const mapStateToProps = state => ({
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HeaderLogo)
