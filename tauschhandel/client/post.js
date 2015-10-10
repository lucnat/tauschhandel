Template.post.helpers({
    'post': function(){
        var post = Posts.findOne({_id: Router.current().params._id});
        if(post)
            post.dateString = new Date(post.createdAt).toDateString();
        return post;
    },

    'discussions': function() {
        return PostDiscussions.find({
            post: Posts.findOne({_id: Router.current().params._id}),
            published: true
        }).fetch();
    },

    'hasInterest': function(){
        try{
            var interessenten = Posts.findOne({ _id: Router.current().params._id }).interessenten;
            if($.inArray(Meteor.user()._id, interessenten) >= 0) 
                return true;
        } catch(e) {}
        return false;
    },

    'isMyPost': function(){
        return isMyPost();
    },

    'esHatInteressenten': function(){
        var post = Posts.findOne({_id: Router.current().params._id});
        return post.interessenten.length > 0;
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
        var postLink = '<a href="/posts/' + post._id + '>" Posts ';
        
        // toggle interessenten:
        var interessenten = Posts.findOne({ _id: post._id }).interessenten;
        if($.inArray(Meteor.userId(), interessenten) >= 0){
            // means is already there, let's remove it
            Posts.update({_id: post._id}, { $pull: {interessenten: Meteor.userId()} })
            var notification = {
                triggerer:  Meteor.user()._id,
                receiver:   post.userID,
                message:    Meteor.user().username + ' hat keine Interesse mehr an deinem Post ',
                postTitle:  post.title, 
                link:       '/post/'+post._id,
                createdAt:  new Date(),
                readAt:     null,
            };

        } else {
            // means doesn't exist yet, let's push to array
            Posts.update({_id: post._id}, { $push: {interessenten: Meteor.userId()} })
            var notification = {
                triggerer:  Meteor.user()._id,
                receiver:   post.userID,
                message:    Meteor.user().username + ' hat Interesse gemeldet an deinem Post ',
                postTitle:  post.title, 
                link:       '/post/'+post._id,
                createdAt:  new Date(),
                readAt:     null,
            };
        }
        

        Notifications.insert(notification);

        //alert('Du hast interesse gemolden');
    }
});

Template.discussion.helpers({

    'discussions': function(){
        return PostDiscussions.find({postID: this._id}).fetch();
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

Template.giveAway.helpers({
    'interessenten': function(){
        var ids = Posts.findOne({_id: Router.current().params._id}).interessenten;
        var interessenten = [];
        ids.forEach(function (id) {
            interessenten.push({
                '_id': id,
                username: Users.findOne({'_id': id}).username,
            });
        });
        return interessenten;
    },

    'post': function(){
        var post = Posts.findOne({_id: Router.current().params._id});
        if(post)
            post.dateString = new Date(post.createdAt).toDateString();
        return post;
    },

});

Template.giveAway.events({
    'click #giveAway': function(event){
        var receiver = Users.findOne({'_id' : $('select').val() });
        var postId = Router.current().params._id;
        Posts.update({'_id': postId}, {$set: {'vergebenAn': receiver._id}});
        Posts.update({'_id': postId}, {$set: {'vergebenAnName': receiver.username}});
        alert('vergeben an ' + receiver.username);
    },

    'click #revert': function(){
        var postId = Router.current().params._id;
        Posts.update({'_id': postId}, {$set: {'vergebenAn': ''}});
        Posts.update({'_id': postId}, {$set: {'vergebenAnName': ''}});
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