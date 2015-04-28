Template.myposts.helpers({
    'myPosts': function() {
        try {
            return Posts.find({
                userID: Meteor.user()._id
            }).fetch();
        } catch (e) {}
    }
    
});
