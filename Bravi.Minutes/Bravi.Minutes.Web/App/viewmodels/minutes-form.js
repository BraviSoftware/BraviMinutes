define(['services/minutes-service', 'services/attendees-service', 'model/attendee', 'durandal/plugins/router'], function (serviceMinutes, serviceAttendees,
    attendeeModel, router) {

    var
	    minute = ko.observable({}),
        attendees = ko.observableArray([]),

        activate = function (routeData) {

            $.when(serviceAttendees.getAll()).done(attendeesLoaded);

            var attendeesLoaded = function (attendeesData) {
                attendees(attendeesData);

                if (routeData && routeData.id) {

                    $.when(serviceMinutes.getById(routeData.id)).done(successMinutesCall);

                    var successMinutesCall = function (minuteData) {
                        minute(minuteData);

                        $(attendeeData).each(function (index, item) {
                            var hasAttendee = minuteData.attendees.filter(function (o) {
                                return o.id === item.id;
                            });

                            attendeeList.push(new attendeeModel(item.id, item.name, hasAttendee));
                        });

                        attendees(attendeeList);
                    };
                }
            };

            if (routeData && routeData.id)
                return $.when(service.getById(routeData.id)).done(minute);
            else
                minute(new Minute());
        },
	    save = function (data, event) {
	        if (minute() && minute().id && minute().id() > 0)
	            service.update(minute());
	        else
	            service.create(minute());
	    },
	    cancel = function (argument) {
	        router.navigateTo('#/');
	    };

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

    return {
        minute: minute,
        attendees: attendees,
        activate: activate,
        save: save,
        cancel: cancel
    };
});