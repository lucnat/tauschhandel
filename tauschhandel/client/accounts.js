/*
Accounts.ui.config({
    requestPermissions: {},
    passwordSignupFields: 'USERNAME_AND_EMAIL'
});

*/
AccountsTemplates.addFields([
	{
	_id: "username",
	type: "text",
	displayName: "username",
	required: true,
	minLength: 5,
	}
]);

T9n.setLanguage('de');


AccountsTemplates.configure({
    showLabels: false,
});

Tracker.autorun(function () {
	if(!Meteor.user()){
		onLogout();
	}
});

Tracker.autorun(function(){
	if(Meteor.userId()){
		onLogin();
	}
});

function onLogin(){
	try{
		if(Meteor.user().profile.firstLogin == true){
			Router.go('/firstlogin1');
		}
	} catch(e) {}
}

function onLogout(){
	//alert('on Logout called, going to profile');
	//Router.go('/profile');
}


