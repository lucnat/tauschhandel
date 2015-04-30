Template.myposts.rendered = function(){
	Session.set('previewMode', false);
}

Template.myposts.helpers({
    'myPosts': function() {
        try {
            return Posts.find({
                userID: Meteor.user()._id
            }).fetch();
        } catch (e) {}
    }
    
});
