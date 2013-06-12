define(['services/minutes-service', 'durandal/plugins/router'], function (service, router) {
    var
	    minute = ko.observable(),
        activate = function (routeData) {
            if (!routeData || !routeData.id) router.navigateTo('#/');

            return $.when(service.getById(routeData.id)).done(minute);
        },
	    goToEdit = function () {
	        var url = '#/minutes-form/' + minute.id;
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