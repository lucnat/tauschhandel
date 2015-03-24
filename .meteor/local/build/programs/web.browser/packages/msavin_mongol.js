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
var Template = Package.templating.Template;
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;
var Mongo = Package.mongo.Mongo;
var Session = Package.session.Session;
var EditableJSON = Package['babrahams:editable-json'].EditableJSON;
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var HTML = Package.htmljs.HTML;

/* Package-scope variables */
var Mongol, MongolPackage, sessionKey, docIndex, DocumentPosition, CurrentCollection, CollectionCount, newPosition;

(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/msavin:mongol/common/common.js                                                                           //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
if (Mongol === undefined) {                                                                                          // 1
                                                                                                                     // 2
  // Reserve this variable name across the package                                                                   // 3
  // In case we'd like to export it to give package users a simple api                                               // 4
  // e.g. when all collections have been matched by default, but the developer wants to suppress some                // 5
  // Mongol.hideCollection('posts');                                                                                 // 6
  // Downside is that it pollutes the global namespace with `Mongol`, but most apps can probably live with that      // 7
  // See /client/defaults/defaults.js for implementation                                                             // 8
                                                                                                                     // 9
  Mongol = {};                                                                                                       // 10
                                                                                                                     // 11
}                                                                                                                    // 12
                                                                                                                     // 13
// Go through a variety of means of trying to return the correct collection                                          // 14
                                                                                                                     // 15
Mongol.Collection = function (collectionName) {                                                                      // 16
                                                                                                                     // 17
  return Mongo.Collection.get(collectionName)                                                                        // 18
    // This should automatically match all collections by default                                                    // 19
    // including namespaced collections                                                                              // 20
                                                                                                                     // 21
  || ((Meteor.isServer) ? eval(collectionName) : Meteor._get.apply(null,[window].concat(collectionName.split('.')))) // 22
  // For user defined collection names                                                                               // 23
  // in the form of Meteor's Mongo.Collection names as strings                                                       // 24
                                                                                                                     // 25
  || ((Meteor.isServer) ? eval(firstToUpper(collectionName)) : Meteor._get.apply(null,[window].concat(firstToUpper(collectionName).split('.'))))
  // For user defined collections where the user has typical upper-case collection names                             // 27
  // but they've put actual mongodb collection names into the Mongol config instead of Meteor's Mongo.Collection names as strings
                                                                                                                     // 29
  || null;                                                                                                           // 30
  // If the user has gone for unconventional casing of collection names,                                             // 31
  // they'll have to get them right (i.e. Meteor's Mongo.Collection names as string) in the Mongol config manually   // 32
                                                                                                                     // 33
                                                                                                                     // 34
  // Changes the first character of a string to upper case                                                           // 35
                                                                                                                     // 36
  function firstToUpper(text) {                                                                                      // 37
                                                                                                                     // 38
    return text.charAt(0).toUpperCase() + text.substr(1);                                                            // 39
                                                                                                                     // 40
  }                                                                                                                  // 41
                                                                                                                     // 42
};                                                                                                                   // 43
                                                                                                                     // 44
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/msavin:mongol/client/mongol_functions.js                                                                 //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
MongolPackage = {                                                                                                    // 1
  'startup': function () {                                                                                           // 2
    console.log("This application contains Mongol. Read more: https://github.com/msavin/Mongol");                    // 3
  },                                                                                                                 // 4
  'toggleDisplay': function () {                                                                                     // 5
                                                                                                                     // 6
    var displayStatus = Session.get("Mongol_settings_display");                                                      // 7
                                                                                                                     // 8
    if (displayStatus) {                                                                                             // 9
      Session.set("Mongol_settings_display", false);                                                                 // 10
    } else {                                                                                                         // 11
      Session.set("Mongol_settings_display", true);                                                                  // 12
    }                                                                                                                // 13
  },                                                                                                                 // 14
  'toggleFullScreen' : function () {                                                                                 // 15
	                                                                                                                    // 16
	var fullScreenStatus = Session.get("Mongol_fullscreen");                                                            // 17
	                                                                                                                    // 18
    Session.set("Mongol_fullscreen", !fullScreenStatus);                                                             // 19
	                                                                                                                    // 20
    if (!Session.get("Mongol_currentCollection")) {                                                                  // 21
	  Session.set("Mongol_fullscreen", true);                                                                           // 22
      Session.set("Mongol_currentCollection", "mongol_618");                                                         // 23
    }                                                                                                                // 24
	                                                                                                                    // 25
  },                                                                                                                 // 26
  'colorize': function (json) {                                                                                      // 27
    // colorized the JSON objects                                                                                    // 28
    if (typeof json != 'string') {                                                                                   // 29
      json = JSON.stringify(json, undefined, 2);                                                                     // 30
    }                                                                                                                // 31
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');                                  // 32
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function(match) {
      var cls = 'Mongol_number';                                                                                     // 34
      if (/^"/.test(match)) {                                                                                        // 35
        if (/:$/.test(match)) {                                                                                      // 36
          cls = 'Mongol_key';                                                                                        // 37
        } else {                                                                                                     // 38
          cls = 'Mongol_string';                                                                                     // 39
        }                                                                                                            // 40
      } else if (/true|false/.test(match)) {                                                                         // 41
        cls = 'Mongol_boolean';                                                                                      // 42
      } else if (/null/.test(match)) {                                                                               // 43
        cls = 'Mongol_null';                                                                                         // 44
      }                                                                                                              // 45
      return '<span class="' + cls + '">' + match + '</span>';                                                       // 46
    });                                                                                                              // 47
  },                                                                                                                 // 48
  'getDocumentUpdate': function (data) {                                                                             // 49
                                                                                                                     // 50
    var elementID = 'MongolDoc_' + data,                                                                             // 51
      newData = document.getElementById(elementID).textContent;                                                      // 52
                                                                                                                     // 53
    return newData;                                                                                                  // 54
                                                                                                                     // 55
  },                                                                                                                 // 56
  'error': function (data) {                                                                                         // 57
                                                                                                                     // 58
    switch (data) {                                                                                                  // 59
      case "json.parse":                                                                                             // 60
        alert("There is an error with your JSON syntax.\n\nNote: keys and string values need double quotes.");       // 61
        break;                                                                                                       // 62
      case "duplicate":                                                                                              // 63
        alert("Strange, there was an error duplicating your document.");                                             // 64
        break;                                                                                                       // 65
      case "remove":                                                                                                 // 66
        alert("Strange, there was an error removing your document.");                                                // 67
        break;                                                                                                       // 68
      case "insert":                                                                                                 // 69
        alert("Strange, there was an error inserting your document.");                                               // 70
        break;                                                                                                       // 71
      case "update":                                                                                                 // 72
        alert("There was an error updating your document. Please review your changes and try again.");               // 73
        break;                                                                                                       // 74
      case "permission":                                                                                             // 75
        // under consideration                                                                                       // 76
        alert("This Meteor applications looks to be deployed in debug mode. Mongol cannot edit this document because it onlys works if the absolute URL beings with 'http://localhost:'")
      default:                                                                                                       // 78
        return "Request Credentials";                                                                                // 79
        break;                                                                                                       // 80
    }                                                                                                                // 81
                                                                                                                     // 82
  },                                                                                                                 // 83
  'parse': function (data) {                                                                                         // 84
    var newObject = false;                                                                                           // 85
                                                                                                                     // 86
    try {                                                                                                            // 87
      newObject = JSON.parse(data);                                                                                  // 88
    } catch (error) {                                                                                                // 89
      MongolPackage.error("json.parse");                                                                             // 90
    }                                                                                                                // 91
                                                                                                                     // 92
    return newObject;                                                                                                // 93
                                                                                                                     // 94
  },                                                                                                                 // 95
  'setSubscriptionKeys': function () {                                                                               // 96
                                                                                                                     // 97
      var subscriptions  = Meteor.default_connection._subscriptions,                                                 // 98
          subKeys        = Object.keys(subscriptions);                                                               // 99
                                                                                                                     // 100
          Session.set("Mongol_subscriptions", subKeys)                                                               // 101
                                                                                                                     // 102
  }                                                                                                                  // 103
};                                                                                                                   // 104
                                                                                                                     // 105
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/msavin:mongol/client/header/template.header.js                                                           //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
                                                                                                                     // 1
