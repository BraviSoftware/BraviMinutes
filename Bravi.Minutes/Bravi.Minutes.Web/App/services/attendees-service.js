define(function () {
    var service = {

        getAll: function () {
            return $.get('/api/attendees/');
        }
    };

    return service;
});