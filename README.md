# gh-gantt-chrome
A Chrome app showing a Gantt-chart visualization of GitHub issues in a repository.

Available for install from the web store at https://chrome.google.com/webstore/detail/github-gantt-chart/mmcgnnhodlcehejjchmkmginnemikmgm

Largely based off of https://github.com/neyric/gh-issues-gantt. That requires having nodejs and starting up a server,
but since the GitHub API can be accessed with personal access tokens created from user credentials, a server isn't
needed and this version is a self-contained installable Chrome app. The largest change vs the original is the use of
the HTML5 fetch API to access the github API instead of the nodejs request module.

This is still WORK IN PROGRESS! The app is functional but nowhere near polished or complete. The main intent of this
repository is to have the code released to get a first version onto the web store to iterate on.

TODO
- Move remaining items from config.js into a settings page and Chrome storage.
- Implement the refresh button.
- Add bootstrap to the main gantt page for a bit of structure.
- Implement proper switching of repos. Currently it requires an app restart since it's not properly implemented.
- Check existing tokens before creating a new one. Currently, trying to login again after doing so once doesn't work.
- Error handling (e.g., API errors).
