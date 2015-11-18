
Accounts.onCreateUser(function(options, user) {
	user.profile 				= {};
	user.profile.watchlist 		= [];
	user.profile.postleitzahl 	= null;
	user.profile.ORT 			= '';
	user.profile.firstLogin 	= true;
	user.profile.badgeCount 	= 0;
	user.profile.picture 		= "http://i.imgur.com/hzByj22b.jpg";
	user.profile.umgebung 		= [];
	if(!user.username){
		// user used facebook login
		user.username = user.services.facebook.name;
		user.profile.picture = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?width=400&height=400"; 
	}
	return user;
});

Meteor.startup(function(){
	smtp = {
		username: 'infobasaar',   		// eg: server@gentlenode.com
		password: 'basaar44',   		// eg: 3eeP1gtizk5eziohfervU
		server:   'smtp.gmail.com',  	// eg: mail.gandi.net
		port: 465
	}
	process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
});

Accounts.emailTemplates.siteName = "Basaar";

Accounts.emailTemplates.from = "Basaar <info.basaar@gmail.com>";

Accounts.emailTemplates.resetPassword.subject = function (user) {
    return "Passwort zurücksetzen:  " + user.username;
};

Accounts.emailTemplates.resetPassword.text = function (user, url) {
	var splitUrl = url.split('/');
	var text = "Hallo " + user.username + " \n\n Du hast vor Kurzem das Zurücksetzen des Passworts deines Basaar-Accounts veranlasst. Klicke unten auf den Link, um fortzufahren.\n\n"
	text = text + url + "\n\n";
	text = text + "Mit freundlichen Grüssen \n das Basaar-Team"
	return text;
    /*
    var token = url.split('/')[url.split('/').length -1];
    var url = splitUrl[0] + '/' + splitUrl[2] + '/reset-password/' + token;
    var message = "Click on the following link to reset your password: \n\n";
    message += url;
    return message;
    */
};

/*

Meteor.startup(function(){
	smtp = {
		username: 'basaarschweiz',   		// eg: server@gentlenode.com
		password: 'basaar44',   		// eg: 3eeP1gtizk5eziohfervU
		server:   'smtp.gmail.com',  	// eg: mail.gandi.net
		port: 465
	}
	process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
});


*/