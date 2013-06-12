define(['durandal/plugins/router'], function (router) {
	var formateDate = function(date) {
		var day = date.getDate();
		var month = date.getMonth() + 1; //Months are zero based
		var year = date.getFullYear();
		return (day < 10 ? '0'+day : day) + "/" + (month < 10 ? '0'+month : month) + "/" + year;
	},
	minute = {	
		id: 0,
		date: formateDate(new Date()),
		subject: 'Entities and Value Objects',
		notes:'<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla at laoreet eros. Donec interdum, sem a volutpat pharetra, magna dui viverra turpis, eu placerat ligula tortor vitae orci. Nullam eget dolor id lectus placerat euismod at eget magna. Curabitur imperdiet magna ut purus eleifend iaculis. Aenean ornare facilisis quam, vel luctus ante interdum nec. Curabitur quis turpis dictum, tincidunt neque sit amet, dictum nulla. Donec rhoncus augue dolor, non rhoncus purus molestie eu.</p>'+
		'<p>Quisque suscipit consectetur porttitor. Duis venenatis, nisl a lobortis dignissim, risus lorem sollicitudin sapien, ac commodo nibh odio non neque. Vivamus placerat imperdiet consequat. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Morbi vitae diam rhoncus, ornare nibh at, euismod massa. Integer sagittis lacus eget felis vestibulum, at adipiscing massa rhoncus. Donec sagittis tincidunt placerat. Phasellus risus magna, dapibus in vestibulum eu, sodales eget mauris.</p>'+
		'<p>Nulla fringilla nec lacus eget rutrum. Integer lacinia mi eget tincidunt accumsan. Fusce gravida sed mauris eget tempor. Quisque dapibus turpis ac fringilla viverra. Morbi eu porttitor magna. Nullam volutpat faucibus nibh sit amet sodales. Aenean molestie, est nec pretium scelerisque, elit felis pulvinar purus, ac adipiscing metus lectus nec diam. Nullam tempus arcu sit amet adipiscing lacinia. Vivamus pellentesque mollis odio eget feugiat. Proin sollicitudin fringilla erat vitae tempus. Nam in sollicitudin elit, nec euismod tortor.</p>'+
		'<p>Phasellus pharetra pellentesque scelerisque. Phasellus varius posuere orci, id viverra mi euismod eu. Sed condimentum, libero in interdum interdum, lectus lectus tincidunt nisl, et placerat ante lorem dapibus lectus. Nulla eget lacus erat. Aliquam eget est vel purus eleifend fermentum sit amet in velit. Vestibulum scelerisque dui nec sollicitudin varius. Sed sodales mauris sit amet mi mollis, at volutpat nisl viverra. Etiam sagittis elit ut nibh hendrerit interdum. Nullam magna orci, tincidunt ac nisi ut, auctor rutrum quam. Sed id dolor ligula. Morbi porta ultrices dui at molestie. Mauris nulla orci, hendrerit eget porta vitae, accumsan vel sapien. Mauris eleifend libero ut tortor placerat ultricies. Etiam cursus, odio eget aliquet auctor, mauris enim sagittis elit, sit amet hendrerit odio est id metus. Donec ac nisi tellus. Curabitur molestie, sem ac venenatis imperdiet, justo ante rutrum purus, quis tincidunt arcu nunc sed risus.</p>'+
		'<p>Cras rhoncus tellus a tortor aliquam, eu malesuada neque sodales. Nullam ullamcorper, mi id rhoncus viverra, lectus lacus vestibulum neque, vitae congue nisl augue nec felis. Vestibulum scelerisque tristique orci, non ultrices ante tristique aliquam. Aliquam elementum felis ut lectus congue ultrices. Suspendisse fringilla dui lorem, ut pellentesque enim vulputate id. Donec a leo vitae tellus lacinia vehicula. Mauris aliquet neque at lectus ullamcorper euismod. Morbi dictum nunc blandit fermentum fringilla. Mauris venenatis vitae quam a mattis. Sed sit amet feugiat lorem. Donec sem ipsum, accumsan sit amet elementum vitae, egestas vitae lacus. Aliquam auctor velit ac arcu rutrum, vel ullamcorper est pellentesque.</p>',
		attendees: [ {name: 'Alex'}, {name: 'Daniel'}]
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
		goToEdit: goToEdit,
		goBack: goBack
	};
});