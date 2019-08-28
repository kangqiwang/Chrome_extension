import updateStatus from '../lib/updateStatus'
import { DH_CHECK_P_NOT_PRIME } from 'constants';

export default function urlPageInfo(state = {}, action) {
    let newState = {};

    switch (action.type) {
        case 'RECIEVE_URL_INFO':
            newState = Object.assign({}, state);
            newState.domain[action.request.domain] = action.request.ok;
            newState.lastDomain = action.request.domain;
            updateStatus('lastDomain', newState.lastDomain)

            if(action.request.type === "GETHTML") {
                updateStatus('targetPage', true)

                chrome.storage.local.get('recordStatus', (data) => {
                    // console.log(data.recordStatus)
                    if(data.recordStatus) {
                        chrome.browserAction.setIcon({ path: "img/SMCElogoSmallRec.png" })
                    } else {
                        chrome.browserAction.setIcon({ path: "img/SMCElogoSmall.png" })
                    }   
                })
            }


            return newState;
        case 'RECIEVE_STATUS_INFO':
            newState = Object.assign({}, state)
            newState.status = action.request.recordStatus

            return newState

        case 'RECIEVE_HTML_PAGE_INFO':
            newState = Object.assign({}, state);
            newState.productNum = action.request.product;

            return newState

        case 'CHANGE_WORKING':

            newState = Object.assign({}, state)

            newState.working = !state.working
            if (state.working === true) {
                newState.working = false
                newState.record = false
                updateStatus('recordStatus', newState.record)

            } else {
                newState.working = true
                // chrome.browserAction.setBadgeText({ text: "on" })

            }
            // updateStatus('workingStatus', newState.working)

            chrome.runtime.reload()
            window.close()

            return newState

        case 'SAVE_RECORD':
            newState = Object.assign({}, state)
            newState.record = true


            updateStatus('recordStatus', newState.record)
            var newdata = {
                jobId: action.request.jobId,
                supplierId: action.request.supplierId
            }
            updateStatus('searchId', newdata)
            updateStatus('lastDomain', action.request.domain)
            //updateStatus('accessKey',newkey)

            return newState

        case 'RESET_RECORD':
            newState = Object.assign({}, state)
            newState.record = false
            newState.completedSearch = true
            updateStatus('recordingNum', { product: 0, page: 0 })
            updateStatus('recordStatus', newState.record)
            updateStatus('lastUrls',null)
            updateStatus('lastDomain',null)
            data = null
            updateStatus('searchId', data)
            localStorage.setItem('urlsRecorded', JSON.stringify([]))
            // chrome.browserAction.setBadgeText({ text: "on" })

            return newState

        case 'PAUSE_SEARCH':
            newState = Object.assign({}, state)
            newState.pausedSearch = true
            localStorage.setItem('pausedSearch', newState.pausedSearch)
            return newState

        case 'DISCARD_COMFIRM':
            newState = Object.assign({}, state)
            newState.pausedSearch = true
            localStorage.setItem('pausedSearch', newState.pausedSearch)
            updateStatus('lastUrls', null)

            return newState
        case 'RESET_CHROME':
            newState = Object.assign({}, state)
            newState.completedSearch = false
            newState.record = false
            newState.pausedSearch = false
            newState.lastDomain = ""
            refreshPage()

            // updateStatus('workingStatus', false)
            updateStatus('recordStatus', false)
            localStorage.setItem('pausedSearch', false)
            localStorage.setItem('urlsRecorded', JSON.stringify([]))
            updateStatus('recordingNum', { product: 0, page: 0 })
            updateStatus('lastUrls', null)
            updateStatus('lastDomain',null)


            return newState
        case 'SAVE_KEY':
            newState = Object.assign({}, state)

            newState.userId = action.todo

            var newdata = {

            }
            if (action.todo.username == "martha" || action.todo.username == "mike") {
                action.todo["dev"] = true
            } else {
                action.todo["dev"] = false
            }

            updateStatus('accessKey', action.todo)
            updateStatus('targetPage',true)

            if (action.todo) {
                newState.key = true
            }



            localStorage.setItem('key', true)
            localStorage.setItem('userInfo', JSON.stringify(action.todo))


            return newState

        case 'RESET_KEY':
            newState = Object.assign({}, state)
            newState.userId = null
            newState.key = false
            let data = null
            updateStatus('accessKey', data)

            localStorage.setItem('key', false)


            return newState

        case 'CHANGE_SEARCH_NAME':
            newState = Object.assign({}, state)
            newState.autoDomain = !state.autoDomain
            updateStatus('autoDomain', newState.autoDomain)

            return newState

        case 'SEARCH_COMPLETE':
            newState = Object.assign({}, state)
            newState.completedSearch = false
            newState.record = false
            newState.lastDomain = null
            updateStatus('lastUrls', null)
            // updateStatus('workingStatus', false)
            updateStatus('recordStatus', false)
            updateStatus('recordingNum', { product: 0, page: 0 })
            localStorage.setItem('pausedSearch', false)


            refreshPage()
            return newState

        case 'SAVE_NAME':
            newState = Object.assign({}, state)
            newState.searchName = action.value
            updateStatus('searchName', newState.searchName)
            localStorage.setItem('searchName', newState.searchName)

            return newState

        case 'RESUME_SEARCH':
            localStorage.setItem('pausedSearch', false)
            return newState

        case 'WORKING_TRUE':
            newState = Object.assign({}, state)
            newState.working = true

            // updateStatus('workingStatus', newState.working)

            return newState

        case 'LOG_OUT':
            newState = Object.assign({}, state)
            newState.userId = null
            newState.key = false
            newState.working = false
            newState.record = false
            newState.completedSearch = true

            updateStatus('accessKey', null)
            updateStatus('searchId', null)
            updateStatus('recordingNum', { product: 0, page: 0 })
            updateStatus('recordStatus', newState.record)
            // updateStatus('workingStatus', newState.working)

            localStorage.clear();

            chrome.runtime.reload()
            window.close()

            return newState

        case 'START':
            newState = Object.assign({}, state)
            newState.searchName = action.value
            updateStatus('searchName', newState.searchName)
            localStorage.setItem('searchName', newState.searchName)
            newState.working = true
            // updateStatus('workingStatus', newState.working)

            return newState

        default:
            return state;
    }
}


export const refreshPage = () => {
    location.reload()
}

