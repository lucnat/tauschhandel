Template.discussion.helpers({

    'discussions': function(){
        return PostDiscussions.find({postID: this._id}).fetch();
    },

    'loggedIn': function(){
        return !!Meteor.user();
    },

    'previewMode': function(){
        console.log('PreviewMode: ' + Session.get('previewMode'));
        return Session.get('previewMode');
    }

});

Template.discussionPair.helpers({
    'isMyPost': function(){
        var post = Posts.findOne({_id: this.postID});
        console.log(post);
        if(post.userID === Meteor.user()._id)
            return true
        else
            return false;
    }

});

Template.discussionPair.events({
    'submit form': function(event) {
        event.preventDefault();
        var antwort = $('#antwort').val();
        
        PostDiscussions.update({
            _id: this._id
        }, {
            $set: {
                answer: antwort,
                published: true
            }
        });
    }
});