Template.profile.helpers({
	'profile': function(){
		return Meteor.user().profile;
	}
});

Template.profile.events({
	'click #changeProfilePicture': function(event){
		event.preventDefault();
        changeProfilePicture();
	},
    'click #logout': function(event){
        IonPopup.confirm({
            title: 'Abmelden',
            template: 'Bist du sicher, dass du dich abmelden möchtest?',
            onOk: function() {
                Accounts.logout();
            },
            onCancel: function() {

            }
        });
    }
});


changeProfilePicture = function(){
    // takes photo and saves it in user profile. Handles backdrop as well. 
    MeteorCamera.getPicture(function(error, localData){
        options = {
            apiKey: '9c96a9ec19cc485',
            image: localData,
        }
        Imgur.upload(options, function(error, remoteData){
            IonBackdrop.retain();
            if(error){
                alert(error);
                IonBackdrop.release();

            }
            var link = "http://i.imgur.com/" + remoteData.id + "b.jpg";
            Users.update({_id: Meteor.user()._id}, { $set: { 'profile.picture': link} });
            IonBackdrop.release();
        });

    });
}