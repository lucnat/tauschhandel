(function(){
Template.__checkName("profile");
Template["profile"] = new Template("Template.profile", (function() {
  var view = this;
  return [ Spacebars.include(view.lookupTemplate("nachrichten")), "\n	", Spacebars.include(view.lookupTemplate("watchList")), "\n	", Spacebars.include(view.lookupTemplate("benutzerdaten")), "\n	", Spacebars.include(view.lookupTemplate("einstellungen")) ];
}));

Template.__checkName("nachrichten");
Template["nachrichten"] = new Template("Template.nachrichten", (function() {
  var view = this;
  return [ HTML.Raw("<h3>Notifications:</h3>\n	"), Blaze.Each(function() {
    return Spacebars.call(view.lookup("notifications"));
  }, function() {
    return [ "\n		", Spacebars.include(view.lookupTemplate("notification")), "\n	" ];
  }) ];
}));

Template.__checkName("nachricht");
Template["nachricht"] = new Template("Template.nachricht", (function() {
  var view = this;
  return HTML.DIV({
    "class": "panel panel-success"
  }, "\n		", HTML.DIV({
    "class": "panel-heading"
  }, "von: ", Blaze.View("lookup:absenderName", function() {
    return Spacebars.mustache(view.lookup("absenderName"));
  }), " | an: ", Blaze.View("lookup:empfaengerName", function() {
    return Spacebars.mustache(view.lookup("empfaengerName"));
  })), "\n		", HTML.DIV({
    "class": "panel-body"
  }, "\n			", HTML.H4(Blaze.View("lookup:subject", function() {
    return Spacebars.mustache(view.lookup("subject"));
  })), "\n			", HTML.P(Blaze.View("lookup:text", function() {
    return Spacebars.mustache(view.lookup("text"));
  })), "\n		"), "\n	");
}));

Template.__checkName("watchList");
Template["watchList"] = new Template("Template.watchList", (function() {
  var view = this;
  return "";
}));

Template.__checkName("benutzerdaten");
Template["benutzerdaten"] = new Template("Template.benutzerdaten", (function() {
  var view = this;
  return HTML.Raw("<h3>Benutzerdaten: </h3>");
}));

Template.__checkName("einstellungen");
Template["einstellungen"] = new Template("Template.einstellungen", (function() {
  var view = this;
  return HTML.Raw("<h3>Einstellungen:</h3>");
}));

})();
