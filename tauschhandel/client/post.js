Template.post.helpers({
    'post': function(){
        return Posts.findOne({_id: Router.current().params._id});
    },

    'discussions': function() {
        return PostDiscussions.find({
            postID: Posts.findOne({_id: Router.current().params._id}),
            published: true
        }).fetch();
    },

    'loggedIn': function(){
        return !!Meteor.user();
    },

    'hasInterest': function(arg){
        try{
            var interessenten = Posts.findOne({ _id: Router.current().params._id }).interessenten;
            if($.inArray(Meteor.user()._id, interessenten) >= 0) 
                return true;
        } catch(e) {}
        return false;
    },

    'isMyPost': function(){
        return isMyPost();
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
    'click #like': function(event, template) {
        var post = Posts.findOne({ '_id': Router.current().params._id });
        var notification = {
            triggerer:  Meteor.user()._id,
            receiver:   post.userID,
            message:    'Es wurde Interesse an einem deiner Posts gemolden von ' + Meteor.user().username,
            link:       '/post/'+post._id,
            createdAt:  new Date(),
            readAt:     null,
        };
        
        // toggle interessenten:
        var interessenten = Posts.findOne({ _id: post._id }).interessenten;
        if($.inArray(Meteor.userId(), interessenten) >= 0){
            // means is already there, let's remove it
            Posts.update({_id: post._id}, { $pull: {interessenten: Meteor.userId()} })
        } else {
            // means doesn't exist yet, let's push to array
            Posts.update({_id: post._id}, { $push: {interessenten: Meteor.userId()} })
        }
        

        Notifications.insert(notification);

        //alert('Du hast interesse gemolden');
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
        return isMyPost();
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
        return isMyPost();
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

function isMyPost(){
    var post = Posts.findOne({_id: Router.current().params._id});
    try{
        if(post.userID === Meteor.user()._id)
            return true;
    } catch(e) {}
    return false;
}