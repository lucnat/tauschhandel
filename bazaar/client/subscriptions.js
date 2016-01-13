
Meteor.subscribe('postdiscussions');

Meteor.subscribe('notifications');
Meteor.subscribe('conversations');		

Meteor.subscribe('userData');
Meteor.subscribe('allUsers');

Meteor.subscribe('tags');
Meteor.subscribe('stats');


Tracker.autorun(function () {
	try{
		//var plzUmgebung = Meteor.user().profile.plzUmgebung;
		//var plzUmgebung = Users.findOne(Meteor.userId() /*, {fields: {'profile.plzUmgebung': 1}}*/).profile.plzUmgebung;
		if(Meteor.user()){
			Meteor.subscribe('posts', Meteor.user());
		}
	} catch(e) {}
});

