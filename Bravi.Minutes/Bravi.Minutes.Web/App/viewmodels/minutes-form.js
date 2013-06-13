define(['services/minutes-service', 'services/attendees-service', 'model/attendee', 'model/minute', 'durandal/plugins/router'],
    function (serviceMinutes, serviceAttendees, Attendee, Minute, router) {

        var
            minute = ko.observable({}),
            attendees = ko.observableArray([]),

            activate = function (routeData) {
                // Fetch default model
                minute(new Minute());

                //~> Remove it after implement atteendees load
                if (routeData && routeData.id && routeData.id > 0)
                    $.when(serviceMinutes.getById(routeData.id, minute));
                //~> End

                $.when(serviceAttendees.getAll()).done(attendeesLoaded);

                var attendeesLoaded = function (attendeesData) {
                    attendees(attendeesData);

                    if (!routeData || !routeData.id || routeData.id <= 0) return;

                    $.when(serviceMinutes.getById(routeData.id)).done(successMinutesCall);

                    var successMinutesCall = function (minuteData) {
                        minute(minuteData);

                        $(attendeeData).each(function (index, item) {
                            var hasAttendee = minuteData.attendees.filter(function (o) {
                                return o.id === item.id;
                            });

                            attendeeList.push(new Attendee(item.id, item.name, hasAttendee));
                        });

                        attendees(attendeeList);
                    };
                };
            },
            save = function (data, event) {
                if (minute() && minute().id && minute().id() > 0)
                    serviceMinutes.update(minute());
                else
                    serviceMinutes.create(minute());
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