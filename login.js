$(function() {
    $('.form-signin').on('submit', function() {
        fetchWithBasicAuth(
            'https://api.github.com/authorizations',
            {
                method: 'POST',
                body: JSON.stringify({
                    scopes: ['repo', 'public_repo'],
                    note: 'GitHub Gantt Chart'
                })
            },
            $('#username').val(),
            $('#password').val()).then(function (response) {
                return response.json();
            }).then(function (authorization) {
                chrome.storage.sync.set({'githubAuthorization': authorization}, function() {
                    var current = chrome.app.window.current();
                    chrome.app.window.create('window.html', {
                        'innerBounds': {
                            'width': 1024,
                            'height': 768
                        },
                        'id': 'main'
                    });
                    current.close();
                });
            });
        return false;
    });
});
