define(function () {
    var service = {

        getAll: function () {
            return $.get('/api/minutes/');
        },

        getById: function (id) {
            return $.get('/api/minutes/', { id: id });
        }
    };

    return service;
});