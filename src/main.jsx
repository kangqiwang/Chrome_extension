import React from 'react';
import KeyInput from './components/keyInput/keyInput.jsx'
import SearchInput from './components/searchInput/searchInput.jsx'
import EndSearch from './components/endSearch/endSearch.jsx'
import HeaderLogo from './components/headerLogo/headerLogo.jsx'
import CompletedSearch from './components/completedSearch/completedSearch.js'
import { checkDomain } from './actions/actionCreators.js'
import { receiveUrlInfo } from './actions/actionCreators.js'
import Discard from './components/discard/discard.jsx'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


class Main extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            working: false,
            record: false,
            message: null,
            pausedSearch: false,
            key: false,
            targetPage: false
        }

        // chrome.storage.local.get('workingStatus', function (data) {
        //     if (data.workingStatus === true) {
        //         this.props.urlPageInfo.working = true
        //     } else {
        //         this.props.urlPageInfo.working = false
        //     }

        // }.bind(this))


        chrome.storage.local.get('accessKey', function (data) {
            if (data.accessKey) {
                this.props.urlPageInfo.key = true
            } else {
                this.props.urlPageInfo.key = false
            }

        }.bind(this))

        chrome.storage.local.get('recordStatus', function (data) {
            if (data.recordStatus) {
                this.props.urlPageInfo.record = true
            } else {
                this.props.urlPageInfo.record = false
            }
        }.bind(this))

        chrome.storage.local.get('accessKey', function (data) {
            this.props.urlPageInfo.userId = data.accessKey
        }.bind(this))

        chrome.storage.local.get('searchName', function (data) {
            if (data.searchName !== null) {
                this.props.urlPageInfo.searchName = data.searchName
            } else {
                this.props.urlPageInfo.searchName = ""
            }

        }.bind(this))



        // this.props.urlPageInfo.pausedSearch = localStorage.getItem('pausedSearch') ? localStorage.getItem('pausedSearch') : false


        this.props.receiveUrlInfo(window.__URLINFO__);
        this.props.checkDomain({ recordStatus: this.state.record })

    }



    handlePaused() {
        this.setState({ pausedSearch: true })
    }

    handleResume() {
        this.setState({ pausedSearch: false })
    }

    handleKey() {
        this.setState({ key: true })
    }


    componentWillMount() {

        this.setState({
            pausedSearch: JSON.parse(localStorage.getItem('pausedSearch')) ? JSON.parse(localStorage.getItem('pausedSearch')) : false,
            key: JSON.parse(localStorage.getItem('key')) ? JSON.parse(localStorage.getItem('key')) : false
        })

        chrome.storage.local.get('targetPage', function (data) {
            if (data.targetPage) {
                this.setState({ targetPage: true })
            }
        }.bind(this))

    }


    render() {

        var storageHandler = (changes, area) => {
            if (changes.targetPage) {
                this.setState({
                    targetPage: changes.targetPage.newValue ? changes.targetPage.newValue : false,
                })
            }

        };

        chrome.storage.onChanged.addListener(storageHandler);


        return (

            <div id="chrome-ex">
                <div id="header-container">
                    <HeaderLogo hasKey={this.state.key} />
                </div>
                <div id="content-container">

                    {this.state.key === false ?
                        <KeyInput handleKey={this.handleKey.bind(this)} /> : <div>
                            {this.state.targetPage === true ?
                                <div>
                                    {this.state.message ?
                                        <p id="showKey">{this.state.message}</p>
                                        : null}

                                    <div>
                                        {this.props.urlPageInfo.record === false && this.props.urlPageInfo.completedSearch !== true ?
                                            <SearchInput />
                                            :

                                            <div>
                                                {this.props.urlPageInfo.completedSearch !== true ?
                                                    this.state.pausedSearch === true ? <Discard handleResume={this.handleResume.bind(this)} /> : <EndSearch handlePaused={this.handlePaused.bind(this)} searchName={this.props.urlPageInfo.searchName} />
                                                    : null}
                                            </div>
                                        }
                                    </div>

                                    <div>
                                        {this.props.urlPageInfo.completedSearch && this.props.urlPageInfo.discardNotification === false ?
                                            <CompletedSearch searchName={this.props.urlPageInfo.searchName} />
                                            : null}
                                    </div>
                                </div>
                                : <div>
                                    <p className="notifications">Unsupported Site!</p>
                                    <div>
                                        <p className="reloadText">Site is supported ? Try reloading</p>
                                        <div className="reloadCon">
                                            <button onClick={() => this.refresh()} className="reloadButton">Reload</button>
                                        </div>
                                    </div>
                                    <a className="noStyle" href="https://www-working.sourcemogul.com/sites-we-analyse" target="_blank">
                                        <p className="sitesWe"> Sites we analyse</p>
                                    </a>
                                    <div className="sitesWeUnder"></div>
                                </div>
                            }</div>}
                </div>

                {/* {this.state.targetPage === true ?

                    <div id="content-container">
                        {this.state.key === false ?
                            <KeyInput handleKey={this.handleKey.bind(this)} />
                            : null}

                        {this.state.message ?
                            <p id="showKey">{this.state.message}</p>
                            : null}


                        {this.state.key === true ?
                            <div>
                                <div>
                                    {this.props.urlPageInfo.record === false && this.props.urlPageInfo.completedSearch !== true ?
                                        <SearchInput />
                                        :

                                        <div>
                                            {this.props.urlPageInfo.completedSearch !== true ?
                                                this.state.pausedSearch === true ? <Discard handleResume={this.handleResume.bind(this)} /> : <EndSearch handlePaused={this.handlePaused.bind(this)} searchName={this.props.urlPageInfo.searchName} />
                                                : null}
                                        </div>
                                    }
                                </div>

                                <div>
                                    {this.props.urlPageInfo.completedSearch && this.props.urlPageInfo.discardNotification === false ?
                                        <CompletedSearch searchName={this.props.urlPageInfo.searchName} />
                                        : null}
                                </div>
                            </div>
                            : null}


                    </div>

                    :

                    <div>
                        <p className="notifications">Unsupported Site!</p>
                        <div>
                            <p className="reloadText">Site is supported ? Try reloading</p>
                            <div className="reloadCon">
                                <button onClick={() => this.refresh()} className="reloadButton">Reload</button>
                            </div>
                        </div>
                        <a className="noStyle" href="https://www-working.sourcemogul.com/sites-we-analyse" target="_blank">
                            <p className="sitesWe"> Sites we analyse</p>
                        </a>
                        <div className="sitesWeUnder"></div>
                    </div>
                } */}
            </div>
        )
    }

    refresh() {
        chrome.tabs.reload()
        window.close();
    }

}

const mapDispatchToProps = dispatch => bindActionCreators({
    checkDomain,
    receiveUrlInfo,
}, dispatch)

const mapStateToProps = state => ({
    urlPageInfo: state.urlPageInfo
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main)