Template.__checkName("Mongol_header");                                                                               // 2
Template["Mongol_header"] = new Template("Template.Mongol_header", (function() {                                     // 3
  var view = this;                                                                                                   // 4
  return HTML.DIV({                                                                                                  // 5
    "class": function() {                                                                                            // 6
      return [ "Mongol_row ", Spacebars.mustache(view.lookup("active")), " Mongol_header" ];                         // 7
    },                                                                                                               // 8
    id: "Mongol_cmongol_618"                                                                                         // 9
  }, HTML.Raw('\n\n    <div style="float: right" class="Mongol_Minimize" title="Minimize">_</div>\n    <!-- <div style="float: right" class="Mongol_FullScreen" title="Fullscreen">&#x2b1c;</div> -->\n\n    <strong>Mongol</strong><br>\n    '), HTML.DIV({
    "class": "Mongol_contentView"                                                                                    // 11
  }, "\n    ", HTML.Raw("<!--  -->"), "\n      ", HTML.Raw('<div class="Mongol_docMenu" style="text-indent: 8px">\n        v1.0 Preview\n      </div>'), "\n      ", HTML.DIV({
    "class": "Mongol_documentViewer "                                                                                // 13
  }, "\n\n        Created by ", HTML.Raw('<a href="http://maxsavin.com"><u>Max Savin</u></a>'), ".", HTML.Raw("<br>"), "\n        Learn more at ", HTML.Raw('<a href="https://github.com/msavin/Mongol"><u>GitHub</u></a>'), ".", HTML.Raw("<br>"), "\n        Issued under ", HTML.Raw('<a href="https://github.com/msavin/Mongol/blob/master/README.md"><u> MIT License</u></a>'), ".\n        ", HTML.Raw("<br>"), HTML.Raw("<br>"), "\n        ", Spacebars.include(view.lookupTemplate("donate")), "\n\n      "), "\n    ", HTML.Raw("<!--  -->"), "\n    "), "\n  ");
}));                                                                                                                 // 15
                                                                                                                     // 16
Template.__checkName("donate");                                                                                      // 17
Template["donate"] = new Template("Template.donate", (function() {                                                   // 18
  var view = this;                                                                                                   // 19
  return HTML.Raw('Want to support this project? <br>\n  Please make a donation: <br>\n  \n    <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top" style="margin-top: 5px">\n    <input type="hidden" name="cmd" value="_s-xclick">\n    <input type="hidden" name="hosted_button_id" value="3F7QPGSLWLND2">\n     <input type="image" src="data:image/png;base64,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" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!" style="height: 24px !important;">\n    <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1">\n    </form>');
}));                                                                                                                 // 21
                                                                                                                     // 22
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/msavin:mongol/client/header/header.js                                                                    //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
Template.Mongol_header.events({                                                                                      // 1
  'click .Mongol_row': function () {                                                                                 // 2
    if (Session.equals("Mongol_currentCollection", "mongol_618")) {                                                  // 3
      Session.set("Mongol_currentCollection", null);                                                                 // 4
    } else {                                                                                                         // 5
      Session.set("Mongol_currentCollection", "mongol_618");                                                         // 6
    }                                                                                                                // 7
  },                                                                                                                 // 8
  'click .Mongol_Minimize' : function (e) {                                                                          // 9
    e.stopPropagation();                                                                                             // 10
    Session.set("Mongol_currentCollection", null);                                                                   // 11
  },                                                                                                                 // 12
  'click .Mongol_FullScreen' : function (e) {                                                                        // 13
    e.stopPropagation();                                                                                             // 14
	  MongolPackage.toggleFullScreen();                                                                                 // 15
  },                                                                                                                 // 16
  'click .Mongol_contentView': function (e) {                                                                        // 17
    e.stopPropagation();                                                                                             // 18
  }                                                                                                                  // 19
});                                                                                                                  // 20
                                                                                                                     // 21
Template.Mongol_header.helpers({                                                                                     // 22
  active: function () {                                                                                              // 23
    if (Session.equals("Mongol_currentCollection", "mongol_618")) {                                                  // 24
      return "Mongol_row_expand";                                                                                    // 25
    }                                                                                                                // 26
  }                                                                                                                  // 27
});                                                                                                                  // 28
                                                                                                                     // 29
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/msavin:mongol/client/account/template.account.js                                                         //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
                                                                                                                     // 1
Template.__checkName("Mongol_account");                                                                              // 2
Template["Mongol_account"] = new Template("Template.Mongol_account", (function() {                                   // 3
  var view = this;                                                                                                   // 4
  return HTML.DIV({                                                                                                  // 5
    "class": function() {                                                                                            // 6
      return [ "Mongol_row ", Spacebars.mustache(view.lookup("active")) ];                                           // 7
    },                                                                                                               // 8
    id: "Mongol_caccount_618",                                                                                       // 9
    style: "white-space:normal;"                                                                                     // 10
  }, HTML.Raw("\n		\n			<!-- Display sign in status -->\n			"), Blaze.If(function() {                                // 11
    return Spacebars.call(view.lookup("currentUser"));                                                               // 12
  }, function() {                                                                                                    // 13
    return [ "\n				", HTML.DIV({                                                                                    // 14
      "class": "Mongol_account_active"                                                                               // 15
    }), "\n			" ];                                                                                                   // 16
  }, function() {                                                                                                    // 17
    return [ "\n				", HTML.DIV({                                                                                    // 18
      "class": "Mongol_account_inactive"                                                                             // 19
    }), "\n			" ];                                                                                                   // 20
  }), HTML.Raw("\n\n			<!-- Name -->\n			Account\n     \n        "), HTML.DIV({                                      // 21
    "class": "Mongol_contentView"                                                                                    // 22
  }, "\n			", HTML.Raw("<!-- Document Viewer -->"), "\n			", Blaze.If(function() {                                   // 23
    return Spacebars.call(view.lookup("currentUser"));                                                               // 24
  }, function() {                                                                                                    // 25
    return [ "\n				", Spacebars.include(view.lookupTemplate("Mongol_accountViewer")), "\n			" ];                    // 26
  }, function() {                                                                                                    // 27
    return [ "\n				", HTML.DIV({                                                                                    // 28
      "class": function() {                                                                                          // 29
        return [ "Mongol_docMenu ", Spacebars.mustache(view.lookup("Mongol_docMenu_editing")) ];                     // 30
      }                                                                                                              // 31
    }, "\n						", HTML.DIV({                                                                                        // 32
      "class": "Mongol_docBar1",                                                                                     // 33
      style: "text-indent: 8px"                                                                                      // 34
    }, "\n							Not Signed In\n	                        ", Blaze.If(function() {                                    // 35
      return Spacebars.call(view.lookup("canSignIn"));                                                               // 36
    }, function() {                                                                                                  // 37
      return HTML.DIV({                                                                                              // 38
        "class": "Mongol_m_signin"                                                                                   // 39
      }, "Sign In");                                                                                                 // 40
    }), "\n						"), "\n					"), "\n				", HTML.DIV({                                                                // 41
      "class": "Mongol_documentViewer"                                                                               // 42
    }, "	\n					\n				"), "\n			" ];                                                                                 // 43
  }), "\n		"), "\n	");                                                                                               // 44
}));                                                                                                                 // 45
                                                                                                                     // 46
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/msavin:mongol/client/account/account.js                                                                  //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
                                                                                                                     // 1
Template.Mongol_account.helpers({                                                                                    // 2
  active: function () {                                                                                              // 3
    if (Session.equals("Mongol_currentCollection", "account_618")) {                                                 // 4
      return "Mongol_row_expand";                                                                                    // 5
    }                                                                                                                // 6
  },                                                                                                                 // 7
  hasAccountsUI: function () {                                                                                       // 8
    if (Template.loginButtons) {                                                                                     // 9
      return true;                                                                                                   // 10
    }                                                                                                                // 11
  },                                                                                                                 // 12
  canSignIn: function () {                                                                                           // 13
    // Not reactive, but it'll have to do                                                                            // 14
    return !!Package['accounts-base'] && !!Package['accounts-ui'] && !Meteor.userId() && $('#login-sign-in-link').length;
  }                                                                                                                  // 16
});                                                                                                                  // 17
                                                                                                                     // 18
                                                                                                                     // 19
Template.Mongol_account.events({                                                                                     // 20
  'click .Mongol_row': function () {                                                                                 // 21
    if (Session.equals("Mongol_currentCollection", "account_618")) {                                                 // 22
      Session.set("Mongol_currentCollection", null);                                                                 // 23
    } else {                                                                                                         // 24
      Session.set("Mongol_currentCollection", "account_618");                                                        // 25
    }                                                                                                                // 26
  },                                                                                                                 // 27
  'click .Mongol_m_signin': function () {                                                                            // 28
    $('#login-sign-in-link').trigger('click');                                                                       // 29
  },                                                                                                                 // 30
  'click .Mongol_contentView': function(e, t) {                                                                      // 31
    e.stopPropagation();                                                                                             // 32
  }                                                                                                                  // 33
});                                                                                                                  // 34
                                                                                                                     // 35
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/msavin:mongol/client/account/template.accountViewer.js                                                   //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
                                                                                                                     // 1
