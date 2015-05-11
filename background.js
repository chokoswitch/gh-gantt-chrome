var WINDOW_BOUNDS = {
    'width': 1024,
    'height': 768
};

chrome.app.runtime.onLaunched.addListener(function() {
    chrome.storage.sync.get('githubAuthorization', function(items) {
        if (items.githubAuthorization) {
            chrome.app.window.create('window.html', {
                'innerBounds': WINDOW_BOUNDS,
                'id': 'main'
            });
        } else {
            chrome.app.window.create('login.html', {
                'innerBounds': WINDOW_BOUNDS,
                'id': 'login'
            });
        }
    });
});
