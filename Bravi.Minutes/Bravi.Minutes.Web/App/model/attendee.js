define(function () {
    var attendee = function (id, name, selected) {
        var self = this;

        self.id = id;
        self.name = name;
        self.selected = ko.observable(selected);

    };

    return attendee;
});