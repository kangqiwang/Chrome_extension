//import getProducts from './getProducts.js';
import sendToServer from './sendToServer.js';

const recievePage = function(next) {
	chrome.runtime.onMessage.addListener(function(request, sender) {
		
		if (request.action == "getUrl") {
			var payload = request.source
			payload["userinfo"]=JSON.parse(localStorage.getItem("userInfo"))
			sendToServer('domain',  payload, (err, resp) => {
				if(err) {
					next(err)
				} else {

					

					next(null,resp)
				}
			})
		}
	});
}

export default recievePage;