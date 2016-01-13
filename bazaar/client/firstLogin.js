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
            Users.update({'_id': Meteor.user()._id },{$set: {'profile.postleitzahl': $('#postleitzahl').val()}});
            Meteor.call('getLnglatFromPLZ', $('#postleitzahl').val(), function(err,result){
                console.log('--------------');
                console.log(result);
                if(err){
                    console.log(err);
                } else {
                    Users.update(Meteor.user()._id,{$set: {'profile.coordinates': result }});
                }
            });
            Users.update({'_id': Meteor.user()._id },{$set: {'profile.firstLogin': false}});
            Users.update({'_id': Meteor.user()._id },{$set: {'profile.radius': 25}});
            Meteor.call('getOrt', $('#postleitzahl').val()/1, function(error, result){
                if(error) console.log(error)
                else {
                    Users.update({'_id': Meteor.user()._id },{$set: {'profile.ORT': result}});
                }
            });
            
            IonBackdrop.retain();
            Router.go('/');
            IonBackdrop.release();
            lucPopup('Glückwunsch! Dein Profil ist vollständig. Viel Spass mit Basaar!');
        }
        else{
            alert('Postleitzahl muss vierstellig sein.');
        }
    }
});

