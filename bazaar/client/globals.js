rootURL = 'http://basaar.ch/';

isLoggedIn = function() {
    if (!Meteor.user()) {
        // user is not logged in, so let's show login popup
        alert('You must login before performing this action.');
        return false;
    } else return true;
}

if (Meteor.isCordova) {
  document.addEventListener("deviceready", function() {
    StatusBar.overlaysWebView(true);
    StatusBar.styleLightContent();
  }, false);
}

Meteor.startup(function(){
	Session.set('filter', {'tags': ['alleTags']});
  Session.set('searchString', '');
  Session.set('collapsed', []);
  if(Meteor.isClient) {
    window.fbAsyncInit = function() {
      FB.init({
        appId      : '453508028170763',
        status     : true,
        version    : 'v2.5',
        xfbml      : true
      });
    };
  }
});

Meteor.startup(function () {
  if (Meteor.isCordova) {
    if (AdMob) {
        AdMob.prepareInterstitial( {adId:"ca-app-pub-8972085867877753/2943384742", autoShow:false} );
    } 
  } 
});

Meteor.startup(function(){
  var isStatsScreen = window.location.href.indexOf('stats') >= 0;
  if(!window.localStorage.getItem('hasStartedBefore') && !isStatsScreen){
    console.log('going to hello screen')
    Router.go('/hello');
  }
});

Template.registerHelper('isAndroid', function(){
    var iOS = /iPad|iPhone|iPod/.test(navigator.platform);
    var browser = !Meteor.isCordova;
    var isAndroid = !(iOS || browser);
    return isAndroid
});

Template.registerHelper('isIOS', function(){
    var iOS = /iPad|iPhone|iPod/.test(navigator.platform);
    var browser = !Meteor.isCordova;
    var isAndroid = !(iOS || browser);
    return iOS;
});

Template.registerHelper('isBrowser', function(){
    var iOS = /iPad|iPhone|iPod/.test(navigator.platform);
    var browser = !Meteor.isCordova;
    var isAndroid = !(iOS || browser);
    return browser && $(window).width() >= 1000;
});

Template.notFound.events({
  'click #home': function(){
    Router.go('/');
    location.reload();
  }
});

updateBadge = function(){
  try{
    var badgeCount = Notifications.find({'readAt': null}).count();
    var conversations = Conversations.find().fetch();
    conversations.forEach(function(conversation){
      conversation.messages.forEach(function(message){
        if(message.to == Meteor.user()._id && !message.readAt){
          badgeCount++;
        }
      });
    });
    var profile = Users.findOne(Meteor.userId()).profile;
    profile.badgeCount = badgeCount;
    Users.update({'_id': Meteor.userId()}, {$set: {'profile': profile}});
    Push.setBadge(badgeCount);
  } catch(e) {}
};

getImgurPicture = function(callback){
  // takes a picture, loads it to imgur, and calls callback with imgur id as argument
  IonActionSheet.show({
      titleText: 'Picture',
      buttons: [
          { text: '<i class="icon ion-camera"></i> From Camera' },
          { text: '<i class="icon ion-images"></i> From Library' },
      ],
      cancelText: 'Cancel',
      cancel: function() {
      },
      buttonClicked: function(index) {
        var cameraOptions = {  
          width: 500,
          height: 500,
          quality: 80,
          correctOrientation: true
        }
        if (index === 1) {  // From Library
            if(Meteor.isCordova){
              cameraOptions.sourceType = Camera.PictureSourceType.PHOTOLIBRARY;
            } else {
              alert('not available in browser');
            }
        }

        MeteorCamera.getPicture(cameraOptions, function(error, localData){
            options = {
                apiKey: "391ebba772242a6",
                mashapeKey: "gpIfI6aXh9msh6PWcG6gK3IRWkHkp1eXlxBjsnZKZzqWwifuOH",
                image: localData
            }
            if(localData){
                console.log('retain...');
                IonBackdrop.retain();
                IonLoading.show();
            }
            Imgur.upload(options, function(error, remoteData){
                if(error){
                    console.log(error);
                    IonBackdrop.release();
                    IonLoading.hide();

                } else{
                    console.log('release');
                    IonBackdrop.release();
                    IonLoading.hide();
                    callback(remoteData.id);
                }
            });
        });


        return true;
      },
  });
}

lucPopup = function(text){
  IonPopup.alert({
    title: text,
    okText: 'OK'
  });
}

getDistanceFromLatLonInKm = function(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
};

function deg2rad(deg) {
  return deg * (Math.PI/180)
  /* */
}

