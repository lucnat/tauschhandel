Template.post.helpers({
    'discussions': function() {
        return PostDiscussions.find({
            postID: this._id,
            published: true
        }).fetch();
    },

    'loggedIn': function(){
        return !!Meteor.user();
    },

    'hasInterest': function(arg){
        try{
            if($.inArray(Meteor.user()._id, this.interessenten) >= 0) 
                return true;
        } catch(e) {}
        return false;
    },

    'isMyPost': function(){
        return isMyPost(this._id);
    }
});

Template.post.events({
    'submit form': function(event) {
        event.preventDefault();
        var newDiscussionPair = {
            postID:     this._id,
            question:   $('#text').val(),
            answer:     '',
            questioner: Meteor.user()._id,
            published:  true,
            changedAt:  new Date(),
        }
        PostDiscussions.insert(newDiscussionPair);
        
        var notification = {
            triggerer:  Meteor.user()._id,
            receiver:   this.userID,
            message:    'eine Frage wurde gestellt zu einem deiner Posts',
            link:       '/p/'+this._id,
            createdAt:  new Date(),
            readAt:     null,
        };
        Notifications.insert(notification);

        $('#text').val('');
    },
    'click #interesseMelden': function() {
        console.log(this);
        var notification = {
            triggerer:  Meteor.user()._id,
            receiver:   this.userID,
            message:    'Es wurde Interesse an einem deiner Posts gemolden von ' + Meteor.user().username,
            link:       '/p/'+this._id,
            createdAt:  new Date(),
            readAt:     null,
        };
        Posts.update({_id: this._id}, { $push: {interessenten: Meteor.user()._id} })
        Notifications.insert(notification);
        alert('Du hast Interesse gemeldet.');
    }
});

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

Template.interessent.events({
    'click button': function(){
        // vergibt post an user, auf den geklickt wurde

        var post = Template.parentData(1);
        var notification = {
            triggerer:  Meteor.user()._id,
            receiver:   this.valueOf(),
            message:    'So-und-so wurde an dich vergeben!! Congrats!',
            link:       '/p/'+post._id,
            createdAt:  new Date(),
            readAt:     null,
        };

        Notifications.insert(notification);

        Posts.update({_id: post._id}, { $set: {vergebenAn: this.valueOf() }});
    }
})

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

        console.log(this);
        var notification = {
            triggerer:  Meteor.user()._id,
            receiver:   this.questioner,
            message:    'Eine deiner Fragen wurden beantworted.',
            link:       '/p/'+this.postID,
            createdAt:  new Date(),
            readAt:     null,
        };

        Notifications.insert(notification);

        $('#antwort').val('');
    }
});

function isMyPost(postID){
    var post = Posts.findOne({_id: postID});
    try{
        if(post.userID === Meteor.user()._id)
            return true;
    } catch(e) {}
    return false;
}