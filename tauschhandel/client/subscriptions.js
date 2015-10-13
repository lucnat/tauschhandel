//Meteor.subscribe('allUsers');
Meteor.subscribe('posts');
Meteor.subscribe('postdiscussions');

Tracker.autorun(function(){
	try{
		Meteor.subscribe('notifications', Meteor.user()._id);
	} catch(e) {}	
});

Meteor.subscribe('messages');
Meteor.subscribe('tags');
Meteor.subscribe('adminshizzle');

Tracker.autorun(function() {
    Meteor.subscribe('allUsers');
});

Tracker.autorun(function(){
	try{
		Meteor.subscribe('conversations', Meteor.user()._id);
	} catch(e) {}
});
