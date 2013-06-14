// ########################
// # Custom Bind Handlers #
// ########################


(function () {

    // Formate Date
    //-------------------------
    ko.bindingHandlers.formateDate = {
        update: function (element, valueAccessor) {
            function formateDate(date) {
                date = new Date(date);
                var day = date.getDate();
                var month = date.getMonth() + 1; //Months are zero based
                var year = date.getFullYear();
                return (day < 10 ? '0' + day : day) + "/" + (month < 10 ? '0' + month : month) + "/" + year;
            }

            var value = ko.utils.unwrapObservable(valueAccessor());
            if ($(element).is(':text'))
                $(element).val(formateDate(value));
            else
                $(element).text(formateDate(value));
        }
    };

    // Minutes Filter
    //-------------------------
    ko.bindingHandlers.minutesFilter = {
        init: function (element, valueAccessor) {
            $(element).on('keyup', function () {
                var valueFilter = $(this).val();

                $('article', '#minutes-list').filter(function (index) {
                    return containsTilte(this, valueFilter);
                }).slideDown();

                $('article', '#minutes-list').filter(function (index) {
                    return !containsTilte(this, valueFilter);
                }).slideUp();
            });

            function containsTilte(article, filter) {
                return $('.subject', article).text().toLowerCase().indexOf(filter.toLowerCase()) !== -1
            }
        }
    };

    // Collapse Minutes
    //-------------------------
    ko.bindingHandlers.collapseMinutes = {
        init: function (element, valueAccessor) {
            $(element).on('click', function (event) {
                var isShort = $(element).data('view') === 'short';


                if (isShort) {
                    $('article > div.well', '#minutes-list').slideDown();
                    $('article > h3 .minutes-short-links', '#minutes-list').fadeOut();
                }
                else {
                    $('article > div.well', '#minutes-list').slideUp();
                    $('article > h3 .minutes-short-links', '#minutes-list').fadeIn();
                }

                $(element).data('view', isShort ? 'preview' : 'short');
            });

            $(document).on('click', '.subject', function (event) {
                var article = $(this).parents('article');
                var view = article.find('div.well');
                var buttons = article.find('.minutes-short-links');

                if (view.is(':visible')) {
                    view.slideUp();
                    buttons.fadeIn();
                }
                else {
                    view.slideDown();
                    buttons.fadeOut();
                }
            });
        }
    };

    // Wysihtml5
    //-------------------------
    ko.bindingHandlers.wysihtml5 = {
        init: function (element, valueAccessor, allBindingsAccessor) {
            setTimeout(function () {
                var control = $(element).wysihtml5({
                    "events": {
                        "change": function () {
                            var observable = valueAccessor();
                            observable(control.getValue());
                        }
                    }
                }).data("wysihtml5").editor;

            }, 100);
        },
        update: function (element, valueAccessor, allBindingsAccessor) {
            setTimeout(function () {
                var content = valueAccessor();
                if (content) {
                    var control = $(element).data("wysihtml5").editor;
                    control.setValue(content());
                }
            }, 150);
        }
    };

    // Scroll Top
    //-------------------------
    ko.bindingHandlers.scrollTop = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
            $(element).on('click', function () {
                $('html, body').animate({
                    scrollTop: 0
                }, 2000);
            });
        }
    };


})();