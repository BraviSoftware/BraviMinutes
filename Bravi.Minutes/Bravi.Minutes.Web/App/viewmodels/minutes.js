define(['services/minutes-service'], function(service) {
    var 
        minutes = ko.observable(),
        activate = function () {
            $.when(service.getAll())
             .done(function (result) {
                 minutes(result);
             });
        },
        formateDate = function (date) {
            date = new Date(date);
            var day = date.getDate();
            var month = date.getMonth() + 1; //Months are zero based
            var year = date.getFullYear();
            return (day < 10 ? '0' + day : day) + "/" + (month < 10 ? '0' + month : month) + "/" + year;
        };

    return {
        minutes: minutes,
        activate: activate,
        formateDate: formateDate
    };
});