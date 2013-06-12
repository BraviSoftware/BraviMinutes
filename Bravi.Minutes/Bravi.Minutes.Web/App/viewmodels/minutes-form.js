define(['services/minutes-service', 'durandal/plugins/router'], function (service, router) {

    var
	    minute = ko.observable({}),
        activate = function (routeData) {
            if (routeData && routeData.id)
                $.when(service.getById(routeData.id)).done(minute);
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
        activate: activate,
        save: save,
        cancel: cancel
    };
});