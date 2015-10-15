Template.conversations.helpers({
    'konversationen': function() {
        var conversations = Conversations.find({}, { sort: {createdAt: -1} }).fetch();
        conversations.forEach(function(conversation){
            // figure out which name to show (other person than currently logged in person)
            var person1 = Users.findOne(conversation.creator);
            var person2 = Users.findOne(conversation.partner);
            var post = Posts.findOne(conversation.postID);

            if(Meteor.user()._id == person1._id){
                conversation.other = person2; 
            } else{
                conversation.other = person1;
            }
            conversation.post = post;

            // attach badgeCount to counversation
            var badgeCount = 0;
            conversation.messages.forEach(function(message){
                if(!message.readAt && message.to == Meteor.user()._id){
                    badgeCount++;
                }
            })
            conversation.badgeCount = badgeCount;
            conversation.moreThanZero = badgeCount > 0;
        });
        return conversations;
    },
    'moreThanZero': function(){
        return Conversations.find({}).count() > 0;
    }
});

Template.conversation.helpers({
    'conversation': function(){
        var conversation = Conversations.findOne(Router.current().params._id);
        // figure out which name to show (other person than currently logged in person)
        var person1 = Users.findOne(conversation.creator);
        var person2 = Users.findOne(conversation.partner);
        var post = Posts.findOne(conversation.postID);

        if(Meteor.user()._id == person1._id){
            conversation.other = person2; 
        } else{
            conversation.other = person1;
        }
        conversation.post = post;

        conversation.messages.forEach(function(message){
            if(message.from == Meteor.user()._id){
                message.fromMe = true;
            } else {
                message.fromMe = false;
            }
            var length = message.message.length;
            message.margin = Math.min(60,100*Math.exp(-1*length/50));        // exponential model
            message.margin = Math.max(6, message.margin);                   // delimited by 10, 60
        });
        return conversation;
    }
});

Template.conversationListItem.events({
    'click .conversation': function(event, template){
        var conversationID = template.data._id;
        var messages = Conversations.findOne(conversationID).messages;
        messages.forEach(function(message){
            if(!message.readAt){
                message.readAt = new Date();
            }
        });
        $('html, body').animate({ 
           scrollTop: $(document).height()-$(window).height()}, 
           1400, 
           "swing"
        );
        Conversations.update({'_id': conversationID},{$set: {'messages': messages}})

    }
});

Template.conversation.events({
    'click #writeMessageButton': function(){
        var conversation = Conversations.findOne(Router.current().params._id);
        if(Meteor.user()._id == conversation.creator){
            var other = conversation.partner;
        } else {
            var other = conversation.creator;
        }
        var message = {
            from:       Meteor.user()._id,
            to:         other, 
            message:    $('#message').val(),
            createdAt:  new Date(),
            readAt:     null,
        }

        Conversations.update({'_id': conversation._id}, {$push: {messages: message}});
        $('#message').val('');
    }
});







