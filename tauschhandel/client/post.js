Template.discussion.helpers({

    'discussions': function(){
        return PostDiscussions.find({postID: this._id}).fetch();
    },

    'loggedIn': function(){
        return !!Meteor.user();
    },

    'previewMode': function(){
        return Session.get('previewMode');
    },

    'isMyPost': function(){
        return isMyPost(this._id);
    }

});

Template.discussionPair.helpers({
    'isMyPost': function(){
        return isMyPost(this.postID);
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

function isMyPost(postID){
    var post = Posts.findOne({_id: postID});
    if(post.userID === Meteor.user()._id)
        return true
    else
        return false;
}