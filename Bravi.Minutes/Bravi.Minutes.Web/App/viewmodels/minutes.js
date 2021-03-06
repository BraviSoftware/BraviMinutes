﻿define(['services/minutes-service', 'durandal/plugins/router'], function (service, router) {
    var
        minutes = ko.observable(),
        activate = function () {
            return $.when(service.getAll()).done(minutes);
        },
        goToNew = function () {
            router.navigateTo('#/minutes-form');
        },
        goToShowFullMinute = function (data, event) {
            var url = '#/minutes-show/' + data.id;
            router.navigateTo(url);
        };

    return {
        minutes: minutes,
        activate: activate,
        goToNew: goToNew,
        goToShowFullMinute: goToShowFullMinute
    };
});