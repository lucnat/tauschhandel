Template.post.helpers({
    'post': function(){
        var post = Posts.findOne({_id: Router.current().params._id});
        if(post){
            post.dateString = new Date(post.createdAt).toDateString();
            post.userPicture = Users.findOne(post.userID).profile.picture;
            post.istVergeben = post.vergebenAn.length > 0;
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
                Users.update({_id: Meteor.user()._id}, { $pull: {'profile.watchlist': postId} });
                $('#like').css('color','');
            } else {
                // means doesn't exist yet, let's push to array
                Users.update({_id: Meteor.user()._id}, { $push: {'profile.watchlist': postId} });
                $('#like').css('color','#D6665A');
            }
        }
    },

    'click #interesseMelden': function() {
        IonPopup.confirm({
            title: 'Interesse bestätigen',
            template: '  Willst du wirklich Interesse an diesem Gegenstand melden?',
            onOk: function() {
                // ins array der interessenten, und notification auslösen. 
                var post = Posts.findOne({ '_id': Router.current().params._id });
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
                Meteor.call('pushFromNotification', notification);
                if(Meteor.isCordova){
                    if(AdMob) AdMob.showInterstitial();
                }

                // and remove from watchlist (starred) because it is listed in interested posts
                Users.update({_id: Meteor.user()._id}, { $pull: { 'profile.watchlist': post._id }});
            },
            onCancel: function() {
            }
        });
    },
    'click #interesseZurueckziehen': function(){
        IonPopup.confirm({
            title: 'Interesse zurückziehen',
            template: 'Bist du sicher, dass du dein Interesse an diesem Gegenstand zurückziehen möchtest?',
            onOk: function() {
                // Aus dem array der interessenten  
                var post = Posts.findOne({ '_id': Router.current().params._id });
                var interessenten = Posts.findOne({ _id: post._id }).interessenten; 
                Posts.update({_id: post._id}, { $pull: {interessenten: Meteor.userId()} });
            },
            onCancel: function() {
            }
        });
    },
    'click #editButton': function(){
        IonActionSheet.show({
            titleText: 'Bearbeiten',
            buttons: [
                { text: '<i class="icon ion-edit"></i> Ändern' },
            ],
            destructiveText: 'Löschen',
            cancelText: 'Cancel',
            cancel: function() {
            },
            buttonClicked: function(index) {
                if (index === 0) {
                    IonModal.open('editPost');
                    onEditPost();
                    function onEditPost(){
                        var post = Posts.findOne(Router.current().params._id);
                        Meteor.setTimeout(function(){
                            $('#titel').val(post.title);
                            $('#text').val(post.text);
                            Session.set('imageIDs', post.imageIDs);
                            var checkboxes = $('.tag');
                            for(var i=0; i<checkboxes.length; i++){
                                if($.inArray(checkboxes[i].id, post.tags) >= 0){
                                    checkboxes[i].checked = true;
                                }
                            }
                        },200);
                    }
                }
                return true;
            },
            destructiveButtonClicked: function() {

                IonPopup.confirm({
                    title: 'Löschen',
                    template: 'Bist du sicher, dass du den Beitrag entfernen möchtest?',
                    onOk: function() {
                        Posts.remove(Router.current().params._id);
                        Router.go('/');
                        Meteor.setTimeout(function(){
                            IonPopup.alert({
                                title: 'Gelöscht',
                                template: 'Beitrag wurde erfolgreich gelöscht.',
                                okText: 'Ok',
                            });
                        }, 500)
                    },
                    onCancel: function() {
                    }
                });
                return true;
            }

        });
    },

    'click #QAndAButton': function(){
        var opened = Session.get('QAndAOpened') == true;
        Session.set('QAndAOpened', !opened);
    },

    'click #shareButton': function(event){
        event.preventDefault();
        IonActionSheet.show({
            titleText: 'Share',
            buttons: [
                { text: '<i class="icon ion-email"></i> Email' },
                { text: '<i class="icon ion-social-facebook"></i> Facebook' },
                { text: '<i class="icon ion-social-whatsapp"></i> Whatsapp' },                
                { text: '<i class="icon ion-link"></i> Copy Link' },                
            ],
            cancelText: 'Cancel',
            cancel: function() {
            },
            destructiveText: 'Spam melden',
            buttonClicked: function(index) {
                var post = Posts.findOne(Router.current().params._id);
                var link = rootURL + "post/" + post._id;
                if (index === 0) {  // mail
                    var subject =  post.title + " auf Bazaar";
                    var body = "Schau dir " + post.title + " auf Bazaar an: \n\n" + link;
                    var mailto = "mailto:?subject="+subject+"&body="+body;
                    window.location.href = mailto;
                }
                if (index === 1) {  // facebook
                    alert('In dieser Version noch nicht verfügbar.');
                }
                if(index === 2){
                    var text = "Schau dir " + post.title + " auf Bazaar an: " + link;
                    window.location.href = "whatsapp://send?text=" + text;
                }
                if(index === 3){
                    window.prompt("Copy the following link: ", rootURL + 'post/' + post._id);                
                }
                return true;
            },
            'destructiveButtonClicked': function(){
                var post = Posts.findOne(Router.current().params._id);
                IonPopup.confirm({
                    title: 'Spam melden',
                    template: 'Möchtest du das Item wirklich als Spam melden?',
                    onOk: function() {
                        Meteor.call('reportSpam', post._id, Meteor.user()._id);
                        alert('wurde gemeldet');
                        IonActionSheet.close();
                    },
                    onCancel: function() {
                    }
                });
            }
        });

    }
});

