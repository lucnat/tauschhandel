Template.firstLogin1.events({
    'click #changeProfilePicture': function(){
        changeProfilePicture();
    },
    'click #weiter1':  function(){
        Router.go('/firstLogin2');       
    }
});

Template.firstLogin2.events({
    'click #weiter2':  function(){
        if( 1000 <= $('#postleitzahl').val() && $('#postleitzahl').val() <= 10000){
            Users.update({'_id': Meteor.user()._id },{$set: {'profile.postleitzahl': $('#postleitzahl').val()}})
            Users.update({'_id': Meteor.user()._id },{$set: {'profile.firstLogin': false}});
            alert('Glückwunsch. Dein Profil ist vollständig. Möchtest du dir eine Einführung in diese App anschauen?')
            Router.go('/');
        }
        else{
            alert('Postleitzahl muss vierstellig sein.');
        }
    }
});

