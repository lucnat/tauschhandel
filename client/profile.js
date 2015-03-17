Template.nachrichten.helpers({
	'nachrichten': function(){
		var me = Meteor.user()._id;
		var myOutbox = Messages.find({absender: me}).fetch();
		var myInbox = Messages.find({empfaenger: me}).fetch();

		return myInbox.concat(myOutbox);
	}
});