Template.__checkName("Mongol_accountViewer");                                                                        // 2
Template["Mongol_accountViewer"] = new Template("Template.Mongol_accountViewer", (function() {                       // 3
  var view = this;                                                                                                   // 4
  return [ Spacebars.include(view.lookupTemplate("Mongol_docControls")), "\n\n	", HTML.DIV({                         // 5
    "class": function() {                                                                                            // 6
      return [ "Mongol_documentViewer ", Spacebars.mustache(view.lookup("editStyle")) ];                             // 7
    },                                                                                                               // 8
    id: "MongolDoc_account_618",                                                                                     // 9
    contenteditable: function() {                                                                                    // 10
      return Spacebars.mustache(view.lookup("editContent"));                                                         // 11
    }                                                                                                                // 12
  }, "	\n		", HTML.PRE(Blaze.View(function() {                                                                       // 13
    return Spacebars.makeRaw(Spacebars.mustache(view.lookup("accountData")));                                        // 14
  })), "\n	") ];                                                                                                     // 15
}));                                                                                                                 // 16
                                                                                                                     // 17
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/msavin:mongol/client/account/accountViewer.js                                                            //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
Template.Mongol_accountViewer.helpers({                                                                              // 1
  accountData: function () {                                                                                         // 2
    var docCurrent = Meteor.user(),                                                                                  // 3
      json_output = JSON.stringify(docCurrent, null, 2),                                                             // 4
      colorized = MongolPackage.colorize(json_output);                                                               // 5
    return colorized;                                                                                                // 6
  },                                                                                                                 // 7
  editContent: function () {                                                                                         // 8
                                                                                                                     // 9
    var editMode = Session.get("Mongol_editMode");                                                                   // 10
                                                                                                                     // 11
    if (editMode) {                                                                                                  // 12
      return "true";                                                                                                 // 13
    }                                                                                                                // 14
                                                                                                                     // 15
  },                                                                                                                 // 16
  editStyle: function () {                                                                                           // 17
                                                                                                                     // 18
    var editMode = Session.get("Mongol_editMode");                                                                   // 19
                                                                                                                     // 20
    if (editMode) {                                                                                                  // 21
      return "Mongol_editable";                                                                                      // 22
    }                                                                                                                // 23
                                                                                                                     // 24
  },                                                                                                                 // 25
  usercode: function () {                                                                                            // 26
    return Meteor.userId();                                                                                          // 27
  },                                                                                                                 // 28
});                                                                                                                  // 29
                                                                                                                     // 30
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/msavin:mongol/client/collections/template.collections.js                                                 //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
                                                                                                                     // 1
Template.__checkName("Mongol_collection");                                                                           // 2
Template["Mongol_collection"] = new Template("Template.Mongol_collection", (function() {                             // 3
  var view = this;                                                                                                   // 4
  return HTML.DIV({                                                                                                  // 5
    "class": function() {                                                                                            // 6
      return [ "Mongol_row ", Spacebars.mustache(view.lookup("active")) ];                                           // 7
    },                                                                                                               // 8
    id: function() {                                                                                                 // 9
      return [ "Mongol_c", Spacebars.mustache(view.lookup(".")) ];                                                   // 10
    }                                                                                                                // 11
  }, HTML.Raw('\n		\n        <!-- <div class="Mongol_toggle_selected_collection"> -->\n        \n			<!-- Collection Count -->\n			'), HTML.DIV({
    "class": "Mongol_counter"                                                                                        // 13
  }, "\n				", Blaze.If(function() {                                                                                 // 14
    return Spacebars.call(view.lookup("collectionCount"));                                                           // 15
  }, function() {                                                                                                    // 16
    return [ "\n				", HTML.SPAN({                                                                                   // 17
      "class": "MongolHide"                                                                                          // 18
    }, Blaze.View(function() {                                                                                       // 19
      return Spacebars.mustache(view.lookup("currentPosition"));                                                     // 20
    }), "/") ];                                                                                                      // 21
  }), Blaze.View(function() {                                                                                        // 22
    return Spacebars.mustache(view.lookup("collectionCount"));                                                       // 23
  }), "\n			"), HTML.Raw("\n	\n			<!-- Collection Name -->\n			"), HTML.DIV({                                        // 24
    "class": "Mongol_row_name"                                                                                       // 25
  }, Blaze.View(function() {                                                                                         // 26
    return Spacebars.mustache(view.lookup("."));                                                                     // 27
  })), HTML.Raw("\n    	    \n        <!-- </div> -->\n\n		<!-- Document Viewer -->\n		"), HTML.DIV({                // 28
    "class": "Mongol_contentView"                                                                                    // 29
  }, "\n			", Spacebars.include(view.lookupTemplate("Mongol_docViewer")), "\n		"), "\n	");                           // 30
}));                                                                                                                 // 31
                                                                                                                     // 32
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/msavin:mongol/client/collections/collections.js                                                          //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
Template.Mongol_collection.events({                                                                                  // 1
  'click .Mongol_row': function (evt) {                                                                              // 2
                                                                                                                     // 3
    var targetCollection = String(this);                                                                             // 4
    var sessionKey = "Mongol_" + targetCollection;                                                                   // 5
                                                                                                                     // 6
    if (Session.equals("Mongol_currentCollection", targetCollection)) {                                              // 7
                                                                                                                     // 8
      // either do nothing or collapse the pane                                                                      // 9
      // comment out the line below for not collapsing the pane                                                      // 10
      Session.set("Mongol_currentCollection", null);                                                                 // 11
                                                                                                                     // 12
    } else {                                                                                                         // 13
                                                                                                                     // 14
      Session.set("Mongol_editMode", false);                                                                         // 15
                                                                                                                     // 16
      // If the collection doesn't have an index key set,                                                            // 17
      // start it from the first document                                                                            // 18
      if (!Session.get(sessionKey)) {                                                                                // 19
        Session.set(sessionKey, 0);                                                                                  // 20
      }                                                                                                              // 21
                                                                                                                     // 22
      Session.set("Mongol_currentCollection", targetCollection);                                                     // 23
                                                                                                                     // 24
    }                                                                                                                // 25
                                                                                                                     // 26
  },                                                                                                                 // 27
  'click .Mongol_contentView': function(e, t) {                                                                      // 28
    e.stopPropagation();                                                                                             // 29
  }                                                                                                                  // 30
});                                                                                                                  // 31
                                                                                                                     // 32
Template.Mongol_collection.helpers({                                                                                 // 33
  active: function () {                                                                                              // 34
                                                                                                                     // 35
    var currentCollection = Session.get("Mongol_currentCollection"),                                                 // 36
      targetCollection = String(this);                                                                               // 37
                                                                                                                     // 38
    if (currentCollection === targetCollection) {                                                                    // 39
      return "Mongol_row_expand";                                                                                    // 40
    }                                                                                                                // 41
                                                                                                                     // 42
  },                                                                                                                 // 43
  collectionCount: function () {                                                                                     // 44
                                                                                                                     // 45
    var collectionName = String(this);                                                                               // 46
    var collectionVar = Mongol.Collection(collectionName);                                                           // 47
                                                                                                                     // 48
    var count = collectionVar && collectionVar.find().count() || 0;                                                  // 49
                                                                                                                     // 50
    return count;                                                                                                    // 51
                                                                                                                     // 52
  },                                                                                                                 // 53
  currentPosition: function () {                                                                                     // 54
                                                                                                                     // 55
    var targetCollection = String(this);                                                                             // 56
    var sessionKey = "Mongol_" + targetCollection;                                                                   // 57
                                                                                                                     // 58
    var current = Session.get(sessionKey);                                                                           // 59
    var count = current + 1;                                                                                         // 60
                                                                                                                     // 61
    return count;                                                                                                    // 62
                                                                                                                     // 63
  }                                                                                                                  // 64
});                                                                                                                  // 65
                                                                                                                     // 66
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/msavin:mongol/client/docViewer/template.docViewer.js                                                     //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
                                                                                                                     // 1
