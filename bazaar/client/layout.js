
Template.layout.helpers({
	'notificationsBadge': function(){
		updateBadge();
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
		updateBadge();
		return badgeCount;
	},
	'hideTabs': function(){
		return !!Session.get('hideTabs');
	}
});

Template.layout.rendered = function(){
	document.addEventListener("backbutton", onBackButtonDown, false);

	function onBackButtonDown(event) {
		var modalOpen = $('body').hasClass('modal-open');
		if(modalOpen){
			IonModal.close();
			event.preventDefault();
			event.stopPropagation();
		}
	}
}