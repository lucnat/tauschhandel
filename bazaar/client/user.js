Template.user.helpers({
	'user': function(){
		return Users.findOne(Router.current().params._id);
	},
	'angebote': function(){
		return Posts.find({'userID': Router.current().params._id}).fetch();
	}
});
