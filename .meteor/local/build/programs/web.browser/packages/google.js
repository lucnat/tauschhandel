//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
//                                                                      //
// If you are using Chrome, open the Developer Tools and click the gear //
// icon in its lower right corner. In the General Settings panel, turn  //
// on 'Enable source maps'.                                             //
//                                                                      //
// If you are using Firefox 23, go to `about:config` and set the        //
// `devtools.debugger.source-maps-enabled` preference to true.          //
// (The preference should be on by default in Firefox 24; versions      //
// older than 23 do not support source maps.)                           //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var OAuth = Package.oauth.OAuth;
var Oauth = Package.oauth.Oauth;
var _ = Package.underscore._;
var ServiceConfiguration = Package['service-configuration'].ServiceConfiguration;
var Random = Package.random.Random;
var Template = Package.templating.Template;
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var HTML = Package.htmljs.HTML;

/* Package-scope variables */
var Google;

(function () {

////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                            //
// packages/google/template.google_configure.js                                               //
//                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                              //
                                                                                              // 1
Template.__checkName("configureLoginServiceDialogForGoogle");                                 // 2
Template["configureLoginServiceDialogForGoogle"] = new Template("Template.configureLoginServiceDialogForGoogle", (function() {
  var view = this;                                                                            // 4
  return [ HTML.Raw("<p>\n    First, you'll need to get a Google Client ID. Follow these steps:\n  </p>\n  "), HTML.OL("\n    ", HTML.Raw('<li>\n      Visit <a href="https://code.google.com/apis/console/" target="blank">https://code.google.com/apis/console/</a>\n    </li>'), "\n    ", HTML.Raw('<li>\n      "Create Project", if needed. Wait for Google to finish provisioning.\n    </li>'), "\n    ", HTML.Raw('<li>\n      On the left sidebar, go to "APIs &amp; auth" and, underneath, "Consent Screen". Make sure to enter a product name, and save.\n    </li>'), "\n    ", HTML.Raw('<li>\n      On the left sidebar, go to "APIs &amp; auth" and then, "Credentials". "Create New Client ID", then select "Web application" as the type.\n    </li>'), "\n    ", HTML.LI("\n     Set Authorized Javascript Origins to: ", HTML.SPAN({
    "class": "url"                                                                            // 6
  }, Blaze.View("lookup:siteUrl", function() {                                                // 7
    return Spacebars.mustache(view.lookup("siteUrl"));                                        // 8
  })), "\n    "), "\n    ", HTML.LI("\n      Set Authorized Redirect URI to: ", HTML.SPAN({   // 9
    "class": "url"                                                                            // 10
  }, Blaze.View("lookup:siteUrl", function() {                                                // 11
    return Spacebars.mustache(view.lookup("siteUrl"));                                        // 12
  }), "_oauth/google"), "\n    "), "\n    ", HTML.Raw('<li>\n      Finish by clicking "Create Client ID".\n    </li>'), "\n  ") ];
}));                                                                                          // 14
                                                                                              // 15
////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                            //
// packages/google/google_configure.js                                                        //
//                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                              //
Template.configureLoginServiceDialogForGoogle.helpers({                                       // 1
  siteUrl: function () {                                                                      // 2
    return Meteor.absoluteUrl();                                                              // 3
  }                                                                                           // 4
});                                                                                           // 5
                                                                                              // 6
Template.configureLoginServiceDialogForGoogle.fields = function () {                          // 7
  return [                                                                                    // 8
    {property: 'clientId', label: 'Client ID'},                                               // 9
    {property: 'secret', label: 'Client secret'}                                              // 10
  ];                                                                                          // 11
};                                                                                            // 12
                                                                                              // 13
////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                            //
// packages/google/google_client.js                                                           //
//                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                              //
Google = {};                                                                                  // 1
                                                                                              // 2
// Request Google credentials for the user                                                    // 3
// @param options {optional}                                                                  // 4
// @param credentialRequestCompleteCallback {Function} Callback function to call on           // 5
//   completion. Takes one argument, credentialToken on success, or Error on                  // 6
//   error.                                                                                   // 7
Google.requestCredential = function (options, credentialRequestCompleteCallback) {            // 8
  // support both (options, callback) and (callback).                                         // 9
  if (!credentialRequestCompleteCallback && typeof options === 'function') {                  // 10
    credentialRequestCompleteCallback = options;                                              // 11
    options = {};                                                                             // 12
  } else if (!options) {                                                                      // 13
    options = {};                                                                             // 14
  }                                                                                           // 15
                                                                                              // 16
  var config = ServiceConfiguration.configurations.findOne({service: 'google'});              // 17
  if (!config) {                                                                              // 18
    credentialRequestCompleteCallback && credentialRequestCompleteCallback(                   // 19
      new ServiceConfiguration.ConfigError());                                                // 20
    return;                                                                                   // 21
  }                                                                                           // 22
                                                                                              // 23
  var credentialToken = Random.secret();                                                      // 24
                                                                                              // 25
  // always need this to get user id from google.                                             // 26
  var requiredScope = ['profile'];                                                            // 27
  var scope = ['email'];                                                                      // 28
  if (options.requestPermissions)                                                             // 29
    scope = options.requestPermissions;                                                       // 30
  scope = _.union(scope, requiredScope);                                                      // 31
  var flatScope = _.map(scope, encodeURIComponent).join('+');                                 // 32
                                                                                              // 33
  // https://developers.google.com/accounts/docs/OAuth2WebServer#formingtheurl                // 34
  var accessType = options.requestOfflineToken ? 'offline' : 'online';                        // 35
  var approvalPrompt = options.forceApprovalPrompt ? 'force' : 'auto';                        // 36
                                                                                              // 37
  var loginStyle = OAuth._loginStyle('google', config, options);                              // 38
                                                                                              // 39
  var loginUrl =                                                                              // 40
        'https://accounts.google.com/o/oauth2/auth' +                                         // 41
        '?response_type=code' +                                                               // 42
        '&client_id=' + config.clientId +                                                     // 43
        '&scope=' + flatScope +                                                               // 44
        '&redirect_uri=' + OAuth._redirectUri('google', config) +                             // 45
        '&state=' + OAuth._stateParam(loginStyle, credentialToken) +                          // 46
        '&access_type=' + accessType +                                                        // 47
        '&approval_prompt=' + approvalPrompt;                                                 // 48
                                                                                              // 49
  // Use Google's domain-specific login page if we want to restrict creation to               // 50
  // a particular email domain. (Don't use it if restrictCreationByEmailDomain                // 51
  // is a function.) Note that all this does is change Google's UI ---                        // 52
  // accounts-base/accounts_server.js still checks server-side that the server                // 53
  // has the proper email address after the OAuth conversation.                               // 54
  if (typeof Accounts._options.restrictCreationByEmailDomain === 'string') {                  // 55
    loginUrl += '&hd=' + encodeURIComponent(Accounts._options.restrictCreationByEmailDomain); // 56
  }                                                                                           // 57
                                                                                              // 58
  OAuth.launchLogin({                                                                         // 59
    loginService: "google",                                                                   // 60
    loginStyle: loginStyle,                                                                   // 61
    loginUrl: loginUrl,                                                                       // 62
    credentialRequestCompleteCallback: credentialRequestCompleteCallback,                     // 63
    credentialToken: credentialToken,                                                         // 64
    popupOptions: { height: 600 }                                                             // 65
  });                                                                                         // 66
};                                                                                            // 67
                                                                                              // 68
////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package.google = {
  Google: Google
};

})();
