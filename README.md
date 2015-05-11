# gh-gantt-chrome
A Chrome app showing a Gantt-chart visualization of GitHub issues in a repository.

Largely based off of https://github.com/neyric/gh-issues-gantt. That requires having nodejs and starting up a server,
but since the GitHub API can be accessed with personal access tokens created from user credentials, a server isn't
needed and this version is a self-contained installable Chrome app. The largest change vs the original is the use of
the HTML5 fetch API to access the github API intsead of the nodejs request module.

This is still WORK IN PROGRESS! The app is functional but nowhere near polished or complete. The main intent of this
repository is to have the code released to get a first version onto the web store to iterate on.
