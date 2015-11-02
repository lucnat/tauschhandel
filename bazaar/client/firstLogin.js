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
            Meteor.call('getOrt', $('#postleitzahl').val(), function(error, result){
                if(error) console.log(error)
                else {
                    Users.update({'_id': Meteor.user()._id },{$set: {'profile.ORT': result}});
                }
            });
            
            IonBackdrop.retain();
            Meteor.call('getUmgebung', $('#postleitzahl').val(), function(error, result){
                if(error){
                    console.log(error);
                    alert('Error: check your connection');
                    IonBackdrop.release();
                } else {
                    var umgebung = result;
                    umgebung.sort(function(a,b){
                        return a.distance-b.distance;
                    })
                    umgebung.forEach(function(gemeinde){
                        gemeinde.selected = false;
                    });
                    IonBackdrop.release();
                    Users.update({'_id': Meteor.userId()},{$set: {'profile.umgebung': umgebung}});
                    Router.go('/firstLogin3');
                }
            });
        }
        else{
            alert('Postleitzahl muss vierstellig sein.');
        }
    }
});

Template.firstLogin3.events({
    'click #weiter3': function(){
        var checkboxes = document.getElementsByClassName('tag');
        var umgebung = Meteor.user().profile.umgebung;

        IonBackdrop.retain();
        for (var i = 0; i < checkboxes.length; i++) {
            for(var j=0; j < umgebung.length; j++){
                if(checkboxes[i].id == umgebung[j].plz){
                    umgebung[j].selected = checkboxes[i].checked;
                }
            }
        }
        Meteor.setTimeout(function(){
            Router.go('/');
            IonBackdrop.release();
            Users.update({'_id': Meteor.userId()},{$set: {'profile.umgebung': umgebung}});
            lucPopup('Glückwunsch! Dein Profil ist vollständig. Viel Spass mit DorfBazaar!');
        }, 500);
    },
    'click #alle': function(){
        var checkboxes = document.getElementsByClassName('tag');
        var umgebung = Meteor.user().profile.umgebung;
        for(var i=0; i<checkboxes.length; i++){
            checkboxes[i].checked = true;
        }
        $('#weiter3').click();
    }
});

Template.umgebung.helpers({
    'umgebung': function(){
        return Meteor.user().profile.umgebung;
    }
});