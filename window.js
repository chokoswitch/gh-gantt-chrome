function initApp() {
    var showGanttForSelectedRepo = function () {
        $('#gantt').show();
        var api = new GitHub($('#repo-select').val());       
        Promise.all([api.fetchIssues(), api.fetchMilestones()])
            .then(function (values) {
                Planning.init(values[0], values[1]);
            }); 
    };
    new GitHub().fetchRepos().then(function (repos) {
        repos.forEach(function (repo) {
            $('<option></option')
                .val(repo.full_name)
                .text(repo.full_name)
                .appendTo('#repo-select');
        });        
        chrome.storage.sync.get('selectedRepo', function (items) {
            if (items.selectedRepo) {
                $('#repo-select').val(items.selectedRepo);
                showGanttForSelectedRepo();
            }
        });
    });
    $('#repo-select').on('change', function () {
        chrome.storage.sync.set({selectedRepo: $(this).val()});
        showGanttForSelectedRepo()
    });
}

$(initApp);