Template.__checkName("Mongol_docViewer");                                                                            // 2
Template["Mongol_docViewer"] = new Template("Template.Mongol_docViewer", (function() {                               // 3
  var view = this;                                                                                                   // 4
  return Blaze.If(function() {                                                                                       // 5
    return Spacebars.call(view.lookup("notEmpty"));                                                                  // 6
  }, function() {                                                                                                    // 7
    return [ "\n    ", Spacebars.include(view.lookupTemplate("Mongol_docControls")), "\n    ", Spacebars.With(function() {
      return Spacebars.call(view.lookup("activeDocument"));                                                          // 9
    }, function() {                                                                                                  // 10
      return [ "\n      ", Blaze.If(function() {                                                                     // 11
        return Spacebars.call(view.lookup("editStyle"));                                                             // 12
      }, function() {                                                                                                // 13
        return [ "\n        ", HTML.DIV({                                                                            // 14
          "class": function() {                                                                                      // 15
            return [ "Mongol_documentViewer ", Spacebars.mustache(view.lookup("editStyle")) ];                       // 16
          },                                                                                                         // 17
          id: function() {                                                                                           // 18
            return [ "MongolDoc_", Spacebars.mustache(view.lookup("..")) ];                                          // 19
          },                                                                                                         // 20
          contenteditable: function() {                                                                              // 21
            return Spacebars.mustache(view.lookup("editContent"));                                                   // 22
          }                                                                                                          // 23
        }, "  \n          ", HTML.PRE(Blaze.View(function() {                                                        // 24
          return Spacebars.makeRaw(Spacebars.mustache(view.lookup("documentJSON")));                                 // 25
        })), "\n        "), "\n      " ];                                                                            // 26
      }, function() {                                                                                                // 27
        return [ "\n        ", HTML.DIV({                                                                            // 28
          "class": function() {                                                                                      // 29
            return [ "Mongol_documentViewer ", Spacebars.mustache(view.lookup("editStyle")) ];                       // 30
          },                                                                                                         // 31
          id: function() {                                                                                           // 32
            return [ "MongolDoc_", Spacebars.mustache(view.lookup("..")) ];                                          // 33
          },                                                                                                         // 34
          contenteditable: function() {                                                                              // 35
            return Spacebars.mustache(view.lookup("editContent"));                                                   // 36
          }                                                                                                          // 37
        }, "  \n          ", Blaze.If(function() {                                                                   // 38
          return Spacebars.call(view.lookup("noInlineEditing"));                                                     // 39
        }, function() {                                                                                              // 40
          return [ "\n            ", HTML.PRE(Blaze.View(function() {                                                // 41
            return Spacebars.makeRaw(Spacebars.mustache(view.lookup("documentJSON")));                               // 42
          })), "\n          " ];                                                                                     // 43
        }, function() {                                                                                              // 44
          return [ "\n            ", Blaze._TemplateWith(function() {                                                // 45
            return {                                                                                                 // 46
              document: Spacebars.call(view.lookup(".")),                                                            // 47
              collection: Spacebars.call(view.lookup(".."))                                                          // 48
            };                                                                                                       // 49
          }, function() {                                                                                            // 50
            return Spacebars.include(view.lookupTemplate("editableJSON"));                                           // 51
          }), "\n          " ];                                                                                      // 52
        }), "\n        "), "\n      " ];                                                                             // 53
      }), "\n    " ];                                                                                                // 54
    }, function() {                                                                                                  // 55
      return [ "\n      ", HTML.DIV({                                                                                // 56
        "class": "Mongol_documentViewer",                                                                            // 57
        id: function() {                                                                                             // 58
          return [ "MongolDoc_", Spacebars.mustache(view.lookup(".")) ];                                             // 59
        }                                                                                                            // 60
      }, "  \n        ", HTML.PRE("No document found"), "\n      "), "\n    " ];                                     // 61
    }), "\n  " ];                                                                                                    // 62
  }, function() {                                                                                                    // 63
    return [ "\n    ", Spacebars.include(view.lookupTemplate("Mongol_docInsert")), "\n  " ];                         // 64
  });                                                                                                                // 65
}));                                                                                                                 // 66
                                                                                                                     // 67
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/msavin:mongol/client/docViewer/docViewer.js                                                              //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
Template.Mongol_docViewer.helpers({                                                                                  // 1
  activeDocument: function () {                                                                                      // 2
    var collectionName = String(this);                                                                               // 3
    var currentCollection = Mongol.Collection(collectionName);                                                       // 4
    var documents = currentCollection.find().fetch();                                                                // 5
    var sessionKey = "Mongol_" + String(this);                                                                       // 6
    var docNumber = Session.get(sessionKey);                                                                         // 7
    var docCurrent = documents[docNumber];                                                                           // 8
    return docCurrent;                                                                                               // 9
  },                                                                                                                 // 10
  documentJSON: function () {                                                                                        // 11
    var docCurrent = this;                                                                                           // 12
    var json_output = JSON.stringify(docCurrent, null, 2), colorize;                                                 // 13
                                                                                                                     // 14
    if (!(json_output === undefined)) {                                                                              // 15
      colorize = MongolPackage.colorize(json_output);                                                                // 16
    } else {                                                                                                         // 17
      colorize = json_output;                                                                                        // 18
    }                                                                                                                // 19
                                                                                                                     // 20
    return colorize;                                                                                                 // 21
                                                                                                                     // 22
  },                                                                                                                 // 23
  editContent: function () {                                                                                         // 24
                                                                                                                     // 25
    var editMode = Session.get("Mongol_editMode");                                                                   // 26
                                                                                                                     // 27
    if (editMode) {                                                                                                  // 28
      return "true";                                                                                                 // 29
    }                                                                                                                // 30
                                                                                                                     // 31
  },                                                                                                                 // 32
  editStyle: function () {                                                                                           // 33
                                                                                                                     // 34
    var editMode = Session.get("Mongol_editMode");                                                                   // 35
                                                                                                                     // 36
    if (editMode) {                                                                                                  // 37
      return "Mongol_editable";                                                                                      // 38
    }                                                                                                                // 39
                                                                                                                     // 40
  },                                                                                                                 // 41
  notEmpty: function () {                                                                                            // 42
    var documentCount = Mongol.Collection(String(this)) && Mongol.Collection(String(this)).find().count() || 0;      // 43
    if (documentCount >= 1) {                                                                                        // 44
      return true;                                                                                                   // 45
    }                                                                                                                // 46
  },                                                                                                                 // 47
  noInlineEditing: function () {                                                                                     // 48
	return Session.get('Mongol_noInlineEditing');                                                                       // 49
  }                                                                                                                  // 50
});                                                                                                                  // 51
                                                                                                                     // 52
// Will possibly be used in augmented document udpate UI                                                             // 53
/*Template.Mongol_docViewer.events({                                                                                 // 54
                                                                                                                     // 55
	'click .Mongol_string' : function (evt,tmpl) {                                                                      // 56
		var field = $(evt.target).prevAll(".Mongol_key:first").text().slice(1,-2);                                         // 57
		Session.set('Mongol_inlineEdit',true);                                                                             // 58
		Tracker.flush();                                                                                                   // 59
		// Do something to trigger the editable text element                                                               // 60
	}                                                                                                                   // 61
                                                                                                                     // 62
});*/                                                                                                                // 63
                                                                                                                     // 64
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/msavin:mongol/client/docInsert/template.docInsert.js                                                     //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
                                                                                                                     // 1
Template.__checkName("Mongol_docInsert");                                                                            // 2
Template["Mongol_docInsert"] = new Template("Template.Mongol_docInsert", (function() {                               // 3
  var view = this;                                                                                                   // 4
  return [ HTML.Raw('<div class="Mongol_docMenu">\n		<div class="Mongol_docMenu_insert" style="float: right">Insert</div>\n		&nbsp;Create the First Document\n	</div>\n\n	'), HTML.DIV({
    "class": "Mongol_documentViewer ",                                                                               // 6
    id: function() {                                                                                                 // 7
      return [ "Mongol_", Spacebars.mustache(view.lookup(".")), "_newEntry" ];                                       // 8
    },                                                                                                               // 9
    contenteditable: "true"                                                                                          // 10
  }, "	\n", HTML.Raw("<pre>{\n\n}</pre>"), "\n	") ];                                                                 // 11
}));                                                                                                                 // 12
                                                                                                                     // 13
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/msavin:mongol/client/docInsert/docInsert.js                                                              //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
Template.Mongol_docInsert.events({                                                                                   // 1
  'click .Mongol_docMenu_insert': function () {                                                                      // 2
                                                                                                                     // 3
    var CollectionName = String(this),                                                                               // 4
      newDataID = "Mongol_" + String(this) + "_newEntry";                                                            // 5
    var newData = document.getElementById(newDataID).textContent;                                                    // 6
    var newObject = MongolPackage.parse(newData);                                                                    // 7
                                                                                                                     // 8
    if (newObject) {                                                                                                 // 9
      Meteor.call('Mongol_insert', CollectionName, newObject, function (error, result) {                             // 10
        if (!error) {                                                                                                // 11
          sessionKey = "Mongol_" + CollectionName;                                                                   // 12
          Session.set(sessionKey, 0);                                                                                // 13
        } else {                                                                                                     // 14
          MongolPackage.error("insert");                                                                             // 15
        }                                                                                                            // 16
      });                                                                                                            // 17
      // if successful, set the proper session                                                                       // 18
    }                                                                                                                // 19
                                                                                                                     // 20
  }                                                                                                                  // 21
});                                                                                                                  // 22
                                                                                                                     // 23
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/msavin:mongol/client/subscriptions/template.subscriptions.js                                             //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
                                                                                                                     // 1
