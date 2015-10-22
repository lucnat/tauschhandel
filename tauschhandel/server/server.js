
Accounts.onCreateUser(function(options, user) {
	user.profile 				= {};
	user.profile.watchlist 		= [];
	user.profile.postleitzahl 	= null;
	user.profile.firstLogin 	= true;
	user.profile.badgeCount 	= 0;
	return user;
});

Push.debug = true;