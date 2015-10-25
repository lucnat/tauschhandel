
Accounts.onCreateUser(function(options, user) {
	user.profile 				= {};
	user.profile.watchlist 		= [];
	user.profile.postleitzahl 	= null;
	user.profile.firstLogin 	= true;
	user.profile.badgeCount 	= 0;
	user.profile.picture 		= "http://i.imgur.com/hzByj22b.jpg";
	return user;
});

Push.debug = true;

Meteor.startup(function(){
	smtp = {
		username: 'tauschhandelapp',   // eg: server@gentlenode.com
		password: 'tauschhandel44',   // eg: 3eeP1gtizk5eziohfervU
		server:   'smtp.gmail.com',  // eg: mail.gandi.net
		port: 465
	}

	process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
});