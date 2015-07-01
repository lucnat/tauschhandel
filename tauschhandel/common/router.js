Router.configure({
	layoutTemplate: 'layout',
});

Router.route('/', {name: 'home'});

Router.route('/post/:_id', {name: 'post'});

Router.route('/watchlist', {name: 'watchlist'});

Router.route('/notifications', {name: 'notifications'});

Router.route('/profile', {name: 'profile'});

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
s
*/