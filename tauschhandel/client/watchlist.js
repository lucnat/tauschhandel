
Template.watchlist.helpers({
    'watchList': function() {
    	try{
	        var watchList = Meteor.user().profile.watchlist;
	    	return Posts.find({'_id': {$in: watchList} }).fetch();
    	} catch(e) {};
    	return [];
 	},
 	'myPosts': function() {
 		return Posts.find({userID: Meteor.userId() }).fetch();
 	}
 });
