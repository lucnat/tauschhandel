Template.layout.events({
	'click .notificationstab': function(){
		alert('gotcha');
	}
});

Template.layout.helpers({
	'notificationsBadge': function(){
		return Notifications.find({'readAt': null}).count();
	}
});