
Template.layout.helpers({
	'notificationsBadge': function(){
		console.log('amount of notifications: '+ Notifications.find({'readAt': null}).count());
		return Notifications.find({'readAt': null}).count();
	},
	'conversationsBadge': function(){
		var conversations = Conversations.find().fetch();
		var badgeCount = 0;
		conversations.forEach(function(conversation){
			conversation.messages.forEach(function(message){
				if(message.to == Meteor.user()._id && !message.readAt){
					badgeCount++;
				}
			});
		});
		console.log('amount of conversations: ' + badgeCount);
		return badgeCount;
	}
});