
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
		} else if($('body').hasClass('action-sheet-open')){
			IonActionSheet.close();
		} else if($('.back-button').length > 0){
			//means there is a back-button, let's press it
			$('.back-button').click()
		} else if(! $($('.tab-item')[0]).hasClass('active') ){
			// means we are not in home tab, lets go there
			$($('.tab-item')[0]).click();
		} else if($('body').hasClass('popup-open')){
			// lets leave it open and do nothing
		} else {
	        IonPopup.confirm({
	            title: 'Basaar App schliessen?',
	            template: '',
	            onOk: function() {
					navigator.app.exitApp();	            },
	            onCancel: function() {

	            }
	        });
		}
	}
}