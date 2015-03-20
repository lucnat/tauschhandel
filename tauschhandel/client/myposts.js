Template.myposts.helpers({
	'myPosts': function(){
		try{
			return Posts.find({userID: Meteor.user()._id}).fetch();
		} catch(e){}
	}
});

Template.mypost.helpers({
	'discussions': function(){
		return PostDiscussions.find({postID: this._id}).fetch()
	}
});

Template.discussionPair.events({
	'submit form':  function(event){
		event.preventDefault();
		var antwort = event.target.children[0].value;
		PostDiscussions.update({_id: this._id}, {$set: {answer: antwort, published: true}});
	}
});