Template.__checkName("Mongol_subscriptions");                                                                        // 2
Template["Mongol_subscriptions"] = new Template("Template.Mongol_subscriptions", (function() {                       // 3
  var view = this;                                                                                                   // 4
  return HTML.DIV({                                                                                                  // 5
    "class": function() {                                                                                            // 6
      return [ "Mongol_row ", Spacebars.mustache(view.lookup("active")) ];                                           // 7
    },                                                                                                               // 8
    id: "Mongol_subscriptions_618",                                                                                  // 9
    style: "white-space:normal;"                                                                                     // 10
  }, HTML.Raw('\n		\n        <div class="Mongol_toggle_selected_collection">\n			<!-- Name -->\n			Subscriptions\n        </div>\n\n		'), HTML.DIV({
    "class": "Mongol_contentView"                                                                                    // 12
  }, "\n		", HTML.DIV({                                                                                              // 13
    "class": "Mongol_docMenu",                                                                                       // 14
    style: "text-indent: 8px"                                                                                        // 15
  }, "\n			", Blaze.View(function() {                                                                                // 16
    return Spacebars.mustache(view.lookup("subType"));                                                               // 17
  }), "\n		"), "\n		", HTML.Raw("<!-- Document Viewer -->"), "\n		", HTML.DIV({                                      // 18
    "class": "Mongol_documentViewer "                                                                                // 19
  }, "\n			", Blaze.Each(function() {                                                                                // 20
    return Spacebars.call(view.lookup("subscription"));                                                              // 21
  }, function() {                                                                                                    // 22
    return [ "\n				", HTML.DIV({                                                                                    // 23
      "class": "Mongol_subscription"                                                                                 // 24
    }, "\n					", HTML.DIV({                                                                                         // 25
      "class": "Mongol_subscription_toggle"                                                                          // 26
    }, HTML.CharRef({                                                                                                // 27
      html: "&times;",                                                                                               // 28
      str: "×"                                                                                                       // 29
    })), "\n					", HTML.DIV({                                                                                       // 30
      "class": "Mongol_subscription_name"                                                                            // 31
    }, Blaze.View(function() {                                                                                       // 32
      return Spacebars.mustache(view.lookup("name"));                                                                // 33
    })), "\n					Params: ", Blaze.View(function() {                                                                  // 34
      return Spacebars.mustache(view.lookup("params"));                                                              // 35
    }), " \n				"), "\n			" ];                                                                                       // 36
  }, function() {                                                                                                    // 37
    return "\n				No subscriptions available\n			";                                                                  // 38
  }), "\n		"), "\n		", HTML.Raw("<!--  -->"), "\n	"), "\n		\n\n	");                                                  // 39
}));                                                                                                                 // 40
                                                                                                                     // 41
Template.__checkName("Mongol_subscriptionsx");                                                                       // 42
Template["Mongol_subscriptionsx"] = new Template("Template.Mongol_subscriptionsx", (function() {                     // 43
  var view = this;                                                                                                   // 44
  return HTML.Raw('<!-- Ssshh... this is supposed to be a surprise :) -->\n\n\n<!-- 	<div id="createNewSub">New Sub</div>\n\n	{{#each subscription}}\n		ID: {{this.id}}\n		Name: {{this.name}}<br>\n\n		{{#each subscriptionParams}}\n			Param: {{this}}<br>\n		{{/each}}\n		<div style="background: #cc0000; display: inline-block" class="Mongol_stop_subscription">\n			STOP\n		</div>\n		<hr>\n	{{/each}} -->');
}));                                                                                                                 // 46
                                                                                                                     // 47
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/msavin:mongol/client/subscriptions/subscriptions.js                                                      //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
// Check for subscripitons                                                                                           // 1
MongolPackage.setSubscriptionKeys();                                                                                 // 2
                                                                                                                     // 3
// Observe changes                                                                                                   // 4
if (!Object.observe) {                                                                                               // 5
                                                                                                                     // 6
  setInterval(function(){                                                                                            // 7
    MongolPackage.setSubscriptionKeys();                                                                             // 8
  }, 3000);                                                                                                          // 9
                                                                                                                     // 10
} else {                                                                                                             // 11
                                                                                                                     // 12
  Object.observe(Meteor.default_connection._subscriptions, function() {                                              // 13
    MongolPackage.setSubscriptionKeys();                                                                             // 14
  })                                                                                                                 // 15
                                                                                                                     // 16
}                                                                                                                    // 17
                                                                                                                     // 18
                                                                                                                     // 19
                                                                                                                     // 20
Template.Mongol_subscriptions.helpers({                                                                              // 21
  active: function () {                                                                                              // 22
    if (Session.equals("Mongol_currentCollection", "subscriptions_618")) {                                           // 23
      return "Mongol_row_expand";                                                                                    // 24
    }                                                                                                                // 25
  },                                                                                                                 // 26
  subscription: function () {                                                                                        // 27
                                                                                                                     // 28
    var subscriptionIDs = Session.get("Mongol_subscriptions")                                                        // 29
    return subscriptionIDs;                                                                                          // 30
                                                                                                                     // 31
  },                                                                                                                 // 32
  name: function () {                                                                                                // 33
    var subName = Meteor.default_connection._subscriptions[this].name;                                               // 34
    return subName;                                                                                                  // 35
  },                                                                                                                 // 36
  params: function () {                                                                                              // 37
    var p = Meteor.default_connection._subscriptions[this].params                                                    // 38
                                                                                                                     // 39
    if (p.length > 0) {                                                                                              // 40
      return p;                                                                                                      // 41
    } else {                                                                                                         // 42
      return "none";                                                                                                 // 43
    }                                                                                                                // 44
  },                                                                                                                 // 45
  subType: function () {                                                                                             // 46
                                                                                                                     // 47
    if (!Object.observe) {                                                                                           // 48
      return "Polling every 3 seconds"                                                                               // 49
    } else {                                                                                                         // 50
      return "Observing Changes";                                                                                    // 51
    }                                                                                                                // 52
                                                                                                                     // 53
  }                                                                                                                  // 54
});                                                                                                                  // 55
                                                                                                                     // 56
                                                                                                                     // 57
  Template.Mongol_subscriptions.events({                                                                             // 58
    'click .Mongol_row': function () {                                                                               // 59
      if (Session.equals("Mongol_currentCollection", "subscriptions_618")) {                                         // 60
        Session.set("Mongol_currentCollection", null);                                                               // 61
      } else {                                                                                                       // 62
        Session.set("Mongol_currentCollection", "subscriptions_618");                                                // 63
      }                                                                                                              // 64
    },                                                                                                               // 65
    'click .Mongol_subscription_toggle': function () {                                                               // 66
      Meteor.default_connection._subscriptions[this].stop()                                                          // 67
    },                                                                                                               // 68
    'click .Mongol_contentView': function(e, t) {                                                                    // 69
      e.stopPropagation();                                                                                           // 70
    }                                                                                                                // 71
  });                                                                                                                // 72
                                                                                                                     // 73
                                                                                                                     // 74
// Object for subscriptions                                                                                          // 75
// var subscriptions = Meteor.default_connection._subscriptions                                                      // 76
// Object.observe polyfill                                                                                           // 77
                                                                                                                     // 78
// Template.Mongol_subscriptions.helpers({                                                                           // 79
//  subscription: function () {                                                                                      // 80
//    var data = MongolSubData.get()                                                                                 // 81
//    return data;                                                                                                   // 82
//  },                                                                                                               // 83
//  subscriptionParams: function() {                                                                                 // 84
//    return this.params                                                                                             // 85
//  }                                                                                                                // 86
// });                                                                                                               // 87
                                                                                                                     // 88
// Template.Mongol_subscriptions.events({                                                                            // 89
//  'click .Mongol_stop_subscription': function () {                                                                 // 90
//    this.stop()                                                                                                    // 91
//  },                                                                                                               // 92
//  'click #createNewSub': function () {                                                                             // 93
                                                                                                                     // 94
//    var argument = false,                                                                                          // 95
//      stuff = [];                                                                                                  // 96
                                                                                                                     // 97
//    var askForArgument = function () {                                                                             // 98
//      argument = prompt("What is the name of your subscription?");                                                 // 99
//      addArgument(argument);                                                                                       // 100
//    }                                                                                                              // 101
                                                                                                                     // 102
//    var addArgument = function (argument) {                                                                        // 103
//      if (argument) {                                                                                              // 104
//        stuff.push(argument);                                                                                      // 105
//        askForArgument();                                                                                          // 106
//      } else {                                                                                                     // 107
//        Meteor.subscribe.apply(Meteor, stuff);                                                                     // 108
//      }                                                                                                            // 109
//    }                                                                                                              // 110
                                                                                                                     // 111
//    askForArgument();                                                                                              // 112
                                                                                                                     // 113
//  }                                                                                                                // 114
// });                                                                                                               // 115
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/msavin:mongol/client/Mongol/template.Mongol.js                                                           //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
                                                                                                                     // 1
