Template.notifications.helpers({
    'notifications': function(){
        return Notifications.find().fetch();
    }
});

Template.notification.events({
    'click button': function(event){
        event.preventDefault();
        console.log(this);
        Notifications.update({_id: this._id}, {$set: {readAt: new Date() }});
    }
});