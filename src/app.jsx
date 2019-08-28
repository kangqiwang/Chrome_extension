import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from './actions/actionCreators.js';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faPowerOff, faTimes, faQuestionCircle, faSignOutAlt, faCheck, faInfoCircle, faSyncAlt  } from '@fortawesome/free-solid-svg-icons'


library.add(faPowerOff, faTimes, faQuestionCircle, faSignOutAlt, faCheck, faInfoCircle, faSyncAlt)

import Main from './main.jsx';


function mapStateToProps(state) {
    return {
        products: state.products,
        htmlPageInfo: state.htmlPageInfo,
        urlPageInfo: state.urlPageInfo
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

const App = connect(mapStateToProps, mapDispatchToProps)(Main);

export default App;
