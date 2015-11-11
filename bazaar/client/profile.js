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
                Meteor.logout(function(){
                    Router.go('/');
                });
            },
            onCancel: function() {

            }
        });
    }
});

changeProfilePicture = function(){
    // takes photo and saves it in user profile. Handles backdrop as well. 
    getImgurPicture(function(id){
        var link = "http://i.imgur.com/" + id + "b.jpg";
        Users.update({_id: Meteor.user()._id}, { $set: { 'profile.picture': link} });
    });
};

Template.profile.rendered = function(){
    Session.set('hideTabs', true);
};
Template.profile.destroyed = function(){
    Session.set('hideTabs', false);
};

Template.login.rendered = function(){
    var iOS = /iPad|iPhone|iPod/.test(navigator.platform);
    var browser = !Meteor.isCordova;
    var isAndroid = !(iOS || browser);
    if(isAndroid){
        Meteor.setInterval(function(){
            $('.at-oauth').remove();
            $('.at-sep').remove();
        }, 100);
    }
    Session.set('hideTabs', true);
}

Template.login.destroyed = function(){
    Session.set('hideTabs', false);
};
