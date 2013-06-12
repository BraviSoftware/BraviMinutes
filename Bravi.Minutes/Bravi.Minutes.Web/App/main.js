requirejs.config({
    paths: {
        'text': 'durandal/amd/text'
    }
});

define(['durandal/app', 'durandal/viewLocator', 'durandal/system', 'durandal/plugins/router'],
    function (app, viewLocator, system, router) {

        //>>excludeStart("build", true);
        system.debug(true);
        //>>excludeEnd("build");

        app.title = 'Durandal Starter Kit';
        app.start().then(function () {
            //Replace 'viewmodels' in the moduleId with 'views' to locate the view.
            //Look for partial views in a 'views' folder in the root.
            viewLocator.useConvention();

            //configure routing
            router.useConvention();
            router.map([
            {
                url: 'minutes',
                moduleId: 'viewmodels/minutes',
                name: 'Minutes',
                visible: true,
                caption: 'Minutes'
            },
            {
                url: 'minutes-show/:id',
                moduleId: 'viewmodels/minutes-show',
                name: 'Minutes',
                visible: true,
                caption: 'Minutes'
            },
            {
                url: 'minutes-form',
                moduleId: 'viewmodels/minutes-form',
                name: 'Minutes',
                visible: true,
                caption: 'Minutes'
            },
            {
                url: 'minutes-form/:id',
                moduleId: 'viewmodels/minutes-form',
                name: 'Minutes',
                visible: true,
                caption: 'Minutes'
            }
            ]);

            app.adaptToDevice();

            //Show the app by setting the root view model for our application with a transition.
            app.setRoot('viewmodels/shell', 'entrance');
        });
    });