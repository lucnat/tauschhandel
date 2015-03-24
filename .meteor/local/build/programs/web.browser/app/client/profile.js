(function(){Template.nachrichten.helpers({
	'nachrichten': function(){
		var me = Meteor.user()._id;
		console.log(me);
		var myOutbox = Messages.find({absender: me}).fetch();
		var myInbox = Messages.find({empfaenger: me}).fetch();

		return myInbox.concat(myOutbox);
	}
});

Template.nachricht.helpers({
	'absenderName': function(){
		return Users.findOne({'_id': this.absender}).username;
	},
	'empfaengerName': function(){
		return Users.findOne({'_id': this.empfaenger}).username;
	},
});

})();
