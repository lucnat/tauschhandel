Template.hello.events({
	'click #mitmachen': function(){
		window.localStorage.setItem('hasStartedBefore', 'true');
		Router.go('/');
	}
});

Template.hello.rendered = function(){
	Session.set('hideTabs', true);
	if(window.localStorage.getItem('hasStartedBefore')){
		Router.go('/');
	}
}

Template.hello.destroyed = function(){
	Session.set('hideTabs', false);
}