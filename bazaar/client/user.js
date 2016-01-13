Template.user.helpers({
	'user': function(){
		return Users.findOne(Router.current().params._id);
	},
	'angebote': function(){
		return Posts.find({'userID': Router.current().params._id}).fetch();
	}
});

Tracker.autorun(function(){
	// set default radius for users that created account before radius update
	if(Meteor.user()){
		if(!Meteor.user().profile.radius){
			Users.update({'_id': Meteor.userId()}, {$set: {'profile.radius': 25}});
		}
	}
});
