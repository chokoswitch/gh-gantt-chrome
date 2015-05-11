github.fetchIssues(function(issues) {
    console.log(issues);
    window.issues = issues;
    initApp();
});

github.fetchMilestones(function(milestones) {
    window.milestones = milestones;
    initApp();
});
