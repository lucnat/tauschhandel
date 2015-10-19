Template.profile.helpers({
	'profile': function(){
		return Meteor.user().profile;
	}
});

Template.profile.events({
    'click #changeUsername': function(){
        IonPopup.prompt({
            title: 'Username ändern',
            template: 'Bitte einen neuen Username eingeben',
            okText: 'Ok',
            inputType: 'text',
            inputPlaceholder: 'Username',
            onOk: function(event) {
                var newUsername = $('input').val();
                if(newUsername.length < 3) {
                    alert('Eingabe zu kurz. Konnte nicht gespeichert werden.');
                } else {
                    Meteor.call('changeUsername', Meteor.userId(), newUsername, function(error){
                        if(error){
                            //handle error
                        } else {
                            alert('gespeichert');
                        }
                    });
                }
            },
            onCancel: function() {
                // console.log('Cancelled');
            }
        });
    },
    'click #changePostleitzahl': function(){
        IonPopup.prompt({
            title: 'Postleitzahl ändern',
            template: 'Neue Postleitzahl eingeben. ',
            okText: 'Ok',
            inputType: 'number',
            inputPlaceholder: 'Postleitzahl',
            onOk: function(event) {
                var newPLZ = $('input').val();
                if(newPLZ.length != 4) {
                    alert('Postleitzahl muss 4 zeichen lang sein. Konnte nicht speichern.');
                } else {
                    var profile = Meteor.user().profile;
                    profile.postleitzahl = newPLZ;
                    Users.update({'_id': Meteor.userId()},{$set: {'profile': profile}});
                    alert('Gespeichert');
                }
            },
        });
    },
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