Template.__checkName("Mongol");                                                                                      // 2
Template["Mongol"] = new Template("Template.Mongol", (function() {                                                   // 3
  var view = this;                                                                                                   // 4
  return Blaze.If(function() {                                                                                       // 5
    return Spacebars.call(view.lookup("Mongol_enabled"));                                                            // 6
  }, function() {                                                                                                    // 7
    return [ "\n		", HTML.DIV({                                                                                      // 8
      id: "Mongol",                                                                                                  // 9
      "class": function() {                                                                                          // 10
        return Spacebars.mustache(view.lookup("active"));                                                            // 11
      }                                                                                                              // 12
    }, "\n			", HTML.Comment(' <div class="Mongol_overlay"></div> '), "\n			", Spacebars.include(view.lookupTemplate("Mongol_header")), "\n			", Spacebars.include(view.lookupTemplate("Mongol_account")), "\n			", Spacebars.include(view.lookupTemplate("Mongol_subscriptions")), "\n			", Blaze.Each(function() {
      return Spacebars.call(view.lookup("Mongol_collections"));                                                      // 14
    }, function() {                                                                                                  // 15
      return [ "\n				", Spacebars.include(view.lookupTemplate("Mongol_collection")), "\n			" ];                     // 16
    }, function() {                                                                                                  // 17
      return [ "\n				", Spacebars.include(view.lookupTemplate("Mongol_empty")), "\n			" ];                          // 18
    }), "\n		"), "\n	" ];                                                                                            // 19
  });                                                                                                                // 20
}));                                                                                                                 // 21
                                                                                                                     // 22
Template.__checkName("Mongol_empty");                                                                                // 23
Template["Mongol_empty"] = new Template("Template.Mongol_empty", (function() {                                       // 24
  var view = this;                                                                                                   // 25
  return HTML.Raw('<div class="Mongol_empty">\n		No collections found. If you think this is an error, please report it on\n		<a href="https://github.com/msavin/Mongol" style="color: #cc0000">GitHub</a>.\n	</div>');
}));                                                                                                                 // 27
                                                                                                                     // 28
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/msavin:mongol/client/Mongol/Mongol.js                                                                    //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
Template.Mongol.helpers({                                                                                            // 1
  'Mongol_enabled': function () {                                                                                    // 2
    var MongolConfig = Session.get("Mongol_settings_display");                                                       // 3
    return MongolConfig;                                                                                             // 4
  },                                                                                                                 // 5
  Mongol_collections: function () {                                                                                  // 6
    var MongolConfig = Session.get("Mongol");                                                                        // 7
    return MongolConfig && _.without(MongolConfig.collections, null) || [];                                          // 8
  },                                                                                                                 // 9
  active: function () {                                                                                              // 10
    var MongolCollection = Session.get("Mongol_currentCollection");                                                  // 11
    if (MongolCollection) {                                                                                          // 12
      return ((Session.get("Mongol_fullscreen")) ? "Mongol_fullscreen " : "") + "Mongol_expand";                     // 13
    }                                                                                                                // 14
  }                                                                                                                  // 15
});                                                                                                                  // 16
                                                                                                                     // 17
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/msavin:mongol/client/Mongol/template.body.js                                                             //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
                                                                                                                     // 1
Template.body.addContent((function() {                                                                               // 2
  var view = this;                                                                                                   // 3
  return Spacebars.include(view.lookupTemplate("Mongol"));                                                           // 4
}));                                                                                                                 // 5
Meteor.startup(Template.body.renderToDocument);                                                                      // 6
                                                                                                                     // 7
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/msavin:mongol/client/Mongol/body.js                                                                      //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
//                                                                                                                   // 1
//  Re-Note: `rendered`, `created`, `destroyed` should not be used on body, window, or document.                     // 2
//  Essentially not on `unique` items which can have the values you just set overwritten by the                      // 3
//  next package that is loaded.                                                                                     // 4
//                                                                                                                   // 5
//  For a 'when ready' hook use 'Meteor.startup' called when the DOM is ready                                        // 6
//  http://docs.meteor.com/#/full/meteor_startup                                                                     // 7
//                                                                                                                   // 8
                                                                                                                     // 9
Meteor.startup(function(){                                                                                           // 10
                                                                                                                     // 11
  // Set Mongol to Display                                                                                           // 12
  // When User Clicks Controls + M                                                                                   // 13
                                                                                                                     // 14
  $(document).keydown(function (e) {                                                                                 // 15
    if (e.keyCode === 77 && e.ctrlKey) {                                                                             // 16
      MongolPackage.toggleDisplay();                                                                                 // 17
    }                                                                                                                // 18
    // if (e.keyCode === 70 && e.ctrlKey) {                                                                          // 19
      // MongolPackage.toggleFullScreen();	                                                                          // 20
    // }                                                                                                             // 21
  });                                                                                                                // 22
                                                                                                                     // 23
  // Educate about Mongol package                                                                                    // 24
                                                                                                                     // 25
  MongolPackage.startup();                                                                                           // 26
                                                                                                                     // 27
});                                                                                                                  // 28
                                                                                                                     // 29
// Below is a working alternative to Template.body.created                                                           // 30
// Past experience says that adding this package as a                                                                // 31
// dependency will make the following approach more robust                                                           // 32
// api.use('gwendall:body-events@0.1.4', 'client');                                                                  // 33
                                                                                                                     // 34
/*Blaze.body.events({                                                                                                // 35
  'keydown body' : function(e) {                                                                                     // 36
    if (e.keyCode === 77 && e.ctrlKey) {                                                                             // 37
     MongolPackage.toggleDisplay();                                                                                  // 38
  }                                                                                                                  // 39
  }                                                                                                                  // 40
});*/                                                                                                                // 41
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/msavin:mongol/client/docControls/template.docControls.js                                                 //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
                                                                                                                     // 1
Template.__checkName("Mongol_docControls");                                                                          // 2
Template["Mongol_docControls"] = new Template("Template.Mongol_docControls", (function() {                           // 3
  var view = this;                                                                                                   // 4
  return Blaze.If(function() {                                                                                       // 5
    return Spacebars.call(view.lookup("active"));                                                                    // 6
  }, function() {                                                                                                    // 7
    return [ "\n		\n		", HTML.DIV({                                                                                  // 8
      "class": function() {                                                                                          // 9
        return [ "Mongol_docMenu ", Spacebars.mustache(view.lookup("Mongol_docMenu_editing")) ];                     // 10
      }                                                                                                              // 11
    }, "\n			", Blaze.If(function() {                                                                                // 12
      return Spacebars.call(view.lookup("account"));                                                                 // 13
    }, function() {                                                                                                  // 14
      return [ "\n				", HTML.DIV({                                                                                  // 15
        "class": "Mongol_docBar1"                                                                                    // 16
      }, "\n					", Blaze.If(function() {                                                                            // 17
        return Spacebars.call(view.lookup("editing"));                                                               // 18
      }, function() {                                                                                                // 19
        return [ "\n						", HTML.DIV({                                                                              // 20
          "class": "Mongol_edit_title"                                                                               // 21
        }, "Update Document"), "\n						", HTML.DIV({                                                                // 22
          "class": "Mongol_edit_save"                                                                                // 23
        }, "Save"), "\n						", HTML.DIV({                                                                           // 24
          "class": "Mongol_edit_cancel"                                                                              // 25
        }, "Cancel"), "\n					" ];                                                                                   // 26
      }, function() {                                                                                                // 27
        return [ "	\n						\n                        ", HTML.Comment("For some reason, the method in place does not work for this\n                        Commenting out for now"), "\n                        ", HTML.DIV({
          "class": "Mongol_m_edit Mongol_m_updateAccount"                                                            // 29
        }, "Update"), "\n						\n						", HTML.Comment(" &nbsp;Currently Read-Only "), "\n						", HTML.DIV({        // 30
          "class": "Mongol_m_signout"                                                                                // 31
        }, "Sign Out"), "\n                        \n					" ];                                                       // 32
      }), "\n				"), "\n			" ];                                                                                      // 33
    }, function() {                                                                                                  // 34
      return [ "\n				", HTML.DIV({                                                                                  // 35
        "class": "Mongol_docBar1"                                                                                    // 36
      }, "\n					", Blaze.If(function() {                                                                            // 37
        return Spacebars.call(view.lookup("editing"));                                                               // 38
      }, function() {                                                                                                // 39
        return [ "\n						", HTML.DIV({                                                                              // 40
          "class": "Mongol_edit_title"                                                                               // 41
        }, "Update Document"), "\n						", HTML.DIV({                                                                // 42
          "class": "Mongol_edit_save"                                                                                // 43
        }, "Save"), "\n						", HTML.DIV({                                                                           // 44
          "class": "Mongol_edit_cancel"                                                                              // 45
        }, "Cancel"), "\n					" ];                                                                                   // 46
      }, function() {                                                                                                // 47
        return [ "\n						", HTML.DIV({                                                                              // 48
          "class": "Mongol_m_edit"                                                                                   // 49
        }, "Update"), "\n						", HTML.DIV({                                                                         // 50
          "class": "Mongol_m_new"                                                                                    // 51
        }, "Duplicate"), "\n						", HTML.DIV({                                                                      // 52
          "class": "Mongol_m_delete"                                                                                 // 53
        }, "Remove"), "\n						", HTML.DIV({                                                                         // 54
          "class": function() {                                                                                      // 55
            return [ Spacebars.mustache(view.lookup("disable_right")), " Mongol_m_right" ];                          // 56
          }                                                                                                          // 57
        }, HTML.CharRef({                                                                                            // 58
          html: "&rsaquo;",                                                                                          // 59
          str: "›"                                                                                                   // 60
        })), "\n						", HTML.DIV({                                                                                  // 61
          "class": function() {                                                                                      // 62
            return [ Spacebars.mustache(view.lookup("disable_left")), " Mongol_m_left" ];                            // 63
          }                                                                                                          // 64
        }, HTML.CharRef({                                                                                            // 65
          html: "&lsaquo;",                                                                                          // 66
          str: "‹"                                                                                                   // 67
        })), "\n					" ];                                                                                            // 68
      }), "\n				"), "\n			" ];                                                                                      // 69
    }), "	\n		"), "\n\n	" ];                                                                                         // 70
  }, function() {                                                                                                    // 71
    return [ "\n\n		", HTML.DIV({                                                                                    // 72
      "class": "Mongol_docMenu"                                                                                      // 73
    }, "\n			", HTML.DIV({                                                                                           // 74
      "class": "Mongol_docBar1"                                                                                      // 75
    }, "\n				", HTML.CharRef({                                                                                      // 76
      html: "&nbsp;",                                                                                                // 77
      str: " "                                                                                                       // 78
    }), "\n			"), "\n		"), "\n\n	" ];                                                                                // 79
  });                                                                                                                // 80
}));                                                                                                                 // 81
                                                                                                                     // 82
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/msavin:mongol/client/docControls/docControls.js                                                          //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
// Strip out functions in case documents have had methods added to them                                              // 1
                                                                                                                     // 2
