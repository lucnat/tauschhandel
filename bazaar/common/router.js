Router.configure({
	layoutTemplate: 'layout',
	notFoundTemplate: 'notFound',
});


var OnBeforeActions;

OnBeforeActions = {
    loginRequired: function(pause) {
      if (!Meteor.userId()) {
        this.render('login');
      } else {
      	this.next();
      }
    },
    firstLogin: function(){
    	try{
	    	if(Meteor.user().profile.firstLogin == true){
	    		this.render('firstLogin1');
	    	} else {
	    		this.next();
	    	}
    	} catch(e) {};
    }
};

Router.onBeforeAction(OnBeforeActions.loginRequired, {
    only: ['home', 'post', 'conversation', 'watchlist', 'notifications', 'profile','conversations']
});
Router.onBeforeAction(OnBeforeActions.firstLogin, {
    only: ['home', 'post', 'conversation', 'watchlist', 'notifications', 'profile','conversations']
});

Router.route('/', {name: 'home'});

Router.route('/post/:_id', {name: 'post'});

Router.route('/conversation/:_id', {name: 'conversation'});

Router.route('/watchlist', {name: 'watchlist'});

Router.route('/notifications', {name: 'notifications'});

Router.route('/profile', {name: 'profile'});

Router.route('/user/:_id', {name: 'user'});

Router.route('/login', {name: 'login'});

Router.route('/conversations', {name: 'conversations'});

Router.route('/firstLogin1', {name: 'firstLogin1'});
Router.route('/firstLogin2', {name: 'firstLogin2'});
Router.route('/firstLogin3', {name: 'firstLogin3'});

/*
use default shit on each route: 

	{{#contentFor "headerTitle"}}
		<h1 class="title">Home</h1>
	{{/contentFor}}

	....  


	{{#ionView}}
	  {{#ionContent}}
		{{> actual content}}
	  {{/ionContent}}
	{{/ionView}}
*/

AccountsTemplates.configure({
    showLabels: false,
	focusFirstInput: false,
   	showForgotPasswordLink: true,
	enablePasswordChange: true,
});


AccountsTemplates.addFields([
	{
	_id: "username",
	type: "text",
	displayName: "username",
	required: true,
	minLength: 5,
	}
]);

T9n.setLanguage('de');

AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('resetPwd');
