(function(){Template.detailView.events({
	'submit form': function(event){
		event.preventDefault();
		
		var newDiscussionPair = {
			question: 	$('#text').val(),
			answer: 	'', 
			questioner: Meteor.user()._id,
			answered: 	false,
			published: 	false,
			changedAt: 	new Date(),
		}

		var post = Posts.findOne({_id: this._id})
		post.discussion.push(newDiscussionPair);
		Posts.update({_id: this._id}, post);
	},

	'click #interesseButton': function(){
		var post = Posts.findOne({_id: this._id});
		post.interessenten.push(Meteor.user()._id);
		Posts.update({_id: this._id}, post);
	}
});


})();
