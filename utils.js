function fetchWithBasicAuth(url, fetchOptions, username, password) {
    var options = $.extend({}, fetchOptions);
    options.headers = $.extend({}, options.headers, {
	'Authorization': 'Basic ' + btoa(username + ':' + password)
    });
    return fetch(url, options);
}
