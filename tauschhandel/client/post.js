Template.post.helpers({
    'post': function(){
        var post = Posts.findOne({_id: Router.current().params._id});
        if(post){
            post.dateString = new Date(post.createdAt).toDateString();
            post.userPicture = Users.findOne(post.userID).profile.picture;
        }
        return post;
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

    'isOnWatchList': function(){
        // checks if current post is on watchlist of currentUser
        var postId = Router.current().params._id;
        var watchList = Meteor.user().profile.watchlist;
        return $.inArray(postId, watchList) >= 0; 
    },

    'QAndAOpened': function(){
        var opened = Session.get('QAndAOpened') == true;
        return opened;
    },

    'esHatInteressenten': function(){
        var post = Posts.findOne({_id: Router.current().params._id});
        return post.interessenten.length > 0;
    }
});

Template.post.events({
    'click #like': function(){

        toggleOnWatchList();

        function toggleOnWatchList(){
            // toggles this post on the watchlist of currentUser
            var postId = Router.current().params._id;
            var watchList = Meteor.user().profile.watchlist;

            if($.inArray(postId, watchList) >= 0){
                // means is already there, let's remove it
                Users.update({_id: Meteor.user()._id}, { $pull: { 'profile.watchlist': postId } });

            } else {
                // means doesn't exist yet, let's push to array
                Users.update({_id: Meteor.user()._id}, { $push: { 'profile.watchlist': postId} });
            }
        }
    },

    'click #interesseMelden': function() {
        IonPopup.confirm({
            title: 'Interesse bestätigen',
            template: '  Lorem ipsum dolor sit  deserunt mollit anim id est laborum.  ?',
            onOk: function() {
                toggleInteressenten();
            },
            onCancel: function() {
            }
        });
        function toggleInteressenten(){
            //toggles currentUser's Id in the interessenten array of this post. 
            // Also, generates notification
           
            var post = Posts.findOne({ '_id': Router.current().params._id });
            var interessenten = Posts.findOne({ _id: post._id }).interessenten; 

            if($.inArray(Meteor.userId(), interessenten) >= 0){
                // means is already there, let's remove it
                Posts.update({_id: post._id}, { $pull: {interessenten: Meteor.userId()} })

            } else {
                // means doesn't exist yet, let's push to array
                Posts.update({_id: post._id}, { $push: {interessenten: Meteor.userId()} })
                var notification = {
                    type:       'interesseGemeldet',
                    icon:       'ion-heart',
                    triggerer:  Meteor.user()._id,
                    receiver:   post.userID,
                    message:    Meteor.user().username + ' hat Interesse gemeldet an deinem Post ',
                    postTitle:  post.title, 
                    link:       '/post/'+post._id,
                    createdAt:  new Date(),
                    readAt:     null,
                };
                Notifications.insert(notification);
            }
        }
    },

    'click #QAndAButton': function(){
        var opened = Session.get('QAndAOpened') == true;
        Session.set('QAndAOpened', !opened);
    }
});

Template.discussion.helpers({

    'discussions': function(){
        var discussions = PostDiscussions.find({postID: Router.current().params._id}).fetch();
        discussions.forEach(function(e){
            e.questionerName = Users.findOne(e.questioner).username;
            e.dateString = new Date(e.changedAt).toDateString();
        });
        return discussions;
    },

    'previewMode': function(){
        return Session.get('previewMode');
    },

    'isMyPost': function(){
        return isMyPost();
    }
});

Template.createPostQuestion.events({
    'click #newQuestionButton': function (event) {
        event.preventDefault();
        var newDiscussionPair = {
            postID:     Router.current().params._id,
            question:   $('#newQuestion').val(),
            answer:     '',
            questioner: Meteor.user()._id,
            published:  true,
            changedAt:  new Date(),
        }
        PostDiscussions.insert(newDiscussionPair);

        $('#newQuestion').val('');

        var post = Posts.findOne({_id: Router.current().params._id});
        var notification = {
            type:       'frageGestellt',
            icon:       'ion-help',
            triggerer:  Meteor.user()._id,
            receiver:   post.userID,
            message:    'neue Frage wurde gestellt zu deinem Post',
            link:       '/post/'+post._id,
            postTitle:  post.title,
            createdAt:  new Date(),
            readAt:     null,
        };

        Notifications.insert(notification);

    }
});

Template.discussionPair.helpers({
    'isMyPost': function(){
        return isMyPost();
    }
});

Template.discussionPair.events({
    'click #antwortVerfassenButton': function(event){
        event.preventDefault();
        $(event.target).prev().prev().css('display','block');
        $(event.target).next().css('display','inline');
        $(event.target).next().next().css('display','inline');
        $(event.target).css('display','none');
    },

    'click #frageBeantwortenButton': function(event){
        event.preventDefault();
        antwort =  $(event.target).prev().prev().prev().children(":first");
        if(antwort.val().length >= 3){
            PostDiscussions.update({
                _id: this._id
            }, {
                $set: {
                    answer: antwort.val(),
                    published: true
                }
            });

            antwort.val('');
            
            var post = Posts.findOne({ '_id': Router.current().params._id });

            var notification = {
                type:       'frageBeantworted',
                icon:       'ion-information',
                triggerer:  Meteor.user()._id,
                receiver:   this.questioner,
                message:    'Eine deiner Fragen wurden beantworted im Post ',
                link:       '/post/'+post._id,
                postTitle:  post.title,
                createdAt:  new Date(),
                readAt:     null,
            };

            Notifications.insert(notification);

            $(event.target).prev().prev().prev().css('display','none');
            $(event.target).prev().css('display','none');
            $(event.target).css('display','none');
            $(event.target).next().css('display','none');

        }
    },

    'click #cancel': function(event){
        event.preventDefault();
        $(event.target).prev().prev().prev().prev().css('display','none');
        $(event.target).prev().prev().css('display','inline');
        $(event.target).prev().css('display','none');
        $(event.target).css('display', 'none');
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
        IonPopup.confirm({
            title: 'Interesse bestätigen',
            template: '  Lorem ipsum dolor sit  deserunt mollit anim id est laborum.  ?',
            onOk: function() {
                giveAway();
                startConversation();
            },
            onCancel: function() {
            }
        });

        function giveAway(){
            var post = Posts.findOne({_id: Router.current().params._id});
            var receiver = Users.findOne({'_id' : $('select').val() });
            var postId = Router.current().params._id;
            Posts.update({'_id': postId}, {$set: {'vergebenAn': receiver._id}});
            Posts.update({'_id': postId}, {$set: {'vergebenAnName': receiver.username}});

            var message = 'Der Gegenstand ' + '<a href="/post/' + post._id + '">'+ post.title +'</a> wurde an dich vergeben.';


            var notification = {
                type:       'itemGewonnen',
                icon:       'ion-happy',
                triggerer:  post.userID,
                receiver:   receiver._id,
                message:    message,
                link:       '/conversations',           // link zum chat
                postTitle:  'mit '+ post.userName + ' schreiben',     // 
                createdAt:  new Date(),
                readAt:     null,
            };

            Notifications.insert(notification);

            var nichtBekommen = post.interessenten;
            nichtBekommen.forEach(function(id){

                if(id !== receiver._id){
                    var notification = {
                        type:       'itemVerloren',
                        icon:       'ion-sad',
                        triggerer:  post.userID,
                        receiver:   id,
                        message:    'Folgender Gegenstand ist nicht mehr erhältlich: ',
                        link:       '/post/' + post._id,           
                        postTitle:  post.title,     // 
                        createdAt:  new Date(),
                        readAt:     null,
                    };
                    console.log(notification);
                    Notifications.insert(notification);
                }
            });
        }

        startConversation = function(){
            var post = Posts.findOne({_id: Router.current().params._id});
            var creator = Users.findOne(post.userID);
            var partner = Users.findOne(post.vergebenAn);
            var conversation = {
                'creator':  creator._id,
                'partner':  partner._id,
                'postID':     post._id,
                messages: [ {
                    from:       creator._id,
                    to:         partner._id, 
                    message:    post.title + " wurde soeben von " + creator.username + " an " + partner.username + " vergeben. Hier kann die Übergabe besprochen werden. ",
                    createdAt:  new Date(),
                    readAt:     null
                    }
                ],
            }
            console.log(conversation);
            Conversations.insert(conversation);
        }
    },

    'click #revert': function(){
        var postId = Router.current().params._id;
        var post = Posts.findOne({_id: Router.current().params._id});

        var userDemEntzogenWird = Users.findOne(post.vergebenAn);

        Posts.update({'_id': postId}, {$set: {'vergebenAn': ''}});
        Posts.update({'_id': postId}, {$set: {'vergebenAnName': ''}});
        /*
        var notification = {
            type:       'itemGewonnen',
            icon:       'ion-android-cancel',
            triggerer:  post.userID,
            receiver:   userDemEntzogenWird._id,
            message:    'Folgender Gegenstand wurde dir entzogen: ',
            link:       '/post/'+post._id,
            postTitle:  post.title,
            createdAt:  new Date(),
            readAt:     null,
        };

        Notifications.insert(notification);
        */
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