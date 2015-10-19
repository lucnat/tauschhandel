Meteor.methods({
	'changeUsername': function (id, username) {
		Users.update({'_id': id},{$set: {'username': username}});
	}
});