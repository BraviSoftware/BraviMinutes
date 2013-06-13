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
            $(document).on('keyup', element, function (event) {
                var valueFilter = $(event.data).val();

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

    // Wysihtml5
    //-------------------------
    ko.bindingHandlers.wysihtml5 = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
            setTimeout(function () {
                var control = $(element).wysihtml5({
                    "events": {
                        "change": function () {
                            var observable = valueAccessor();
                            observable(control.getValue());
                        }
                    }
                }).data("wysihtml5").editor;
            }, 300);

        },
        update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
            var content = valueAccessor();

            if (content != undefined) {
                setTimeout(function () {
                    var control = $(element).data("wysihtml5").editor;
                    control.setValue(content());
                }, 350);
            }
        }
    };

    // Scroll Top
    //-------------------------
    ko.bindingHandlers.scrollTop = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
            $(document).on('click', element, function () {
                $('html, body').animate({
                    scrollTop: 0
                }, 2000);
            });
        }
    };

   
})();