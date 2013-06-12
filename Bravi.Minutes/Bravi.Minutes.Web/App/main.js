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

            //router.map([
            //    {
            //        url: 'category/show',
            //        moduleId: modulesId.category.show,
            //        name: '<i class="icon-tag"></i> Categories',
            //        visible: true,
            //        caption: 'Categories',
            //        settings: {
            //            classColor: 'blue',
            //            classIcon: 'icon-tag',
            //            parentModule: modulesId.welcome
            //        }
            //    }
            //]);
            router.mapNav('minutes');
            router.mapNav('minutes-form');
            router.mapNav('minutes-show');

            app.adaptToDevice();

            //Show the app by setting the root view model for our application with a transition.
            app.setRoot('viewmodels/shell', 'entrance');
        });
    });