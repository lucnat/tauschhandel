//Meteor.subscribe('allUsers');
Meteor.subscribe('postdiscussions');

Tracker.autorun(function(){
	try{
		Meteor.subscribe('notifications', Meteor.userId());
		Meteor.subscribe('posts', Meteor.user().profile.postleitzahl);
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
		Meteor.subscribe('conversations', Meteor.userId());
	} catch(e) {}
});
