Template.detailView.events({
    'submit form': function(event) {
        event.preventDefault();
        var newDiscussionPair = {
            postID: this._id,
            question: $('#text').val(),
            answer: '',
            questioner: Meteor.user()._id,
            published: true,
            changedAt: new Date(),
        }
        PostDiscussions.insert(newDiscussionPair);
        $('#text').val('');
    },
    'click #interesseButton': function() {
        var post = Posts.findOne({
            _id: this._id
        });
        post.interessenten.push(Meteor.user()._id);
        Posts.update({
            _id: this._id
        }, post);
    }
});
Template.detailView.helpers({
    'discussions': function() {
        return PostDiscussions.find({
            postID: this._id,
            published: true
        }).fetch();
    },

    'loggedIn': function(){
        return !!Meteor.user();
    }
});