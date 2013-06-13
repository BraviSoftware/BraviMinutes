define(function () {
    var Minute = function (id, date, subject, notes, totalAttendees, attendees) {
        var self = this;

        self.id = ko.observable(id || 0);
        self.date = ko.observable(date || new Date());
        self.subject = ko.observable(subject || '');
        self.notes = ko.observable(notes || '');
        self.totalAttendees = ko.observable(totalAttendees || 0);
        self.attendees = ko.observable(attendees || []);

        return self;
    };

    return Minute;
});