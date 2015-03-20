

Meteor.publish('allUsers', function() {
	return Users.find({},  {fields: {'username': 1}});
});

Meteor.publish('posts', function(){
	return Posts.find({});
});

Meteor.publish('messages', function(){
	//TODO: do not publish all messages, but only if current user is sender or recipient
	return Messages.find({});
});

Meteor.publish('tags', function(){
	return Tags.find({});
});

// TODO: publish adminShizzle database only to admins / mods