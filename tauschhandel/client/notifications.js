Template.notifications.helpers({
    'notifications': function(){
        return Notifications.find({}, { sort: {createdAt: -1} }).fetch();
    }
});

Template.notification.events({
    'click button': function(event){
        event.preventDefault();
        Notifications.update({_id: this._id}, {$set: {readAt: new Date() }});
    }
});