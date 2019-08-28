import React from 'react';
import { render } from 'react-dom';
import router from './router.js';
import injectScript from './lib/injectScript.js';
import receivePage from './lib/receivePage.js';
import store from './store.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'




let badPage = false


chrome.tabs.query({ active: true }, (tabs) => {
    tabs.map((one) => {
        if (one.url.indexOf("chrome://") > -1) {
            badPage = true
        }
        if (one.url.indexOf("sourcemogul") > -1) {
            badPage = true
        }
    })

    if (!badPage) {
        injectScript('getUrl');
        receivePage(function (err, response) {
            if (err) {
                console.log(err)
                var style = {
                    color: "#5B667F",
                    fontFamily: "Lato",
                    fontSize: 14 + "px",
                    fontWeight: "bold",
                    lineHeight: 17 + "px",
                    textAlign: "center",
                    margin: "auto",
                    margin: 10 + "px"
                }
                render(
                    <div><p style={style}>Oops!, Looks like we can not connect to SourceMogul. Please close and re-open the chrome extension <br />If this persists please contact support</p></div>, document.getElementById('app')
                )
            } else {
                window.__URLINFO__ = JSON.parse(response.text)
                render(router, document.getElementById('app'));
            }
        })


        var getComponenet = function () {

            if (chrome.runtime.lastError) {
                console.log(chrome.runtime.lastError.message);
            } else {
                chrome.runtime.reload()
            }
        }

    } else {
        render(
            <div>
                <div id="header-container">
                    <header className="header">
                        <div className="inlineFlex">
                            <a href="https://www.sourcemogul.com" target="_blank">
                                <img className="logo" alt="SourceMogul Logo" src="/img/SMCElogo.png" />
                            </a>

                            <div className="splitter"></div>

                            <div className="iconContainer">
                                <FontAwesomeIcon icon='times' onClick={() => window.close()} className="icon" />
                            </div>
                        </div>
                    </header>
                </div>


                <div id="welcome-page">
                    <div className="splitter"></div>

                    <h2>Thanks for installing SourceMogul Direct</h2>
                    <p>Please go to one of the sites <a className="noStyle" href="https://www-working.sourcemogul.com/sites-we-analyse" target="_blank">here</a> to get started</p>
                </div>
            </div>,
            document.getElementById('app')
        )
    }
})

