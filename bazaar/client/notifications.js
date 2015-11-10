Template.notifications.helpers({
    'notifications': function(){
        return Notifications.find({}, { sort: {createdAt: -1} }).fetch();
    }
});

Template.notifications.rendered = function(){
    $('.tab-item').get(2).click();
	var unread = Notifications.find({readAt: null}).fetch();
	unread.forEach(function(e){
		Notifications.update({'_id': e._id},{$set: {readAt: new Date()}});
	});
};

Template.notification.events({
    'click button': function(event){
        event.preventDefault();
        Notifications.update({_id: this._id}, {$set: {readAt: new Date() }});
    }
});