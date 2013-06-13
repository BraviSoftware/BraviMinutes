define(['durandal/plugins/router', 'durandal/app'], function (router, app) {

    var
        router = router,
        search = ko.observable(),
        activate = function () {
            return router.activate('minutes');
        },
        isHome = ko.computed(function () {
            var activeItem = router.activeItem;
            var isHome = activeItem && activeItem() && (router.visibleRoutes()[0].moduleId === activeItem().__moduleId__);
            if (!isHome)
                search('');
            return isHome;
        });

    return {
        router: router,
        search: search,
        activate: activate,
        isHome: isHome
    };
});