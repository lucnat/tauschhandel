Template.konversationen.helpers({
    'konversationen': function() {
        var me = Meteor.user()._id;
        var myOutbox = Messages.find({
            absender: me
        }).fetch();
        var myInbox = Messages.find({
            empfaenger: me
        }).fetch();
        
        var myMessages = myInbox.concat(myOutbox);
        console.log(myMessages);
        return null
    }
});

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