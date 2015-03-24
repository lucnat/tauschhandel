(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var OAuth = Package.oauth.OAuth;
var Oauth = Package.oauth.Oauth;
var HTTP = Package.http.HTTP;
var HTTPInternals = Package.http.HTTPInternals;
var _ = Package.underscore._;
var ServiceConfiguration = Package['service-configuration'].ServiceConfiguration;

/* Package-scope variables */
var Google;

(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                              //
// packages/google/google_server.js                                                             //
//                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                //
Google = {};                                                                                    // 1
                                                                                                // 2
// https://developers.google.com/accounts/docs/OAuth2Login#userinfocall                         // 3
Google.whitelistedFields = ['id', 'email', 'verified_email', 'name', 'given_name',              // 4
                   'family_name', 'picture', 'locale', 'timezone', 'gender'];                   // 5
                                                                                                // 6
                                                                                                // 7
OAuth.registerService('google', 2, null, function(query) {                                      // 8
                                                                                                // 9
  var response = getTokens(query);                                                              // 10
  var accessToken = response.accessToken;                                                       // 11
  var idToken = response.idToken;                                                               // 12
  var identity = getIdentity(accessToken);                                                      // 13
                                                                                                // 14
  var serviceData = {                                                                           // 15
    accessToken: accessToken,                                                                   // 16
    idToken: idToken,                                                                           // 17
    expiresAt: (+new Date) + (1000 * response.expiresIn)                                        // 18
  };                                                                                            // 19
                                                                                                // 20
  var fields = _.pick(identity, Google.whitelistedFields);                                      // 21
  _.extend(serviceData, fields);                                                                // 22
                                                                                                // 23
  // only set the token in serviceData if it's there. this ensures                              // 24
  // that we don't lose old ones (since we only get this on the first                           // 25
  // log in attempt)                                                                            // 26
  if (response.refreshToken)                                                                    // 27
    serviceData.refreshToken = response.refreshToken;                                           // 28
                                                                                                // 29
  return {                                                                                      // 30
    serviceData: serviceData,                                                                   // 31
    options: {profile: {name: identity.name}}                                                   // 32
  };                                                                                            // 33
});                                                                                             // 34
                                                                                                // 35
// returns an object containing:                                                                // 36
// - accessToken                                                                                // 37
// - expiresIn: lifetime of token in seconds                                                    // 38
// - refreshToken, if this is the first authorization request                                   // 39
var getTokens = function (query) {                                                              // 40
  var config = ServiceConfiguration.configurations.findOne({service: 'google'});                // 41
  if (!config)                                                                                  // 42
    throw new ServiceConfiguration.ConfigError();                                               // 43
                                                                                                // 44
  var response;                                                                                 // 45
  try {                                                                                         // 46
    response = HTTP.post(                                                                       // 47
      "https://accounts.google.com/o/oauth2/token", {params: {                                  // 48
        code: query.code,                                                                       // 49
        client_id: config.clientId,                                                             // 50
        client_secret: OAuth.openSecret(config.secret),                                         // 51
        redirect_uri: OAuth._redirectUri('google', config),                                     // 52
        grant_type: 'authorization_code'                                                        // 53
      }});                                                                                      // 54
  } catch (err) {                                                                               // 55
    throw _.extend(new Error("Failed to complete OAuth handshake with Google. " + err.message), // 56
                   {response: err.response});                                                   // 57
  }                                                                                             // 58
                                                                                                // 59
  if (response.data.error) { // if the http response was a json object with an error attribute  // 60
    throw new Error("Failed to complete OAuth handshake with Google. " + response.data.error);  // 61
  } else {                                                                                      // 62
    return {                                                                                    // 63
      accessToken: response.data.access_token,                                                  // 64
      refreshToken: response.data.refresh_token,                                                // 65
      expiresIn: response.data.expires_in,                                                      // 66
      idToken: response.data.id_token                                                           // 67
    };                                                                                          // 68
  }                                                                                             // 69
};                                                                                              // 70
                                                                                                // 71
var getIdentity = function (accessToken) {                                                      // 72
  try {                                                                                         // 73
    return HTTP.get(                                                                            // 74
      "https://www.googleapis.com/oauth2/v1/userinfo",                                          // 75
      {params: {access_token: accessToken}}).data;                                              // 76
  } catch (err) {                                                                               // 77
    throw _.extend(new Error("Failed to fetch identity from Google. " + err.message),           // 78
                   {response: err.response});                                                   // 79
  }                                                                                             // 80
};                                                                                              // 81
                                                                                                // 82
                                                                                                // 83
Google.retrieveCredential = function(credentialToken, credentialSecret) {                       // 84
  return OAuth.retrieveCredential(credentialToken, credentialSecret);                           // 85
};                                                                                              // 86
                                                                                                // 87
//////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package.google = {
  Google: Google
};

})();

//# sourceMappingURL=google.js.map
