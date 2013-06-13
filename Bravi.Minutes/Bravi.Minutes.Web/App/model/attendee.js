define(function () {
    var Attendee = function (id, name) {
        var self = this;

        self.id = id;
        self.name = name;
        self.selected = ko.observable(false);
    };

    return Attendee;
});