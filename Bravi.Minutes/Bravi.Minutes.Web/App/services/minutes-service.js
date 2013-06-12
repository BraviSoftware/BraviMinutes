define(function () {
    var service = {

        getAll: function () {
            return $.get('/api/minutes/');
        }
    };

    return service;
});