Template.post.rendered = function(){
    $('.bild').on('load', function(e){
        element = e.target;
        $(element).fadeIn('slow');
    });
};

Template.discussion.helpers({

    'discussions': function(){
        var discussions = PostDiscussions.find({postID: Router.current().params._id}).fetch();
        discussions.forEach(function(e){
            e.questionerName = Users.findOne(e.questioner).username;
            e.dateString = new Date(e.changedAt).toDateString();
        });
        return discussions;
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
            message:    'Neue Frage wurde gestellt zu deinem Post',
            link:       '/post/'+post._id,
            postTitle:  post.title,
            createdAt:  new Date(),
            readAt:     null,
        };

        Notifications.insert(notification);
        Meteor.call('pushFromNotification', notification);
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
            Meteor.call('pushFromNotification', notification);

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
            interessenten.push(Users.findOne(id));
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
    'click .giveAway': function(event){
        var id = event.target.id;
        var username = Users.findOne(id).username;
        IonPopup.confirm({
            title: 'Wirklich vergeben?',
            template: 'Möchtest du das Item wirklich an '+ username +' vergeben?',
            onOk: function() {
                giveAway(id);
                startConversation();
            },
            onCancel: function() {
            }
        });

        function giveAway(id){
            var post = Posts.findOne({_id: Router.current().params._id});
            var receiver = Users.findOne({'_id' : id});
            var postId = Router.current().params._id;

            Posts.update({'_id': postId}, {$set: {
                'vergebenAn': receiver._id,
                'vergebenAnName': receiver.username,
                'interessenten': []
            }});

            // interessenten removed done, now remove from starred
            post.interessenten.forEach(function(interessent){
                Users.update({_id: interessent}, { $pull: {'profile.watchlist': postId} });
            });

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

            var message = 'Glückwunsch! Der Gegenstand ' + post.title +' wurde an dich vergeben.';
            Meteor.call('pushFromItemGewonnen', receiver._id, message);



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
                    Notifications.insert(notification);
                    Meteor.call('pushFromNotification', notification);
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
                'changedAt': new Date(), 
                messages: [ {
                    from:       creator._id,
                    to:         partner._id, 
                    message:    post.title + " wurde soeben von " + creator.username + " an " + partner.username + " vergeben. Hier kann die Übergabe besprochen werden. ",
                    createdAt:  new Date(),
                    readAt:     null
                    }
                ],
            }
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
        Meteor.call('pushFromNotification', notification);

        */
    }
});

Template.editPost.helpers({
    'possibleTags': function() {
        return Tags.find({}).fetch();
    },
    'imageIDs': function(){
        var post = Posts.findOne(Router.current().params._id);
        return Session.get('imageIDs');
    }
});

Template.editPost.events({
    'click #speichern': function(){
        checkboxes = document.getElementsByClassName('tag');
        tags = [];
        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                tags.push(checkboxes[i].id);
            }
        }
        var post = {
            title:          $('#titel').val(),
            text:           $('#text').val(),
            postleitzahl:   Meteor.user().profile.postleitzahl,
            istAngebot:     true,
            imageIDs:       Session.get('imageIDs'),
            tags:           tags,
            userID:         Meteor.user()._id,
            userName:       Meteor.user().username,
            createdAt:      new Date(),
            viewCount:      0,
            discussion:     [],
            interessenten:  [],
            vergebenAn:     '',
            vergebenAnName: ''
        }
        Posts.update({'_id': Router.current().params._id}, post);
        alert('gespeichert');
        Session.set('imageIDs', []);
        IonModal.close();
    },
    'click #imageUpload': function(){
        event.preventDefault();
        getImgurPicture(function(id){
            var image = $('#image');
            var ids = Session.get('imageIDs');
            ids.push(id);
            Session.set('imageIDs', ids);
        });
    }
});

Template.editPost.destroyed = function(){
    Session.set('imageIDs', []); 
}

function isMyPost(){
    var post = Posts.findOne({_id: Router.current().params._id});
    try{
        if(post.userID === Meteor.user()._id)
            return true;
    } catch(e) {}
    return false;
}