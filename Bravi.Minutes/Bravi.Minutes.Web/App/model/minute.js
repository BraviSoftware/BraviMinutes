define(function () {
    var Minute = function () {
        var self = this;

        self.attendees = ko.observable([]);
        self.id = ko.observable(0);
        self.date = ko.observable(new Date());
        self.subject = ko.observable('');
        self.notes = ko.observable('');
        self.totalAttendees = ko.observable(0);

        return self;
    };

    return Minute;
});