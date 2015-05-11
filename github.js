var GitHub = function (repo) {
    this.repo = repo;

    this.memo = {
	issues: {
            value: [],
            status: 'stale' // in ["fresh", "refreshing", "stale"]
	},
	milestones: {
            value: [],
            status: 'stale'
	}
    };
};

GitHub.prototype.fetchFromGithub = function(endpoint, fetchOptions) {
    var authPromise = new Promise(function (resolve, reject) {           
        chrome.storage.sync.get('githubAuthorization',  function (items) {
            if (items.githubAuthorization) {
                resolve(items.githubAuthorization.token);
            } else {
                reject('No authorization found!');
            }
        });
    });
    return authPromise.then(function (token) {
        var options = $.extend({}, fetchOptions);            
        options.headers = $.extend({}, options.headers, {
	    'Authorization': 'token ' + token
        });
        var url;
        if (endpoint.indexOf('https') == 0) {
            url = endpoint;
        } else {
            url = 'https://api.github.com/repos/' + this.repo + endpoint;
        }
        return fetch(url, options);
    }.bind(this));
};

GitHub.prototype.fetchIssues = function (url, tmpIssues) {
    if (this.memo.issues.status === 'stale') {
        this.memo.issues.status = 'refreshing';
        return this.refreshIssues(url, tmpIssues);
    } else {
        return Promise.resolve(this.memo.issues.value);
    }
};

GitHub.prototype.fetchMilestones = function () {
    if (this.memo.milestones.status === 'stale') {
        this.memo.milestones.status = 'refreshing';
        return this.refreshMilestones();
    } else {
        return Promise.resolve(this.memo.milestones.value);
    }
};

GitHub.prototype.refreshIssues = function (url, tmpIssues) {
    var endpoint = '/issues?per_page=100&state=open&direction=asc';
    return this.fetchFromGithub(endpoint).then(function (response) {
	var links = {};
	//check if there is a link, stops a crash when number of issues <=100
	if (response.headers.get('Link') != null) {
	    response.headers.get('Link').split(', ').forEach(function(headLink){
		var s = headLink.split('; ');
		links[s[1]] = s[0].substr(1, s[0].length-2);
	    });
	}
        
	return response.json().then(function (data) {
	    var issues = (tmpIssues ? tmpIssues : []).concat(data);
	    
	    if(links['rel="next"']) {
		return this.refreshIssues(links['rel="next"'], issues);
	    }
	    else {
		this.memo.issues.value  = issues;
		this.memo.issues.status = "fresh";
		return Promise.resolve(issues);
	    }		
	}.bind(this));
    }.bind(this));	
};
    
GitHub.prototype.refreshMilestones = function () {
    return this.fetchFromGithub('/milestones?per_page=100&state=open')
        .then(function (response) {
	    return response.json();
	}).then(function (data) {
	    this.memo.milestones.value  = data;
	    this.memo.milestones.status = "fresh";
	    return Promise.resolve(this.memo.milestones.value);
	}.bind(this));
};
    
GitHub.prototype.refresh = function (cb) {
    for (var key in memo) {
        if (memo.hasOwnProperty(key)) {
	    if (memo[key].status = "fresh") {
		memo[key].status = "stale";
	    }
        }
    }
    cb();
};

GitHub.prototype.fetchRepos = function () {
    return this.fetchFromGithub('https://api.github.com/user/repos', {
        headers: {'Accept': 'application/vnd.github.moondragon+json'}
    }).then(function (response) {
        return response.json();
    }).then(function (repos) {
        return repos;
    });
};

GitHub.prototype.update_ms_due_on = function(milestoneId, due_on, cb) {
    var url = baseUrl+"/milestones/"+milestoneId;
    console.log(url);
    
    return this.fetchFromGithub(url, {
	method: 'PATCH',
	body: JSON.stringify({
	    "due_on": due_on
	})
    }).then(function (response) {
	return response.json();
    }).then(function (data) {
	console.log(data);
	cb(null, null);
    });
};
