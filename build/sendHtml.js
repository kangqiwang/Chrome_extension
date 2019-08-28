injectScript('getHtml')
recievePage(function (err, response) {
    if (err) {
        console.log(err)
    } else {
        props.productsNumber({ product: response.length })
    }
})
