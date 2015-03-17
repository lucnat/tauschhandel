Template.detailView.events({
	'submit form': function(event){
		event.preventDefault();
		console.log(this);
		var message = {
			subject: 	'Frage zu '+ this.title,
			text: 		$('#text').val(),
			absender: 	Meteor.user()._id,
			empfaenger: this.userID,
			sentAt: 	new Date(),
			readAt: 	null,
		}

		Messages.insert(message);
	},
});
