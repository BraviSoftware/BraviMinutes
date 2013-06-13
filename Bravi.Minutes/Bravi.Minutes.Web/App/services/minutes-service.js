define(['model/minute'], function (Minute) {
    var url = '/api/minutes/';
    var service = {

        getAll: function () {
            return $.get(url);
        },

        getById: function (id, model) {
            return $.get(url, { id: id }).done(function (data) {
                var entity = new Minute(data.id, data.date, data.subject, data.notes, data.totalAttendees, data.attendees);
                if (model && ko.isObservable(model)) model(entity);
            });
        },

        create: function (data) {
            return $.ajax(url, {
                data: ko.toJSON(data),
                contentType: 'application/json',
                type: 'POST'
            });
        },

        update: function (data) {
            return $.ajax(url + data.id(), {
                data: ko.toJSON(data),
                contentType: 'application/json',
                type: 'PUT'
            });
        }
    };

    return service;
});