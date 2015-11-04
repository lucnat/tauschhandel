
Accounts.onCreateUser(function(options, user) {
	user.profile 				= {};
	user.profile.watchlist 		= [];
	user.profile.postleitzahl 	= null;
	user.profile.ORT 			= '';
	user.profile.firstLogin 	= true;
	user.profile.badgeCount 	= 0;
	user.profile.picture 		= "http://i.imgur.com/hzByj22b.jpg";
	user.profile.umgebung 		= [];
	return user;
});

Push.debug = true;

Meteor.startup(function(){
	smtp = {
		username: 'noreplydorfbazaar',   // eg: server@gentlenode.com
		password: 'dorfbazaar44',   // eg: 3eeP1gtizk5eziohfervU
		server:   'smtp.gmail.com',  // eg: mail.gandi.net
		port: 465
	}

	process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
});

Accounts.emailTemplates.siteName = "Bazaar";

Accounts.emailTemplates.from = "Bazaar <support@mysite.com>";

Accounts.emailTemplates.resetPassword.subject = function (user) {
    return "Reset password for " + user.username;
};

Accounts.emailTemplates.resetPassword.text = function (user, url) {
	var splitUrl = url.split('/');
	console.log(splitUrl);
	return url;
    /*
    var token = url.split('/')[url.split('/').length -1];
    var url = splitUrl[0] + '/' + splitUrl[2] + '/reset-password/' + token;
    var message = "Click on the following link to reset your password: \n\n";
    message += url;
    return message;
    */
};
