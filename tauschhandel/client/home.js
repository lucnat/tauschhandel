Session.set('imageIDs', []);

Template.home.rendered = function(){
    Session.set('previewMode', true);
}

Template.previewList.helpers({
    'posts': function() {
        return Posts.find({}).fetch();
    },
});
Template.previewList.events({
    'click .post': function() {
        Router.go('/p/' + this._id);
    },
});
Template.createPost.helpers({
    'possibleTags': function() {
        return Tags.find({}).fetch();
    },

    'imageIDs': function(){
        return Session.get('imageIDs');
    }
});
Template.createPost.events({
    'click #submitButton': function() {
        if (isLoggedIn()) {
            checkboxes = document.getElementsByClassName('tag');
            tags = [];
            for (var i = 0; i < checkboxes.length; i++) {
                if (checkboxes[i].checked) {
                    tags.push(checkboxes[i].id);
                }
            }
            var newPost = {
                title: $('#titel').val(),
                text: $('#text').val(),
                istAngebot: $('#istAngebot')[0].checked,
                imageIDs: Session.get('imageIDs'),
                tags: tags,
                userID: Meteor.user()._id,
                userName: Meteor.user().username,
                createdAt: new Date(),
                viewCount: 0,
                discussion: [],
                interessenten: [],
                vergebenAn: null
            }
            Posts.insert(newPost);

            Session.set('imageIDs', []);
            IonModal.close();
        }
    },
    'click #imageUpload': function(event){
        event.preventDefault();
        MeteorCamera.getPicture(function(error, localData){

            options = {
                apiKey: '9c96a9ec19cc485',
                image: localData,
            }

            console.log(localData);

            Imgur.upload(options, function(error, remoteData){
                if(error){
                    alert(error);
                }
                var image = $('#image');
                var ids = Session.get('imageIDs');
                ids.push(remoteData.id);
                Session.set('imageIDs', ids);
            });

        });
    }

});
