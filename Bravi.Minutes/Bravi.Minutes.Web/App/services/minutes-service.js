define(function () {
    var url = '/api/minutes/';
    var service = {

        getAll: function () {
            return $.get(url);
        },

        getById: function (id) {
            return $.get(url, { id: id });
        },

        create: function (data) {
            return $.ajax(url, {
                data: ko.toJSON(data),
                contentType: 'application/json',
                type: 'POST'
            });
        },

        update: function (data) {
            return $.ajax(url + data().id(), {
                data: ko.toJSON(data),
                contentType: 'application/json',
                type: 'PUT'
            });
        }
    };

    return service;
});