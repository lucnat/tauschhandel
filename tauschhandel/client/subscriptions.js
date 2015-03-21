//Meteor.subscribe('allUsers');
Meteor.subscribe('posts');
Meteor.subscribe('postdiscussions');
Meteor.subscribe('messages');
Meteor.subscribe('tags');
Meteor.subscribe('adminshizzle');
Tracker.autorun(function() {
    Meteor.subscribe('allUsers');
});