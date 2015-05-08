//Meteor.subscribe('allUsers');
Meteor.subscribe('posts');
Meteor.subscribe('postdiscussions');
Meteor.subscribe('notifications', [ Meteor.user()._id ] )
Meteor.subscribe('messages');
Meteor.subscribe('tags');
Meteor.subscribe('adminshizzle');
Tracker.autorun(function() {
    Meteor.subscribe('allUsers');
});