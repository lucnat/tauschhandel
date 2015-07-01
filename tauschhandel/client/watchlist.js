
Template.watchlist.helpers({
    'interests': function() {
    	return Posts.find({interessenten: Meteor.userId() }).fetch();
 	},
 	'myPosts': function() {
 		return Posts.find({userID: Meteor.userId() });
 	}
 });
