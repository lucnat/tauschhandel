Template.stats.helpers({
	'stats': function(){
		var stats = Session.get('stats');
		if(!stats){
			stats = {
				'users': 'loading...',
				'posts': 'loading...',
			}	
		}
		return Session.get('stats');
	}
});

Template.stats.rendered = function(){

	Session.set('hideTabs', true);

	Meteor.call('getStats', function(error, result){
		if(error){
			console.log(error)
		} else {
			Session.set('stats', result);
		}
	});
};

Template.stats.destroyed = function(){
	Session.set('hideTabs', false);
}