Mongol.validateDocument = function (doc) {                                                                           // 3
  var validatedDoc = {};                                                                                             // 4
  _.each(doc, function (val, key) {                                                                                  // 5
    if (_.isFunction(val)) {                                                                                         // 6
      return;                                                                                                        // 7
    }                                                                                                                // 8
    validatedDoc[key] = val;                                                                                         // 9
  });                                                                                                                // 10
  return validatedDoc;                                                                                               // 11
}                                                                                                                    // 12
                                                                                                                     // 13
Mongol.inlineEditingTimer = null;                                                                                    // 14
                                                                                                                     // 15
Mongol.resetInlineEditingTimer = function() {                                                                        // 16
  if (Mongol.inlineEditingTimer) {                                                                                   // 17
	Meteor.clearTimeout(Mongol.inlineEditingTimer);                                                                     // 18
  }                                                                                                                  // 19
  Session.set('Mongol_noInlineEditing', true);                                                                       // 20
  Mongol.inlineEditingTimer = Meteor.setTimeout(function () {                                                        // 21
    Session.set('Mongol_noInlineEditing', false);                                                                    // 22
  },300);                                                                                                            // 23
}                                                                                                                    // 24
                                                                                                                     // 25
Template.Mongol_docControls.events({                                                                                 // 26
  'click .Mongol_m_new': function() {                                                                                // 27
                                                                                                                     // 28
    var CollectionName = Session.get("Mongol_currentCollection"),                                                    // 29
      DocumentPosition = Session.get("Mongol_" + String(this)),                                                      // 30
      CurrentCollection = Mongol.Collection(CollectionName).find().fetch(),                                          // 31
      CollectionCount = Mongol.Collection(CollectionName).find().count();                                            // 32
                                                                                                                     // 33
    var CurrentDocument = CurrentCollection[DocumentPosition],                                                       // 34
      DocumentID = CurrentDocument._id,                                                                              // 35
      sessionKey = "Mongol_" + String(this);                                                                         // 36
                                                                                                                     // 37
    var ValidatedCurrentDocument = Mongol.validateDocument(CurrentDocument);                                         // 38
                                                                                                                     // 39
    Meteor.call("Mongol_duplicate", CollectionName, ValidatedCurrentDocument._id, function(error, result) {          // 40
      if (!error) {                                                                                                  // 41
                                                                                                                     // 42
        if (Mongol.Collection(CollectionName).findOne(result)) {                                                     // 43
                                                                                                                     // 44
          // Get position of new document                                                                            // 45
          var list = Mongol.Collection(CollectionName).find().fetch();                                               // 46
          var docID = result;                                                                                        // 47
                                                                                                                     // 48
          docIndex = $.map(list, function(obj, index) {                                                              // 49
            if (obj._id == docID) {                                                                                  // 50
              return index;                                                                                          // 51
            }                                                                                                        // 52
          })                                                                                                         // 53
                                                                                                                     // 54
          Session.set(sessionKey, Number(docIndex));                                                                 // 55
        }                                                                                                            // 56
                                                                                                                     // 57
      } else {                                                                                                       // 58
        MongolPackage.error("duplicate");                                                                            // 59
      }                                                                                                              // 60
    });                                                                                                              // 61
                                                                                                                     // 62
                                                                                                                     // 63
                                                                                                                     // 64
  },                                                                                                                 // 65
  'click .Mongol_m_edit': function() {                                                                               // 66
    Session.set("Mongol_editMode", true);                                                                            // 67
  },                                                                                                                 // 68
  'click .Mongol_m_delete': function() {                                                                             // 69
                                                                                                                     // 70
    var CollectionName = Session.get("Mongol_currentCollection"),                                                    // 71
      sessionKey = "Mongol_" + String(this);                                                                         // 72
    DocumentPosition = Session.get(sessionKey),                                                                      // 73
      CurrentCollection = Mongol.Collection(CollectionName).find().fetch(),                                          // 74
      CollectionCount = Mongol.Collection(CollectionName).find().count();                                            // 75
                                                                                                                     // 76
    var CurrentDocument = CurrentCollection[DocumentPosition],                                                       // 77
      DocumentID = CurrentDocument._id;                                                                              // 78
                                                                                                                     // 79
                                                                                                                     // 80
                                                                                                                     // 81
    Meteor.call('Mongol_remove', CollectionName, DocumentID, function(error, result) {                               // 82
                                                                                                                     // 83
      if (!error) {                                                                                                  // 84
        // Log the action                                                                                            // 85
        console.log("Removed " + DocumentID + " from " + CollectionName + ". Back-up below:");                       // 86
        console.log(CurrentDocument);                                                                                // 87
                                                                                                                     // 88
        // Adjust the position                                                                                       // 89
        if (DocumentPosition >= CollectionCount - 1) {                                                               // 90
          newPosition = DocumentPosition - 1;                                                                        // 91
          Session.set(sessionKey, newPosition);                                                                      // 92
        }                                                                                                            // 93
                                                                                                                     // 94
        if (Session.get(sessionKey) === -1) {                                                                        // 95
          Session.set(sessionKey, 0);                                                                                // 96
        }                                                                                                            // 97
                                                                                                                     // 98
                                                                                                                     // 99
      } else {                                                                                                       // 100
        MongolPackage.error("remove");                                                                               // 101
      }                                                                                                              // 102
                                                                                                                     // 103
    });                                                                                                              // 104
                                                                                                                     // 105
                                                                                                                     // 106
                                                                                                                     // 107
  },                                                                                                                 // 108
  'click .Mongol_m_right': function() {                                                                              // 109
    // Verify that the button is not disabled                                                                        // 110
    if (!$('.Mongol_m_right').hasClass('Mongol_m_disabled')) {                                                       // 111
                                                                                                                     // 112
      // Disable inline editing for 0.3s for quick flick to next doc                                                 // 113
      Mongol.resetInlineEditingTimer();                                                                              // 114
	                                                                                                                    // 115
      // Grab the key                                                                                                // 116
      sessionKey = "Mongol_" + String(this);                                                                         // 117
                                                                                                                     // 118
      // Go forward one doc                                                                                          // 119
      var MongolDocNumber = Session.get(sessionKey) + 1;                                                             // 120
      Session.set(sessionKey, MongolDocNumber);                                                                      // 121
      // console.log("right" + this);                                                                                // 122
    }                                                                                                                // 123
  },                                                                                                                 // 124
  'click .Mongol_m_left': function() {                                                                               // 125
                                                                                                                     // 126
    // Verify that the button is not disabled                                                                        // 127
    if (!$('.Mongol_m_left').hasClass('Mongol_m_disabled')) {                                                        // 128
                                                                                                                     // 129
      // Disable inline editing for 0.3s for quick flick to next doc                                                 // 130
      Mongol.resetInlineEditingTimer();                                                                              // 131
                                                                                                                     // 132
      // Grab the key                                                                                                // 133
      sessionKey = "Mongol_" + String(this);                                                                         // 134
                                                                                                                     // 135
      // Go back one doc                                                                                             // 136
      var MongolDocNumber = Session.get(sessionKey) - 1;                                                             // 137
      Session.set(sessionKey, MongolDocNumber);                                                                      // 138
      // console.log("left" + this);                                                                                 // 139
    }                                                                                                                // 140
                                                                                                                     // 141
  },                                                                                                                 // 142
  'click .Mongol_edit_save': function() {                                                                            // 143
                                                                                                                     // 144
    // Get current document to get its current state                                                                 // 145
    // We need to send this to the server so we know which fields are up for change                                  // 146
    // when applying the diffing algorithm                                                                           // 147
                                                                                                                     // 148
    var collectionName = (Session.equals("Mongol_currentCollection", "account_618")) ? "users" : String(this);       // 149
                                                                                                                     // 150
    if (Session.equals("Mongol_currentCollection", "account_618")) {                                                 // 151
      var newData = MongolPackage.getDocumentUpdate("account_618");                                                  // 152
      var newObject = MongolPackage.parse(newData);                                                                  // 153
      var oldObject = Meteor.user();                                                                                 // 154
      // console.log(targetCollection);                                                                              // 155
      // console.log(newData);                                                                                       // 156
      // console.log(newObject);                                                                                     // 157
    } else {                                                                                                         // 158
      var sessionKey = "Mongol_" + collectionName;                                                                   // 159
      DocumentPosition = Session.get(sessionKey),                                                                    // 160
        CurrentCollection = Mongol.Collection(collectionName).find().fetch();                                        // 161
      var newData = MongolPackage.getDocumentUpdate(collectionName);                                                 // 162
      var newObject = MongolPackage.parse(newData);                                                                  // 163
      var oldObject = CurrentCollection[DocumentPosition];                                                           // 164
    }                                                                                                                // 165
                                                                                                                     // 166
    if (newObject) {                                                                                                 // 167
      Meteor.call("Mongol_update", collectionName, newObject, Mongol.validateDocument(oldObject), function(error, result) {
        if (!error) {                                                                                                // 169
          Session.set('Mongol_editMode', null);                                                                      // 170
          console.log('success')                                                                                     // 171
        } else {                                                                                                     // 172
          MongolPackage.error('update')                                                                              // 173
        }                                                                                                            // 174
      });                                                                                                            // 175
    }                                                                                                                // 176
  },                                                                                                                 // 177
  'click .Mongol_edit_cancel': function() {                                                                          // 178
    Session.set('Mongol_editMode', null);                                                                            // 179
  },                                                                                                                 // 180
  'click .Mongol_m_signout': function() {                                                                            // 181
    Meteor.logout();                                                                                                 // 182
  },                                                                                                                 // 183
});                                                                                                                  // 184
                                                                                                                     // 185
                                                                                                                     // 186
