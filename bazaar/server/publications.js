

Meteor.publish('userData', function () {
    return Meteor.users.find({_id: this.userId});
});


Meteor.publish('allUsers', function() {
	return Users.find({},  {fields: {
		'username': 1, 
		'profile.ORT': 1,
		'profile.picture': 1,
		'profile.postleitzahl': 1,
		'profile.coordinates': 1,
		'profile.firstLogin': 1
	}});
});

Posts._ensureIndex({'location': '2dsphere'});

Meteor.publish('posts', function(user){
	return Posts.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: user.profile.coordinates
          },
          $maxDistance: user.profile.radius*1000
        }
      }
	});
});

Meteor.publish('postdiscussions', function(){
	return PostDiscussions.find({published: true});
});

Meteor.publish('notifications', function(){
	return Notifications.find({ receiver: this.userId });
});

Meteor.publish('stats', function(){
	return Stats.find();
});

Meteor.publish('conversations', function(){
	// do not publish all conversations, but only if current user is creator or partner
	return Conversations.find({$or: [{creator: this.userId},{partner: this.userId}]});
});

Meteor.publish('tags', function(){
	return Tags.find({});
});

