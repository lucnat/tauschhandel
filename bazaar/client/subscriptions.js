//Meteor.subscribe('allUsers');
Meteor.subscribe('postdiscussions');

Tracker.autorun(function(){
	try{
		Meteor.subscribe('notifications', Meteor.userId());

		var umgebung = [Meteor.user().profile.postleitzahl];
		Meteor.user().profile.umgebung.forEach(function(gemeinde){
			umgebung.push(gemeinde.plz);
		});
		Meteor.subscribe('posts', umgebung);
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
