﻿define(['services/minutes-service', 'services/attendees-service', 'model/attendee', 'model/minute', 'durandal/plugins/router'],
    function (serviceMinutes, serviceAttendees, Attendee, Minute, router) {

        var minute = ko.observable({}),
            attendees = ko.observableArray([]),
            activate = function (routeData) {
                
                var deffered = $.Deferred();

                $.when(serviceAttendees.getAll()).done(attendeesLoaded);

                function attendeesLoaded(attendeesData) {
                    fillAttendees(attendeesData);

                    if (!routeData || !routeData.id || routeData.id <= 0) {
                        minute(new Minute());
                        deffered.resolve();
                        return;
                    }

                    $.when(serviceMinutes.getById(routeData.id)).done(function (minutesData) { successMinutesCall(attendeesData, minutesData); });

                    function successMinutesCall(attendeeData, minuteData) {
                        minute(new Minute(minuteData.id, minuteData.date, minuteData.subject, minuteData.notes, minuteData.totalAttendees));

                        $(attendees()).each(function (index, item) {
                            var hasAttendee = minuteData.attendees.filter(function (o) {
                                return o.id === item.id;
                            });

                            item.selected(hasAttendee && hasAttendee.length > 0);
                        });

                        deffered.resolve();
                    };
                };

                return deffered.promise();
            },
            fillAttendees = function (attendeesCollection) {
                var attendeeList = [];
                $(attendeesCollection).each(function (index, item) {
                    attendeeList.push(new Attendee(item.id, item.name));
                });

                attendees(attendeeList);
            },
            save = function (data, event) {

                //get right attendees
                var selectedAttendees = attendees().filter(function (o) {
                    return o.selected() === true;
                });

                minute().attendees(selectedAttendees);

                // Editing
                if (minute() && minute().id && minute().id() > 0) {
                    $.when(serviceMinutes.update(minute())).done(success).fail(fail);
                } // Creating
                else {
                    $.when(serviceMinutes.create(minute())).done(success).fail(fail);
                }

                function success() {
                    toastr.success('Successfully Saved');
                    router.navigateTo('#/');
                }

                function fail() {
                    toastr.success('Error During Saving the Minute');
                }
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