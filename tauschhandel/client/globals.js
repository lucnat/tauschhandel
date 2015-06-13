isLoggedIn = function() {
    if (!Meteor.user()) {
        // user is not logged in, so let's show login popup
        alert('You must login before performing this action.');
        return false;
    } else return true;
}

