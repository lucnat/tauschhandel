Template.stats.helpers({
	'stats': function(){
		var stats = Stats.findOne();
		var usersByZip = stats.usersByZip;
		var usersByZipArray = $.map(usersByZip, function(value, index) {
		    return [{'gemeinde': index, 'anzahl': value}];
		});
		usersByZipArray.sort(function(a,b){ return b.anzahl-a.anzahl });
		var postsByZip = stats.postsByZip;
		var postsByZipArray = $.map(postsByZip, function(value, index) {
		    return [{'gemeinde': index, 'anzahl': value}];
		});
		postsByZipArray.sort(function(a,b){ return b.anzahl-a.anzahl });

		stats.usersByZipArray = usersByZipArray.slice(0,10);
		stats.postsByZipArray = postsByZipArray.slice(0,10);
		return stats;
	}
});

Template.stats.rendered = function(){
	Session.set('hideTabs', true);
	Meteor.call('updateStats');
	console.log('stats updated');
};

Template.stats.destroyed = function(){
	Session.set('hideTabs', false);
}