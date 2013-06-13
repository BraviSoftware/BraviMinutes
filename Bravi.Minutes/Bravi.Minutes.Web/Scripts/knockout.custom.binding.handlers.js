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
})();