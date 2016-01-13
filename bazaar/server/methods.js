Meteor.methods({
	'changeUsername': function (id, username) {
		Users.update({'_id': id},{$set: {'username': username}});
	},
	'pushTest': function(){
		console.log('performing push test...');
		Push.send({from: 'push',title: 'Congratulations',text: 'Push Test!!!!!', badge: 1, query: {}});	
		console.log('send function called');
	},
	'pushFromNotification': function(notification){
		var profile = Users.findOne(notification.receiver).profile;
		var badge = profile.badgeCount + 1;
		Push.send({
			from: 'push',
			title: notification.postTitle, 
			text: notification.message + ' ' + notification.postTitle, 
			badge: badge, 
			query: {'userId': notification.receiver}
		});	
		profile.badgeCount = badge;
		Users.update({'_id': notification.receiver}, {$set: {'profile': profile}});
	}, 
	'pushFromItemGewonnen': function(userId, message){
		var profile = Users.findOne(userId).profile;
		var badge = profile.badgeCount + 1;
		Push.send({
			from: 'push',
			title: 'Item gewonnen', 
			text: message, 
			badge: badge, 
			query: {'userId': userId}
		});	
		profile.badgeCount = badge;
		Users.update({'_id': userId}, {$set: {'profile': profile}});
	},
	'pushFromMessage': function(message){
		var profile = Users.findOne(message.to).profile;
		var badge = profile.badgeCount + 1;
		var sender = Users.findOne(message.from).username;
		Push.send({
			from: 'push',
			title: 'Neue Nachricht von ' + sender,
			text:  'Nachricht von ' + sender + " : " + message.message,
			badge: badge, 
			query: {'userId': message.to}
		});	

		profile.badgeCount = badge;
		Users.update({'_id': message.to}, {$set: {'profile': profile}});
	},
	'getOrt': function(plz){
		plz = plz/1.0;
		return Gemeinden.findOne({'plz': plz}).ORT;
	},
	'reportSpam': function(id, userId){
		Reported.insert({
			'id': id,
			'reportedAt': new Date(),
			'fromUser': userId,
		});
	    Email.send({
	      to: 'basaarschweiz@gmail.com',
	      subject: 'Spam wurde gemeldet',
	      text: 'Post: \n http://46.101.207.204/post/'+id + " \n\n Gemeldet von user\n http://basaar.ch/user/"+userId,
	    });
	},
	'getStats': function(){
		var stats = {
			'users': Users.find().count(),
			'posts': Posts.find().count()
		}
		return stats;
	},
	'updateStats': function(){
		var users = Users.find().fetch();
		var zipUsers = {};
		users.forEach(function(user){
			if(zipUsers[user.profile.postleitzahl]){
				zipUsers[user.profile.postleitzahl] = zipUsers[user.profile.postleitzahl] + 1;
			} else {
				zipUsers[user.profile.postleitzahl] = 1;
			}
		});
		var posts = Posts.find().fetch();
		var zipPosts = {};
		posts.forEach(function(post){
			if(zipPosts[post.postleitzahl]){
				zipPosts[post.postleitzahl] = zipPosts[post.postleitzahl] + 1;
			} else {
				zipPosts[post.postleitzahl] = 1;
			}
		});

		var stats = {
			'which': 'this',
			'totalUsers': Users.find().count(),
			'usersByZip': zipUsers,
			'totalPosts': Posts.find().count(),
			'postsByZip': zipPosts, 
			'totalNotifications': Notifications.find().count(),
			'totalDiscussions': PostDiscussions.find().count(),
			'totalConversations': Conversations.find().count()
		}
		Stats.update({'which': 'this'}, stats);
	},

	'getLnglatFromPLZ': function(plz){
		return getLnglatFromPLZ(plz);
	},

	'addToExistingUsers': function(){
		// Adds lnglat coordinates to existing user
		var users = Users.find().fetch();
		users.forEach(function(user){
			try{
				var lnglat = getLnglatFromPLZ(user.profile.postleitzahl);
				Users.update(user._id, {$set: {'profile.coordinates': lnglat}});
			} catch(e) {};
		});
	},
	'addToExistingPosts': function(){
		// Adds lnglat coordinates to existing post
		var posts = Posts.find().fetch();
		posts.forEach(function(post){
			var gemeinde = null;
			for(var i=0; i<gemeinden.length; i++){
				if(gemeinden[i].plz == post.postleitzahl){
					gemeinde = gemeinden[i];
					break;
				}
			}
			Posts.update(post._id, {$set: {'location': { type: "Point", coordinates: [gemeinde.Longitude, gemeinde.Latitude]}}})
		});
	},
	'cleanUsersWithNoPLZ': function(){
		// deletes all users that have no lnglat 
		var users = Users.find({'profile.postleitzahl': null}).fetch();
		users.forEach(function(user){
			Users.remove(user._id);
		});
	},
	'cleanUpUsers': function(){
		var users = Users.find().fetch();
		users.forEach(function (user) {
			Users.update({'_id': user._id}, {$set: {'profile.umgebung': ''}});
		});

	}
});

getLnglatFromPLZ = function(plz){
	console.log('searching for plz ' + plz);
	var gemeinde = null;
	for(var i=0; i<gemeinden.length; i++){
		if(gemeinden[i].plz == plz){
			gemeinde = gemeinden[i];
			break;
		}
	}
	return [gemeinde.Longitude, gemeinde.Latitude];
}

