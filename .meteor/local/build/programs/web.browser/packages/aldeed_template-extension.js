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
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var $ = Package.jquery.$;
var jQuery = Package.jquery.jQuery;
var _ = Package.underscore._;
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;
var HTML = Package.htmljs.HTML;

(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/aldeed:template-extension/template-extension.js                                                         //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
var hookTypes = ["created", "rendered", "destroyed"];                                                               // 1
var globalHooks = {created: [], rendered: [], destroyed: []};                                                       // 2
var templateHooks = {created: {}, rendered: {}, destroyed: {}};                                                     // 3
                                                                                                                    // 4
// Setup for multiple hooks support                                                                                 // 5
// We assume that no other code will be directly defining                                                           // 6
// a hook once the client has started.                                                                              // 7
Meteor.startup(function () {                                                                                        // 8
  Template.forEach(function (template) {                                                                            // 9
    //For each hookType, define the hooks for this template                                                         // 10
    _.each(hookTypes, function (type) {                                                                             // 11
      defineHook(template, type);                                                                                   // 12
    });                                                                                                             // 13
  });                                                                                                               // 14
});                                                                                                                 // 15
                                                                                                                    // 16
Template.forEach = function (callback) {                                                                            // 17
  // for some reason we get the "body" template twice when looping, so                                              // 18
  // we track that and only call the callback once.                                                                 // 19
  var alreadyDidBody = false;                                                                                       // 20
  for (var t in Template) {                                                                                         // 21
    if (Template.hasOwnProperty(t)) {                                                                               // 22
      var tmpl = Template[t];                                                                                       // 23
      if (Blaze.isTemplate(tmpl)) {                                                                                 // 24
        if (tmpl.viewName === "body") {                                                                             // 25
          if (!alreadyDidBody) {                                                                                    // 26
            alreadyDidBody = true;                                                                                  // 27
            callback(tmpl);                                                                                         // 28
          }                                                                                                         // 29
        } else {                                                                                                    // 30
          callback(tmpl);                                                                                           // 31
        }                                                                                                           // 32
      }                                                                                                             // 33
    }                                                                                                               // 34
  }                                                                                                                 // 35
};                                                                                                                  // 36
                                                                                                                    // 37
Template.onCreated = function (callback) {                                                                          // 38
  globalHooks.created.push(callback);                                                                               // 39
};                                                                                                                  // 40
                                                                                                                    // 41
Template.onRendered = function (callback) {                                                                         // 42
  globalHooks.rendered.push(callback);                                                                              // 43
};                                                                                                                  // 44
                                                                                                                    // 45
Template.onDestroyed = function (callback) {                                                                        // 46
  globalHooks.destroyed.push(callback);                                                                             // 47
};                                                                                                                  // 48
                                                                                                                    // 49
Template.prototype.hooks = function (hooks) {                                                                       // 50
  var self = this;                                                                                                  // 51
                                                                                                                    // 52
  if (typeof hooks !== "object") {                                                                                  // 53
    throw new Error("hooks argument must be an object with created, rendered, and/or destroyed properties, each set to a function");
  }                                                                                                                 // 55
                                                                                                                    // 56
  var name = parseName(self.viewName);                                                                              // 57
                                                                                                                    // 58
  // Store a reference to the hooks so they can be called by our own                                                // 59
  // already defined callbacks                                                                                      // 60
  var i, type;                                                                                                      // 61
  for (i = hookTypes.length - 1; i >= 0; i--) {                                                                     // 62
    type = hookTypes[i];                                                                                            // 63
    if (typeof hooks[type] === "function") {                                                                        // 64
      templateHooks[type][name] = templateHooks[type][name] || [];                                                  // 65
      templateHooks[type][name].push(hooks[type]);                                                                  // 66
    }                                                                                                               // 67
  }                                                                                                                 // 68
};                                                                                                                  // 69
                                                                                                                    // 70
Template.prototype.replaces = function (replacedTemplateName) {                                                     // 71
  var self = this;                                                                                                  // 72
  var name = parseName(self.viewName);                                                                              // 73
                                                                                                                    // 74
  var replaceRender = function (templateName) {                                                                     // 75
    var replacedTemplate = Template[templateName];                                                                  // 76
                                                                                                                    // 77
    if (!replacedTemplate) {                                                                                        // 78
      console.warn("Can't replace template " + templateName + " because it hasn't been defined yet.");              // 79
      return;                                                                                                       // 80
    }                                                                                                               // 81
                                                                                                                    // 82
    replacedTemplate.renderFunction = Template[name].renderFunction;                                                // 83
  };                                                                                                                // 84
                                                                                                                    // 85
  // Allow this method to be called with an array or a string                                                       // 86
  if (_.isArray(replacedTemplateName)) {                                                                            // 87
    // If called with array, iterate over the template names                                                        // 88
    _.each(replacedTemplateName, function (templateName) {                                                          // 89
      replaceRender(templateName);                                                                                  // 90
    });                                                                                                             // 91
  } else {                                                                                                          // 92
    replaceRender(replacedTemplateName);                                                                            // 93
  }                                                                                                                 // 94
};                                                                                                                  // 95
                                                                                                                    // 96
Template.prototype.inheritsHelpersFrom = function (otherTemplateName) {                                             // 97
  var self = this;                                                                                                  // 98
  var name = parseName(self.viewName);                                                                              // 99
  var thisTemplate = Template[name];                                                                                // 100
                                                                                                                    // 101
  var inheritHelpers = function (templateName) {                                                                    // 102
    var otherTemplate = Template[templateName];                                                                     // 103
    if (!otherTemplate) {                                                                                           // 104
      console.warn("Can't inherit helpers from template " + templateName + " because it hasn't been defined yet."); // 105
      return;                                                                                                       // 106
    }                                                                                                               // 107
                                                                                                                    // 108
    if (otherTemplate.__helpers) {                                                                                  // 109
      thisTemplate.__helpers = $.extend({}, thisTemplate.__helpers, otherTemplate.__helpers);                       // 110
    }                                                                                                               // 111
                                                                                                                    // 112
    else {                                                                                                          // 113
      // backwards compatibility; pre-0.9.4 Meteor                                                                  // 114
      for (var h in otherTemplate) {                                                                                // 115
        if (otherTemplate.hasOwnProperty(h) && (h.slice(0, 2) !== "__") && h !== "viewName" && h !== "renderFunction") {
          thisTemplate[h] = otherTemplate[h];                                                                       // 117
        }                                                                                                           // 118
      }                                                                                                             // 119
    }                                                                                                               // 120
  };                                                                                                                // 121
                                                                                                                    // 122
  //Accept an array as otherTemplateName argument                                                                   // 123
  if (_.isArray(otherTemplateName)) {                                                                               // 124
    _.each(otherTemplateName, function (name) {                                                                     // 125
      inheritHelpers(name);                                                                                         // 126
    });                                                                                                             // 127
  } else { //otherTemplateName is a string                                                                          // 128
    inheritHelpers(otherTemplateName);                                                                              // 129
  }                                                                                                                 // 130
};                                                                                                                  // 131
                                                                                                                    // 132
Template.prototype.inheritsEventsFrom = function (otherTemplateName) {                                              // 133
  var self = this;                                                                                                  // 134
                                                                                                                    // 135
  var name = parseName(self.viewName);                                                                              // 136
                                                                                                                    // 137
  var inheritEvents = function (templateName) {                                                                     // 138
    // Check for existence of templateName template                                                                 // 139
    var otherTemplate = Template[templateName];                                                                     // 140
    if (!otherTemplate) {                                                                                           // 141
      console.warn("Can't inherit events from template " + templateName + " because it hasn't been defined yet.");  // 142
      return;                                                                                                       // 143
    }                                                                                                               // 144
    // Inherit events                                                                                               // 145
    _.each(otherTemplate.__eventMaps, function (event) {                                                            // 146
      Template[name].__eventMaps.push(event);                                                                       // 147
    });                                                                                                             // 148
  };                                                                                                                // 149
                                                                                                                    // 150
  //Accept an array as otherTemplateName argument                                                                   // 151
  if (_.isArray(otherTemplateName)) {                                                                               // 152
    _.each(otherTemplateName, function (name) {                                                                     // 153
      inheritEvents(name);                                                                                          // 154
    });                                                                                                             // 155
  } else { //otherTemplateName is a string                                                                          // 156
    inheritEvents(otherTemplateName);                                                                               // 157
  }                                                                                                                 // 158
};                                                                                                                  // 159
                                                                                                                    // 160
Template.prototype.inheritsHooksFrom = function (otherTemplateName) {                                               // 161
  var self = this;                                                                                                  // 162
  var name = parseName(self.viewName);                                                                              // 163
                                                                                                                    // 164
  var inheritHooks = function(templateName) {                                                                       // 165
    // Check for existence of templateName template                                                                 // 166
    var otherTemplate = Template[templateName];                                                                     // 167
    if (!otherTemplate) {                                                                                           // 168
      console.warn("Can't inherit hooks from template " + templateName + " because it hasn't been defined yet.");   // 169
      return;                                                                                                       // 170
    }                                                                                                               // 171
    // For each hookType check if there are existing templateHooks for templateName                                 // 172
    _.each(hookTypes, function (type) {                                                                             // 173
      var hooks = templateHooks[type][templateName];                                                                // 174
      // For each existing hook for templateName                                                                    // 175
      _.each(hooks, function (hook) {                                                                               // 176
        // Initialize the target template's templateHooks array                                                     // 177
        templateHooks[type][name] = templateHooks[type][name] || [];                                                // 178
        // Add hook                                                                                                 // 179
        templateHooks[type][name].push(hook);                                                                       // 180
      });                                                                                                           // 181
    });                                                                                                             // 182
  };                                                                                                                // 183
                                                                                                                    // 184
  //Accept an array as otherTemplateName argument                                                                   // 185
  if (_.isArray(otherTemplateName)) {                                                                               // 186
    _.each(otherTemplateName, function (name) {                                                                     // 187
      inheritHooks(name);                                                                                           // 188
    });                                                                                                             // 189
  } else { //otherTemplateName is a string                                                                          // 190
    inheritHooks(otherTemplateName);                                                                                // 191
  }                                                                                                                 // 192
};                                                                                                                  // 193
                                                                                                                    // 194
Template.prototype.copyAs = function (newTemplateName) {                                                            // 195
  var self = this, result = [];                                                                                     // 196
                                                                                                                    // 197
  var createNewTemplate = function (templateName) {                                                                 // 198
    var newTemplate =                                                                                               // 199
    Template[templateName] = new Template('Template.' + templateName, self.renderFunction);                         // 200
                                                                                                                    // 201
    // Run this new template through defineHook, to manage hooks like                                               // 202
    // all other new templates                                                                                      // 203
    _.each(hookTypes, function (type) {                                                                             // 204
      defineHook(newTemplate, type);                                                                                // 205
    });                                                                                                             // 206
                                                                                                                    // 207
    var name = parseName(self.viewName);                                                                            // 208
    newTemplate.inheritsHelpersFrom(name);                                                                          // 209
    newTemplate.inheritsEventsFrom(name);                                                                           // 210
    newTemplate.inheritsHooksFrom(name);                                                                            // 211
                                                                                                                    // 212
    return newTemplate;                                                                                             // 213
  };                                                                                                                // 214
                                                                                                                    // 215
  //Check if newTemplateName is an array                                                                            // 216
  if (_.isArray(newTemplateName)) {                                                                                 // 217
    _.each(newTemplateName, function (name) {                                                                       // 218
      var template = createNewTemplate(name);                                                                       // 219
      //Push newly created template into array that we'll return                                                    // 220
      result.push(template);                                                                                        // 221
    });                                                                                                             // 222
    return result;                                                                                                  // 223
  } else { //newTemplateName is a string                                                                            // 224
    var template = createNewTemplate(newTemplateName);                                                              // 225
    //return newly created array                                                                                    // 226
    return template;                                                                                                // 227
  }                                                                                                                 // 228
};                                                                                                                  // 229
                                                                                                                    // 230
// Allow easy access to a template instance field when you do not know exactly                                      // 231
// on which instance (this, or parent, or parent's parent, ...) a field is defined.                                 // 232
// This allows easy restructuring of templates in HTML, moving things to included                                   // 233
// templates without having to change everywhere in the code instance levels.                                       // 234
// It also allows different structures of templates, when once template is included                                 // 235
// at one level, and some other time at another. Levels do not matter anymore, just                                 // 236
// that the field exists somewhere.                                                                                 // 237
Blaze.TemplateInstance.prototype.get = function (fieldName) {                                                       // 238
  var template = this;                                                                                              // 239
                                                                                                                    // 240
  while (template) {                                                                                                // 241
    if (fieldName in template) {                                                                                    // 242
      return template[fieldName];                                                                                   // 243
    }                                                                                                               // 244
    template = template.parent(1, true);                                                                            // 245
  }                                                                                                                 // 246
};                                                                                                                  // 247
                                                                                                                    // 248
// Access parent template instance. "height" is the number of levels beyond the                                     // 249
// current template instance to look. By default block helper template instances                                    // 250
// are skipped, but if "includeBlockHelpers" is set to true, they are not.                                          // 251
// See https://github.com/meteor/meteor/issues/3071                                                                 // 252
Blaze.TemplateInstance.prototype.parent = function(height, includeBlockHelpers) {                                   // 253
  // If height is null or undefined, we default to 1, the first parent.                                             // 254
  if (height == null) {                                                                                             // 255
    height = 1;                                                                                                     // 256
  }                                                                                                                 // 257
                                                                                                                    // 258
  var i = 0;                                                                                                        // 259
  var template = this;                                                                                              // 260
  while (i < height && template) {                                                                                  // 261
    var view = parentView(template.view, includeBlockHelpers);                                                      // 262
    // We skip contentBlock views which are injected by Meteor when using                                           // 263
    // block helpers (in addition to block helper view). This matches more                                          // 264
    // the visual structure of templates and not the internal implementation.                                       // 265
    while (view && (!view.template || view.name === '(contentBlock)')) {                                            // 266
      view = parentView(view, includeBlockHelpers);                                                                 // 267
    }                                                                                                               // 268
    if (!view) {                                                                                                    // 269
      return null;                                                                                                  // 270
    }                                                                                                               // 271
    // Body view has template field, but not templateInstance,                                                      // 272
    // which more or less signals that we reached the top.                                                          // 273
    template = typeof view.templateInstance === 'function' ? view.templateInstance() : null;                        // 274
    i++;                                                                                                            // 275
  }                                                                                                                 // 276
  return template;                                                                                                  // 277
};                                                                                                                  // 278
                                                                                                                    // 279
// Allow to specify a function to test parent data for at various                                                   // 280
// levels, instead of specifying a fixed number of levels to traverse.                                              // 281
var originalParentData = Blaze._parentData;                                                                         // 282
Blaze._parentData = function (height, _functionWrapped) {                                                           // 283
  // If height is not a function, simply call original implementation.                                              // 284
  if (typeof height !== 'function') {                                                                               // 285
    return originalParentData(height, _functionWrapped);                                                            // 286
  }                                                                                                                 // 287
                                                                                                                    // 288
  var theWith = Blaze.getView('with');                                                                              // 289
  var test = function () {                                                                                          // 290
    return height(theWith.dataVar.get());                                                                           // 291
  };                                                                                                                // 292
  while (theWith) {                                                                                                 // 293
    if (Tracker.nonreactive(test)) break;                                                                           // 294
    theWith = Blaze.getView(theWith, 'with');                                                                       // 295
  }                                                                                                                 // 296
                                                                                                                    // 297
  // _functionWrapped is internal and will not be                                                                   // 298
  // specified with non numeric height, so we ignore it.                                                            // 299
  if (!theWith) return null;                                                                                        // 300
  // This registers a Tracker dependency.                                                                           // 301
  return theWith.dataVar.get();                                                                                     // 302
};                                                                                                                  // 303
                                                                                                                    // 304
Template.parentData = Blaze._parentData;                                                                            // 305
                                                                                                                    // 306
/* PRIVATE */                                                                                                       // 307
                                                                                                                    // 308
function defineHook(template, type) {                                                                               // 309
  // see if there's an existing callback set directly on the template instance                                      // 310
  var orig = template[type];                                                                                        // 311
                                                                                                                    // 312
  // Basically scraping callbacks set directly on instance and saving                                               // 313
  // in templateHooks                                                                                               // 314
  if (typeof orig === 'function') {                                                                                 // 315
    var name = parseName(template.viewName);                                                                        // 316
    templateHooks[type][name] = templateHooks[type][name] || [];                                                    // 317
    templateHooks[type][name].push(orig);                                                                           // 318
  }                                                                                                                 // 319
                                                                                                                    // 320
  // set our own callback directly on the template instance                                                         // 321
  template[type] = function () {                                                                                    // 322
    //console.log(type, orig);                                                                                      // 323
    // call all defined global hooks                                                                                // 324
    runGlobalHooks(type, this, arguments);                                                                          // 325
    // call all defined hooks for this template instance                                                            // 326
    runTemplateHooks(type, this, arguments);                                                                        // 327
  };                                                                                                                // 328
};                                                                                                                  // 329
                                                                                                                    // 330
function parentView(view, includeBlockHelpers) {                                                                    // 331
  if (includeBlockHelpers) {                                                                                        // 332
    return view.originalParentView || view.parentView;                                                              // 333
  }                                                                                                                 // 334
  else {                                                                                                            // 335
    return view.parentView;                                                                                         // 336
  }                                                                                                                 // 337
}                                                                                                                   // 338
                                                                                                                    // 339
function parseName(name) {                                                                                          // 340
  if (!name) {                                                                                                      // 341
    return                                                                                                          // 342
  }                                                                                                                 // 343
  // post 0.9.1 kludge to get template name from viewName                                                           // 344
  var prefix = 'Template.';                                                                                         // 345
  if (name.indexOf(prefix) === 0) {                                                                                 // 346
    return name.slice(prefix.length);                                                                               // 347
  }                                                                                                                 // 348
  return name;                                                                                                      // 349
}                                                                                                                   // 350
                                                                                                                    // 351
function runGlobalHooks(type, template, args) {                                                                     // 352
  var i, h = globalHooks[type], hl = h.length;                                                                      // 353
  for (i = 0; i < hl; i++) {                                                                                        // 354
    h[i].apply(template, args);                                                                                     // 355
  }                                                                                                                 // 356
}                                                                                                                   // 357
                                                                                                                    // 358
function runTemplateHooks(type, template, args) {                                                                   // 359
  var i, name = parseName(template.viewName) || parseName(template.view.name), h = templateHooks[type][name];       // 360
  var hl = h ? h.length : 0;                                                                                        // 361
  for (i = 0; i < hl; i++) {                                                                                        // 362
    h[i].apply(template, args);                                                                                     // 363
  }                                                                                                                 // 364
}                                                                                                                   // 365
                                                                                                                    // 366
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['aldeed:template-extension'] = {};

})();
