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
        },
	    save = function (data, event) {
	        var url = '#/minutes-form/' + data.id;
	        router.navigateTo(url);
	    },
	    cancel = function (argument) {
	        router.navigateTo('#/');
	    };

    return {
        minute: minute,
        attendees: attendees,
        activate: activate,
        save: save,
        cancel: cancel
    };
});