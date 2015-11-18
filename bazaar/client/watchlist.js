
Template.watchlist.helpers({
    'watchList': function() {
    	try{
	        var watchList = Meteor.user().profile.watchlist;
	    	return Posts.find({'_id': {$in: watchList} }).fetch();
    	} catch(e) {};
    	return [];
 	},
 	'interesseGemeldet': function(){
 		return Posts.find({'interessenten': Meteor.userId()}).fetch();
 	},
 	'wonByMe': function(){
 		return Posts.find({'vergebenAn': Meteor.userId()});
 	},
 	'myPosts': function() {
 		return Posts.find({userID: Meteor.userId() }).fetch();
 	}
 });

Template.watchlist.rendered = function(){
	$('.tab-item').get(1).click();
};