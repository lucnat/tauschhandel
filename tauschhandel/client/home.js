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
                bild: $('#bild').val(),
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
        }
    }
});
