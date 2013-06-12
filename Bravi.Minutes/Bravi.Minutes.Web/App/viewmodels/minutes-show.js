define(['services/minutes-service', 'durandal/plugins/router'], function (service, router) {
    var
	    minute = ko.observable(),
        activate = function (routeData) {
            if (!routeData || !routeData.id) router.navigateTo('#/');

            return $.when(service.getById(routeData.id)).done(minute);
        },
	    goToEdit = function (data, event) {
	        var url = '#/minutes-form/' + data.id;
	        router.navigateTo(url);
	    },
	    goBack = function (argument) {
	        router.navigateTo('#/');
	    };

    return {
        minute: minute,
        activate: activate,
        goToEdit: goToEdit,
        goBack: goBack
    };
});