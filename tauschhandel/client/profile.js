Template.konversationen.helpers({
    'konversationen': function() {
        try{
            var me = Meteor.user()._id;
            var myOutbox = Messages.find({
                absender: me
            }).fetch();
            var myInbox = Messages.find({
                empfaenger: me
            }).fetch();
            
            var myMessages = myInbox.concat(myOutbox);
            console.log(myMessages);
            return null;
        } catch(e){ }
        return null;
    }
});