Template.Mongol_docControls.helpers({                                                                                // 187
  disable_right: function() {                                                                                        // 188
    var sessionKey = "Mongol_" + String(this);                                                                       // 189
    var CurrentDocument = Session.get(sessionKey);                                                                   // 190
    var collectionName = String(this);                                                                               // 191
    var collectionVar = Mongol.Collection(collectionName);                                                           // 192
                                                                                                                     // 193
    var collectionCount = collectionVar.find().count() - 1;                                                          // 194
                                                                                                                     // 195
    if (CurrentDocument === collectionCount) {                                                                       // 196
      return "Mongol_m_disabled";                                                                                    // 197
    }                                                                                                                // 198
                                                                                                                     // 199
  },                                                                                                                 // 200
  editing: function() {                                                                                              // 201
    var editing = Session.get('Mongol_editMode');                                                                    // 202
    return editing;                                                                                                  // 203
  },                                                                                                                 // 204
  editing_class: function() {                                                                                        // 205
    var edit = Session.get('Mongol_editMode');                                                                       // 206
    if (edit) {                                                                                                      // 207
      return "Mongol_m_wrapper_expand"                                                                               // 208
    }                                                                                                                // 209
  },                                                                                                                 // 210
  disable_left: function() {                                                                                         // 211
    var sessionKey = "Mongol_" + String(this);                                                                       // 212
    var CurrentDocument = Session.get(sessionKey);                                                                   // 213
                                                                                                                     // 214
    if (CurrentDocument <= 0) {                                                                                      // 215
      return "Mongol_m_disabled";                                                                                    // 216
    }                                                                                                                // 217
                                                                                                                     // 218
  },                                                                                                                 // 219
  Mongol_docMenu_editing: function() {                                                                               // 220
    var editMode = Session.get("Mongol_editMode");                                                                   // 221
                                                                                                                     // 222
    if (editMode) {                                                                                                  // 223
      return "Mongol_docMenu_editing";                                                                               // 224
    }                                                                                                                // 225
                                                                                                                     // 226
  },                                                                                                                 // 227
  active: function() {                                                                                               // 228
                                                                                                                     // 229
    var current = Session.get("Mongol_currentCollection");                                                           // 230
                                                                                                                     // 231
    // return true if collection name matches                                                                        // 232
    if (current === String(this)) {                                                                                  // 233
      return true;                                                                                                   // 234
    }                                                                                                                // 235
                                                                                                                     // 236
    // return true if it's a user account                                                                            // 237
    if (current === "account_618") {                                                                                 // 238
      return true;                                                                                                   // 239
    }                                                                                                                // 240
                                                                                                                     // 241
  },                                                                                                                 // 242
  account: function() {                                                                                              // 243
                                                                                                                     // 244
    var currentCollection = Session.get("Mongol_currentCollection");                                                 // 245
    if (currentCollection === "account_618") {                                                                       // 246
      return true                                                                                                    // 247
    } else {                                                                                                         // 248
      return false                                                                                                   // 249
    }                                                                                                                // 250
  },                                                                                                                 // 251
                                                                                                                     // 252
});                                                                                                                  // 253
                                                                                                                     // 254
// Will possibly be used in augmented document udpate UI                                                             // 255
/*Template.Mongol_docViewer.events({                                                                                 // 256
'click .Mongol_string' : function (evt,tmpl) {                                                                       // 257
var field = $(evt.target).prevAll(".Mongol_key:first").text().slice(1,-2);                                           // 258
Session.set('Mongol_inlineEdit',true);                                                                               // 259
Tracker.flush();                                                                                                     // 260
// Do something to trigger the editable text element                                                                 // 261
}                                                                                                                    // 262
});*/                                                                                                                // 263
                                                                                                                     // 264
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/msavin:mongol/client/defaults/defaults.js                                                                //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
Meteor.startup(function() {                                                                                          // 1
  // If the user hasn't done a Session.set('Mongol',{ ... });                                                        // 2
  // set some default values                                                                                         // 3
  if (Session.get('Mongol') === undefined) {                                                                         // 4
                                                                                                                     // 5
    // Build a default config object                                                                                 // 6
  // Build a default config object                                                                                   // 7
                                                                                                                     // 8
    var collections = _.map(Mongo.Collection.getAll(), function (collection) {                                       // 9
                                                                                                                     // 10
      // Note this returns the actual mongo collection name, not Meteor's Mongo.Collection name                      // 11
      return collection.name;                                                                                        // 12
                                                                                                                     // 13
    });                                                                                                              // 14
                                                                                                                     // 15
    var defaults = {                                                                                                 // 16
      'collections': collections,                                                                                    // 17
    };                                                                                                               // 18
                                                                                                                     // 19
    Session.set("Mongol", defaults);                                                                                 // 20
                                                                                                                     // 21
  } else {                                                                                                           // 22
                                                                                                                     // 23
    // Do nothing                                                                                                    // 24
                                                                                                                     // 25
  }                                                                                                                  // 26
                                                                                                                     // 27
});                                                                                                                  // 28
                                                                                                                     // 29
                                                                                                                     // 30
// Give devs an api for hiding some collections, since they're all matched by default                                // 31
                                                                                                                     // 32
Mongol.hideCollection = function (collectionName) {                                                                  // 33
                                                                                                                     // 34
  var MongolConfig = Session.get("Mongol") || {},                                                                    // 35
    collections = MongolConfig.collections || {};                                                                    // 36
                                                                                                                     // 37
  collections = _.without(collections, collectionName);                                                              // 38
                                                                                                                     // 39
  MongolConfig.collections = collections;                                                                            // 40
                                                                                                                     // 41
  Session.set("Mongol", MongolConfig);                                                                               // 42
                                                                                                                     // 43
};                                                                                                                   // 44
                                                                                                                     // 45
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['msavin:mongol'] = {
  Mongol: Mongol
};

})();
