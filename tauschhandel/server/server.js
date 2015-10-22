
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