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
var Spacebars = Package.spacebars.Spacebars;
var _ = Package.underscore._;
var $ = Package.jquery.$;
var jQuery = Package.jquery.jQuery;
var ReactiveVar = Package['reactive-var'].ReactiveVar;
var HTML = Package.htmljs.HTML;

/* Package-scope variables */
var EditableJSON, EditableJSONInternal;

(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/babrahams:editable-json/editable-json-common.js                                                         //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
Meteor.methods({                                                                                                    // 1
                                                                                                                    // 2
  update: function (collectionName, _id, action) {                                                                  // 3
                                                                                                                    // 4
    var Collection = Mongo.Collection.get(collectionName);                                                          // 5
                                                                                                                    // 6
	try {                                                                                                              // 7
	                                                                                                                   // 8
	  if (!!Package['aldeed:simple-schema'] && !!Package['aldeed:collection2'] && _.isFunction(Collection.simpleSchema)) {
		                                                                                                                  // 10
		Collection.update(_id, action, {                                                                                  // 11
		  filter: false,                                                                                                  // 12
		  autoConvert: false,                                                                                             // 13
		  removeEmptyStrings: false,                                                                                      // 14
		  validate: false                                                                                                 // 15
		});                                                                                                               // 16
		                                                                                                                  // 17
		return;                                                                                                           // 18
	                                                                                                                   // 19
	  }                                                                                                                // 20
	                                                                                                                   // 21
	  Collection.update(_id, action);                                                                                  // 22
	                                                                                                                   // 23
	}                                                                                                                  // 24
	                                                                                                                   // 25
	catch (err) {                                                                                                      // 26
	  throw new Meteor.Error(err);	                                                                                    // 27
	}                                                                                                                  // 28
                                                                                                                    // 29
  }                                                                                                                 // 30
                                                                                                                    // 31
});                                                                                                                 // 32
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/babrahams:editable-json/template.editable-json.js                                                       //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
                                                                                                                    // 1
Template.__checkName("editableJSON");                                                                               // 2
Template["editableJSON"] = new Template("Template.editableJSON", (function() {                                      // 3
  var view = this;                                                                                                  // 4
  return Spacebars.With(function() {                                                                                // 5
    return Spacebars.call(view.lookup("json"));                                                                     // 6
  }, function() {                                                                                                   // 7
    return HTML.DIV({                                                                                               // 8
      "class": "editable-JSON"                                                                                      // 9
    }, Spacebars.include(view.lookupTemplate("editable_JSON_object")));                                             // 10
  });                                                                                                               // 11
}));                                                                                                                // 12
                                                                                                                    // 13
Template.__checkName("editable_JSON");                                                                              // 14
Template["editable_JSON"] = new Template("Template.editable_JSON", (function() {                                    // 15
  var view = this;                                                                                                  // 16
  return Blaze.Each(function() {                                                                                    // 17
    return Spacebars.call(view.lookup("fields"));                                                                   // 18
  }, function() {                                                                                                   // 19
    return [ Spacebars.With(function() {                                                                            // 20
      return Spacebars.call(view.lookup("field"));                                                                  // 21
    }, function() {                                                                                                 // 22
      return [ HTML.SPAN({                                                                                          // 23
        "class": function() {                                                                                       // 24
          return [ "editable-JSON-field ", Spacebars.mustache(view.lookup("_idClass")) ];                           // 25
        }                                                                                                           // 26
      }, '"', Spacebars.With(function() {                                                                           // 27
        return Spacebars.call(view.lookup("editingField"));                                                         // 28
      }, function() {                                                                                               // 29
        return HTML.INPUT({                                                                                         // 30
          type: "text",                                                                                             // 31
          value: function() {                                                                                       // 32
            return Spacebars.mustache(view.lookup("."));                                                            // 33
          }                                                                                                         // 34
        });                                                                                                         // 35
      }, function() {                                                                                               // 36
        return HTML.SPAN({                                                                                          // 37
          "class": "editable-JSON-field-text"                                                                       // 38
        }, Blaze.View(function() {                                                                                  // 39
          return Spacebars.mustache(view.lookup("."));                                                              // 40
        }));                                                                                                        // 41
      }), '":'), HTML.CharRef({                                                                                     // 42
        html: "&nbsp;",                                                                                             // 43
        str: " "                                                                                                    // 44
      }) ];                                                                                                         // 45
    }), Spacebars.With(function() {                                                                                 // 46
      return Spacebars.call(view.lookup("value"));                                                                  // 47
    }, function() {                                                                                                 // 48
      return Blaze.If(function() {                                                                                  // 49
        return Spacebars.call(view.lookup("isArray"));                                                              // 50
      }, function() {                                                                                               // 51
        return Blaze._TemplateWith(function() {                                                                     // 52
          return Spacebars.call(view.lookup("val"));                                                                // 53
        }, function() {                                                                                             // 54
          return Spacebars.include(view.lookupTemplate("editable_JSON_array"));                                     // 55
        });                                                                                                         // 56
      }, function() {                                                                                               // 57
        return Blaze.If(function() {                                                                                // 58
          return Spacebars.call(view.lookup("isDate"));                                                             // 59
        }, function() {                                                                                             // 60
          return Blaze._TemplateWith(function() {                                                                   // 61
            return Spacebars.call(view.lookup("val"));                                                              // 62
          }, function() {                                                                                           // 63
            return Spacebars.include(view.lookupTemplate("editable_JSON_date"));                                    // 64
          });                                                                                                       // 65
        }, function() {                                                                                             // 66
          return Blaze.If(function() {                                                                              // 67
            return Spacebars.call(view.lookup("isString"));                                                         // 68
          }, function() {                                                                                           // 69
            return Blaze._TemplateWith(function() {                                                                 // 70
              return Spacebars.call(view.lookup("val"));                                                            // 71
            }, function() {                                                                                         // 72
              return Spacebars.include(view.lookupTemplate("editable_JSON_string"));                                // 73
            });                                                                                                     // 74
          }, function() {                                                                                           // 75
            return Blaze.If(function() {                                                                            // 76
              return Spacebars.call(view.lookup("isBoolean"));                                                      // 77
            }, function() {                                                                                         // 78
              return Blaze._TemplateWith(function() {                                                               // 79
                return Spacebars.call(view.lookup("val"));                                                          // 80
              }, function() {                                                                                       // 81
                return Spacebars.include(view.lookupTemplate("editable_JSON_boolean"));                             // 82
              });                                                                                                   // 83
            }, function() {                                                                                         // 84
              return Blaze.If(function() {                                                                          // 85
                return Spacebars.call(view.lookup("isObject"));                                                     // 86
              }, function() {                                                                                       // 87
                return Blaze._TemplateWith(function() {                                                             // 88
                  return Spacebars.call(view.lookup("val"));                                                        // 89
                }, function() {                                                                                     // 90
                  return Spacebars.include(view.lookupTemplate("editable_JSON_object"));                            // 91
                });                                                                                                 // 92
              }, function() {                                                                                       // 93
                return Blaze.If(function() {                                                                        // 94
                  return Spacebars.call(view.lookup("isNumber"));                                                   // 95
                }, function() {                                                                                     // 96
                  return Blaze._TemplateWith(function() {                                                           // 97
                    return Spacebars.call(view.lookup("val"));                                                      // 98
                  }, function() {                                                                                   // 99
                    return Spacebars.include(view.lookupTemplate("editable_JSON_number"));                          // 100
                  });                                                                                               // 101
                }, function() {                                                                                     // 102
                  return Blaze.If(function() {                                                                      // 103
                    return Spacebars.call(view.lookup("isNull"));                                                   // 104
                  }, function() {                                                                                   // 105
                    return Blaze._TemplateWith(function() {                                                         // 106
                      return Spacebars.call(view.lookup("val"));                                                    // 107
                    }, function() {                                                                                 // 108
                      return Spacebars.include(view.lookupTemplate("editable_JSON_null"));                          // 109
                    });                                                                                             // 110
                  });                                                                                               // 111
                });                                                                                                 // 112
              });                                                                                                   // 113
            });                                                                                                     // 114
          });                                                                                                       // 115
        });                                                                                                         // 116
      });                                                                                                           // 117
    }), Blaze.Unless(function() {                                                                                   // 118
      return Spacebars.dataMustache(view.lookup("last"), view.lookup(".."));                                        // 119
    }, function() {                                                                                                 // 120
      return [ ",", HTML.BR() ];                                                                                    // 121
    }) ];                                                                                                           // 122
  });                                                                                                               // 123
}));                                                                                                                // 124
                                                                                                                    // 125
Template.__checkName("editable_JSON_array");                                                                        // 126
Template["editable_JSON_array"] = new Template("Template.editable_JSON_array", (function() {                        // 127
  var view = this;                                                                                                  // 128
  return [ "[", Spacebars.With(function() {                                                                         // 129
    return Spacebars.call(view.lookup("elements"));                                                                 // 130
  }, function() {                                                                                                   // 131
    return HTML.DIV({                                                                                               // 132
      "class": "editable-JSON-indent"                                                                               // 133
    }, Blaze.Each(function() {                                                                                      // 134
      return Spacebars.call(view.lookup("."));                                                                      // 135
    }, function() {                                                                                                 // 136
      return [ Blaze._TemplateWith(function() {                                                                     // 137
        return Spacebars.call(view.lookup("element"));                                                              // 138
      }, function() {                                                                                               // 139
        return Spacebars.include(view.lookupTemplate("editable_JSON"));                                             // 140
      }), Blaze.Unless(function() {                                                                                 // 141
        return Spacebars.dataMustache(view.lookup("last"), view.lookup(".."));                                      // 142
      }, function() {                                                                                               // 143
        return [ ",", HTML.BR() ];                                                                                  // 144
      }) ];                                                                                                         // 145
    }));                                                                                                            // 146
  }), "]" ];                                                                                                        // 147
}));                                                                                                                // 148
                                                                                                                    // 149
Template.__checkName("editable_JSON_object");                                                                       // 150
Template["editable_JSON_object"] = new Template("Template.editable_JSON_object", (function() {                      // 151
  var view = this;                                                                                                  // 152
  return Blaze.If(function() {                                                                                      // 153
    return Spacebars.call(view.lookup("notEmpty"));                                                                 // 154
  }, function() {                                                                                                   // 155
    return [ "{", HTML.DIV({                                                                                        // 156
      "class": "editable-JSON-indent"                                                                               // 157
    }, Blaze._TemplateWith(function() {                                                                             // 158
      return Spacebars.call(view.lookup("."));                                                                      // 159
    }, function() {                                                                                                 // 160
      return Spacebars.include(view.lookupTemplate("editable_JSON"));                                               // 161
    })), "}" ];                                                                                                     // 162
  }, function() {                                                                                                   // 163
    return "{}";                                                                                                    // 164
  });                                                                                                               // 165
}));                                                                                                                // 166
                                                                                                                    // 167
Template.__checkName("editable_JSON_string");                                                                       // 168
Template["editable_JSON_string"] = new Template("Template.editable_JSON_string", (function() {                      // 169
  var view = this;                                                                                                  // 170
  return HTML.SPAN({                                                                                                // 171
    "class": function() {                                                                                           // 172
      return [ "editable-JSON-string ", Blaze.If(function() {                                                       // 173
        return Spacebars.call(view.lookup("_idField"));                                                             // 174
      }, function() {                                                                                               // 175
        return "editable-JSON-_id-value";                                                                           // 176
      }) ];                                                                                                         // 177
    }                                                                                                               // 178
  }, '"', Blaze.If(function() {                                                                                     // 179
    return Spacebars.call(view.lookup("editable_JSON_collection"));                                                 // 180
  }, function() {                                                                                                   // 181
    return Spacebars.With(function() {                                                                              // 182
      return Spacebars.call(view.lookup("editable_JSON_getField"));                                                 // 183
    }, function() {                                                                                                 // 184
      return Blaze._TemplateWith(function() {                                                                       // 185
        return {                                                                                                    // 186
          value: Spacebars.call(view.lookup("..")),                                                                 // 187
          field: Spacebars.call(view.lookup(".")),                                                                  // 188
          collection: Spacebars.call(view.lookup("editable_JSON_collection"))                                       // 189
        };                                                                                                          // 190
      }, function() {                                                                                               // 191
        return Spacebars.include(view.lookupTemplate("editableJSONInput"));                                         // 192
      });                                                                                                           // 193
    }, function() {                                                                                                 // 194
      return Blaze.View(function() {                                                                                // 195
        return Spacebars.mustache(view.lookup("."));                                                                // 196
      });                                                                                                           // 197
    });                                                                                                             // 198
  }, function() {                                                                                                   // 199
    return Blaze.If(function() {                                                                                    // 200
      return Spacebars.call(view.lookup("_idField"));                                                               // 201
    }, function() {                                                                                                 // 202
      return Blaze.View(function() {                                                                                // 203
        return Spacebars.mustache(view.lookup("."));                                                                // 204
      });                                                                                                           // 205
    }, function() {                                                                                                 // 206
      return Blaze._TemplateWith(function() {                                                                       // 207
        return {                                                                                                    // 208
          value: Spacebars.call(view.lookup(".")),                                                                  // 209
          field: Spacebars.call(view.lookup("editable_JSON_getField"))                                              // 210
        };                                                                                                          // 211
      }, function() {                                                                                               // 212
        return Spacebars.include(view.lookupTemplate("editableJSONInput"));                                         // 213
      });                                                                                                           // 214
    });                                                                                                             // 215
  }), '"');                                                                                                         // 216
}));                                                                                                                // 217
                                                                                                                    // 218
Template.__checkName("editable_JSON_boolean");                                                                      // 219
Template["editable_JSON_boolean"] = new Template("Template.editable_JSON_boolean", (function() {                    // 220
  var view = this;                                                                                                  // 221
  return HTML.SPAN({                                                                                                // 222
    "class": "editable-JSON-boolean"                                                                                // 223
  }, Blaze.View(function() {                                                                                        // 224
    return Spacebars.mustache(view.lookup("boolean"));                                                              // 225
  }));                                                                                                              // 226
}));                                                                                                                // 227
                                                                                                                    // 228
Template.__checkName("editable_JSON_date");                                                                         // 229
Template["editable_JSON_date"] = new Template("Template.editable_JSON_date", (function() {                          // 230
  var view = this;                                                                                                  // 231
  return HTML.SPAN({                                                                                                // 232
    "class": "editable-JSON-date"                                                                                   // 233
  }, HTML.SPAN({                                                                                                    // 234
    "class": "editable-JSON-string"                                                                                 // 235
  }, '"', HTML.INPUT({                                                                                              // 236
    type: "text",                                                                                                   // 237
    value: function() {                                                                                             // 238
      return Spacebars.mustache(view.lookup("date"));                                                               // 239
    }                                                                                                               // 240
  }), '"'));                                                                                                        // 241
}));                                                                                                                // 242
                                                                                                                    // 243
Template.__checkName("editable_JSON_number");                                                                       // 244
Template["editable_JSON_number"] = new Template("Template.editable_JSON_number", (function() {                      // 245
  var view = this;                                                                                                  // 246
  return HTML.SPAN({                                                                                                // 247
    "class": "editable-JSON-number editable-text-trigger"                                                           // 248
  }, Blaze.If(function() {                                                                                          // 249
    return Spacebars.call(view.lookup("editable_JSON_collection"));                                                 // 250
  }, function() {                                                                                                   // 251
    return Spacebars.With(function() {                                                                              // 252
      return Spacebars.call(view.lookup("editable_JSON_getField"));                                                 // 253
    }, function() {                                                                                                 // 254
      return Blaze._TemplateWith(function() {                                                                       // 255
        return {                                                                                                    // 256
          value: Spacebars.call(view.lookup("..")),                                                                 // 257
          field: Spacebars.call(view.lookup(".")),                                                                  // 258
          collection: Spacebars.call(view.lookup("editable_JSON_collection")),                                      // 259
          number: Spacebars.call(true)                                                                              // 260
        };                                                                                                          // 261
      }, function() {                                                                                               // 262
        return Spacebars.include(view.lookupTemplate("editableJSONInput"));                                         // 263
      });                                                                                                           // 264
    }, function() {                                                                                                 // 265
      return Blaze.View(function() {                                                                                // 266
        return Spacebars.mustache(view.lookup("."));                                                                // 267
      });                                                                                                           // 268
    });                                                                                                             // 269
  }, function() {                                                                                                   // 270
    return Blaze._TemplateWith(function() {                                                                         // 271
      return {                                                                                                      // 272
        value: Spacebars.call(view.lookup(".")),                                                                    // 273
        field: Spacebars.call(view.lookup("editable_JSON_getField")),                                               // 274
        number: Spacebars.call(true)                                                                                // 275
      };                                                                                                            // 276
    }, function() {                                                                                                 // 277
      return Spacebars.include(view.lookupTemplate("editableJSONInput"));                                           // 278
    });                                                                                                             // 279
  }));                                                                                                              // 280
}));                                                                                                                // 281
                                                                                                                    // 282
Template.__checkName("editable_JSON_null");                                                                         // 283
Template["editable_JSON_null"] = new Template("Template.editable_JSON_null", (function() {                          // 284
  var view = this;                                                                                                  // 285
  return HTML.Raw('<span class="editable-JSON-null">null</span>');                                                  // 286
}));                                                                                                                // 287
                                                                                                                    // 288
Template.__checkName("editableJSONInput");                                                                          // 289
Template["editableJSONInput"] = new Template("Template.editableJSONInput", (function() {                            // 290
  var view = this;                                                                                                  // 291
  return Blaze.If(function() {                                                                                      // 292
    return Spacebars.call(view.lookup("editing"));                                                                  // 293
  }, function() {                                                                                                   // 294
    return HTML.INPUT({                                                                                             // 295
      type: "text",                                                                                                 // 296
      "class": "editable-JSON-input",                                                                               // 297
      value: function() {                                                                                           // 298
        return Spacebars.mustache(view.lookup("value"));                                                            // 299
      }                                                                                                             // 300
    });                                                                                                             // 301
  }, function() {                                                                                                   // 302
    return HTML.SPAN({                                                                                              // 303
      "class": "editable-JSON-edit"                                                                                 // 304
    }, Blaze.View(function() {                                                                                      // 305
      return Spacebars.mustache(view.lookup("value"));                                                              // 306
    }));                                                                                                            // 307
  });                                                                                                               // 308
}));                                                                                                                // 309
                                                                                                                    // 310
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/babrahams:editable-json/editable-json-client.js                                                         //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
EditableJSON = {};                                                                                                  // 1
EditableJSONInternal = {};                                                                                          // 2
                                                                                                                    // 3
EditableJSONInternal.timer = null;                                                                                  // 4
                                                                                                                    // 5
EditableJSONInternal.resize = function(elem) {                                                                      // 6
  var el = $(elem);                                                                                                 // 7
  EditableJSONInternal.editing_key_press.fakeEl.text(el.val());                                                     // 8
  var width = EditableJSONInternal.editing_key_press.fakeEl.width() + 8;                                            // 9
  el.width(width);                                                                                                  // 10
  el.css('min-width',width);	                                                                                       // 11
}                                                                                                                   // 12
                                                                                                                    // 13
EditableJSONInternal.editing_key_press = function(elem,noDelay) {                                                   // 14
  if (EditableJSONInternal.editing_key_press.fakeEl === undefined) {                                                // 15
    EditableJSONInternal.editing_key_press.fakeEl = $('<span class="editable-JSON-input">').hide().appendTo(document.body);
  }                                                                                                                 // 17
  if (noDelay) {                                                                                                    // 18
    var input = elem.find('input');                                                                                 // 19
    EditableJSONInternal.resize(input);                                                                             // 20
	input.select();                                                                                                    // 21
  }                                                                                                                 // 22
  else {                                                                                                            // 23
    Meteor.defer(function() {                                                                                       // 24
      EditableJSONInternal.resize(elem);                                                                            // 25
    });                                                                                                             // 26
  }                                                                                                                 // 27
}                                                                                                                   // 28
                                                                                                                    // 29
EditableJSONInternal.getContext = function() {                                                                      // 30
  var jsonTemplateData = Template && Template.parentData(function (data) { return _.isObject(data) && data.document; });
  var data = jsonTemplateData && jsonTemplateData.document;                                                         // 32
  return data || {};                                                                                                // 33
}                                                                                                                   // 34
                                                                                                                    // 35
EditableJSONInternal.getField = function() {                                                                        // 36
  var field = Blaze._parentData(1).fld;                                                                             // 37
  return (field !== '_id') && field;                                                                                // 38
}                                                                                                                   // 39
                                                                                                                    // 40
EditableJSONInternal.update = function(tmpl,modifier,action) {                                                      // 41
  var collectionName = tmpl.get('collection');                                                                      // 42
  if (!action) {                                                                                                    // 43
    var action = {};                                                                                                // 44
    var mod = {};                                                                                                   // 45
    mod[modifier.field] = modifier.value;                                                                           // 46
    action[modifier.action] = mod;                                                                                  // 47
  }                                                                                                                 // 48
  if (collectionName) {                                                                                             // 49
    // Validate -- make sure the change isn't on the id field                                                       // 50
	// And make sure we're not modifying the same field twice                                                          // 51
    var okay = true;                                                                                                // 52
	var conflict = false;                                                                                              // 53
	var modFields = [];                                                                                                // 54
    _.each(action, function(modifier,action) {                                                                      // 55
      if (modifier._id) {                                                                                           // 56
        okay = false;                                                                                               // 57
      }                                                                                                             // 58
	  var field = _.keys(modifier)[0];                                                                                 // 59
	  if (!_.contains(modFields,field)) {                                                                              // 60
		// The following prevents all errors, but is too restrictive                                                      // 61
		// && !_.find(modFields,function(f){ return field.indexOf(f) !== -1; })                                           // 62
        modFields.push(field);                                                                                      // 63
	  }                                                                                                                // 64
	  else {                                                                                                           // 65
		conflict = true;                                                                                                  // 66
	  }                                                                                                                // 67
    });                                                                                                             // 68
    if (!okay) {                                                                                                    // 69
      console.log("You can't change the _id field.");                                                               // 70
      return;                                                                                                       // 71
    }                                                                                                               // 72
	if (conflict) {                                                                                                    // 73
	  console.log("You can't use conflicting modifiers.");                                                             // 74
	  return;	                                                                                                         // 75
	}                                                                                                                  // 76
    var doc = EditableJSONInternal.getContext();                                                                    // 77
    // Mongo.Collection.get(collectionName).update({_id:doc._id},action);                                           // 78
    Meteor.call('update', collectionName, doc._id, action, function(err,res) {                                      // 79
	  if (err) {                                                                                                       // 80
		// Making a big assumption here                                                                                   // 81
        console.log("You can't use conflicting modifiers.");                                                        // 82
	  }                                                                                                                // 83
	});                                                                                                                // 84
  }                                                                                                                 // 85
  else {                                                                                                            // 86
    _.each(action, function(modifier,action) {                                                                      // 87
      var fieldName = _.keys(modifier)[0];                                                                          // 88
      var value = modifier[fieldName];                                                                              // 89
      switch (action) {                                                                                             // 90
        case '$set' :                                                                                               // 91
          Session.setJSON('editableJSON' + EditableJSONInternal.store(tmpl.get('store')) + '.' + fieldName, value); // 92
          break;                                                                                                    // 93
        case '$unset' :                                                                                             // 94
          Session.setJSON('editableJSON' + EditableJSONInternal.store(tmpl.get('store')) + '.' + fieldName, undefined);
          break;                                                                                                    // 96
      }                                                                                                             // 97
    });                                                                                                             // 98
  }                                                                                                                 // 99
}                                                                                                                   // 100
                                                                                                                    // 101
EditableJSONInternal.saveToSession = function(evt,tmpl,self,noDelay) {                                              // 102
  var elem = tmpl.$(evt.target);                                                                                    // 103
  var val = elem.val();                                                                                             // 104
  if (self.number && !/^\d+$/.test(val)) {                                                                          // 105
	// If it's not a number, just revert the value and return                                                          // 106
	elem.val(self.value);                                                                                              // 107
	return;                                                                                                            // 108
  }                                                                                                                 // 109
  var field = 'editableJSON' + EditableJSONInternal.store(tmpl.get('store')) + '.' + self.field;                    // 110
  var value = (self.number) ? parseInt(val) : val;                                                                  // 111
  if (noDelay) {                                                                                                    // 112
	Session.setJSON(field, value);                                                                                     // 113
  }                                                                                                                 // 114
  else {                                                                                                            // 115
	if (!self.collection) {                                                                                            // 116
	  if (EditableJSONInternal.timer) {                                                                                // 117
		Meteor.clearTimeout(EditableJSONInternal.timer);                                                                  // 118
	  }                                                                                                                // 119
	  EditableJSONInternal.timer = Meteor.setTimeout(function() {                                                      // 120
		Session.setJSON(field, value);                                                                                    // 121
	  },300);                                                                                                          // 122
	}                                                                                                                  // 123
  }                                                                                                                 // 124
}                                                                                                                   // 125
                                                                                                                    // 126
EditableJSONInternal.store = function(storeName) {                                                                  // 127
  return (storeName) ? '.' + storeName : '';                                                                        // 128
}                                                                                                                   // 129
                                                                                                                    // 130
EditableJSON.retrieve = function(storeName) {                                                                       // 131
  return Session.getJSON('editableJSON' + EditableJSONInternal.store(storeName));                                   // 132
}                                                                                                                   // 133
                                                                                                                    // 134
Template.editableJSON.created = function() {                                                                        // 135
  var self = this;                                                                                                  // 136
  self.editingField = new ReactiveVar();                                                                            // 137
  if (self.data && self.data.collection) {                                                                          // 138
    self.autorun(function() {                                                                                       // 139
      var Collection = Mongo.Collection.get(self.data.collection);                                                  // 140
      var doc = Collection.find().count() && self.data.document; // Collection.find().count() is the reactivity trigger
      self.collection = self.data.collection;                                                                       // 142
      self.document = doc;                                                                                          // 143
    });                                                                                                             // 144
    return;                                                                                                         // 145
  }                                                                                                                 // 146
  else if (self.data && self.data.store) {                                                                          // 147
    self.store = self.data.store;                                                                                   // 148
  }                                                                                                                 // 149
  var initialValue = ((self.store) ? self.parent().data : self.data) || {};                                         // 150
  Session.setJSON('editableJSON' + EditableJSONInternal.store(self.store), initialValue);                           // 151
  // To keep the state of which field name is being edited                                                          // 152
}                                                                                                                   // 153
                                                                                                                    // 154
Template.editableJSON.helpers({                                                                                     // 155
  json: function() {                                                                                                // 156
    if (this.collection && this.document) {                                                                         // 157
      return this.document;                                                                                         // 158
    }                                                                                                               // 159
    if (this.json) {                                                                                                // 160
      var currentData = Session.getJSON('editableJSON' + EditableJSONInternal.store(this.store));                   // 161
      if (!currentData || _.isEmpty(currentData)) {                                                                 // 162
        Session.setJSON('editableJSON' + EditableJSONInternal.store(this.store),this.json);                         // 163
      }                                                                                                             // 164
    }                                                                                                               // 165
    return Session.getJSON('editableJSON' + EditableJSONInternal.store(this.store));                                // 166
  }                                                                                                                 // 167
});                                                                                                                 // 168
                                                                                                                    // 169
Template.editable_JSON.helpers({                                                                                    // 170
  fields: function() {                                                                                              // 171
    var self = this;                                                                                                // 172
    var index = -1;                                                                                                 // 173
    // console.log("Object:",self);                                                                                 // 174
    if (_.has(self,'____val')) {                                                                                    // 175
      index = self.arrIndex - 1;                                                                                    // 176
      delete self.arrIndex;                                                                                         // 177
    }                                                                                                               // 178
    var fields = _.map(self,function(value,field) {                                                                 // 179
      index++;                                                                                                      // 180
      var parent = null;                                                                                            // 181
      var number = 2;                                                                                               // 182
      while (Blaze._parentData(number) && Blaze._parentData(number)._id === undefined && Blaze._parentData(number).fld === undefined) {
        number++;                                                                                                   // 184
      }                                                                                                             // 185
      parent = Blaze._parentData(number);                                                                           // 186
      var currentField = (field !== '____val') ? field : index;                                                     // 187
      var fld = (parent && parent.fld) ? parent.fld + ((currentField !== undefined) ? '.' + currentField : '') : currentField;
      return {                                                                                                      // 189
        field:(field !== '____val') ? currentField : null,                                                          // 190
        value:{val:value,fld:fld,field:currentField},                                                               // 191
        index:index                                                                                                 // 192
      };                                                                                                            // 193
    });                                                                                                             // 194
    return fields;                                                                                                  // 195
  },                                                                                                                // 196
  value: function() {                                                                                               // 197
    return (_.isObject(this.value) && _.has(this.value,'____val')) ? this.value.____val : this.value;               // 198
  },                                                                                                                // 199
  isArray: function() {                                                                                             // 200
    return _.isArray(this.val);                                                                                     // 201
  },                                                                                                                // 202
  isObject: function() {                                                                                            // 203
    return _.isObject(this.val);                                                                                    // 204
  },                                                                                                                // 205
  isString: function() {                                                                                            // 206
    return _.isString(this.val);                                                                                    // 207
  },                                                                                                                // 208
  isBoolean: function() {                                                                                           // 209
    return _.isBoolean(this.val);                                                                                   // 210
  },                                                                                                                // 211
  isDate: function() {                                                                                              // 212
    return _.isDate(this.val);                                                                                      // 213
  },                                                                                                                // 214
  isNumber: function() {                                                                                            // 215
    return _.isNumber(this.val);                                                                                    // 216
  },                                                                                                                // 217
  isNull : function() {                                                                                             // 218
	return _.isNull(this.val);                                                                                         // 219
  },                                                                                                                // 220
  last: function(obj) {                                                                                             // 221
    return (obj.____val !== undefined) || _.size(obj) === (this.index + 1);                                         // 222
  },                                                                                                                // 223
  editingField : function() {                                                                                       // 224
    var fieldName = this.toString()                                                                                 // 225
    var fldData = Template.parentData(function (data) { return data && data.fld; });                                // 226
    var fld = fldData && (fldData.fld + '.' + fieldName) || fieldName;                                              // 227
    var template = Blaze._templateInstance();                                                                       // 228
    var editingField = template.get('editingField');                                                                // 229
    return editingField && (editingField.get() === fld) && fieldName;                                               // 230
  },                                                                                                                // 231
  _idClass: function() {                                                                                            // 232
    return (String(this) === "_id") ? "editable-JSON-_id-field" : "";                                               // 233
  }                                                                                                                 // 234
});                                                                                                                 // 235
                                                                                                                    // 236
Template.editable_JSON.events({                                                                                     // 237
  'click .editable-JSON-field' : function(evt,tmpl) {                                                               // 238
    tmpl.$(evt.target).find('.editable-JSON-field-text').trigger('click');                                          // 239
  },                                                                                                                // 240
  'click .editable-JSON-field-text' : function(evt,tmpl) {                                                          // 241
    evt.stopPropagation();                                                                                          // 242
    var fieldName = this.toString();                                                                                // 243
    if (fieldName === '_id') {                                                                                      // 244
      return;                                                                                                       // 245
    }                                                                                                               // 246
    var elem = $(evt.target).closest('.editable-JSON-field');                                                       // 247
    var fldData = Template.parentData(function (data) { return data && data.fld; });                                // 248
    var field = fldData && (fldData.fld + '.' + fieldName) || fieldName;                                            // 249
    var editingField = tmpl.get('editingField');                                                                    // 250
    if (editingField) {                                                                                             // 251
      editingField.set(field);                                                                                      // 252
      Tracker.flush();                                                                                              // 253
      EditableJSONInternal.editing_key_press(elem,true);                                                            // 254
    }                                                                                                               // 255
  },                                                                                                                // 256
  'keydown .editable-JSON-field input, focusout .editable-JSON-field input' : function(evt,tmpl) {                  // 257
    evt.stopPropagation();                                                                                          // 258
    var charCode = evt.which || evt.keyCode;                                                                        // 259
    if (evt.type === 'keydown') {                                                                                   // 260
      if (charCode === 27) {                                                                                        // 261
        var editingField = tmpl.get('editingField');                                                                // 262
        editingField.set(null);                                                                                     // 263
        return;                                                                                                     // 264
      }                                                                                                             // 265
      if (charCode !== 13) {                                                                                        // 266
        EditableJSONInternal.editing_key_press($(evt.target));                                                      // 267
        return;                                                                                                     // 268
      }                                                                                                             // 269
    }                                                                                                               // 270
    var editingField = tmpl.get('editingField');                                                                    // 271
    var currentFieldName = editingField.get();                                                                      // 272
    var parentFieldName = _.initial(currentFieldName.split('.'));                                                   // 273
    var editedFieldName = $(evt.currentTarget).val();                                                               // 274
    var rejoinedParentFieldName = parentFieldName.join('.');                                                        // 275
    var newFieldName = ((rejoinedParentFieldName) ? rejoinedParentFieldName + '.' : '') + editedFieldName;          // 276
    if (newFieldName !== currentFieldName) {                                                                        // 277
      var modifier1 = {};                                                                                           // 278
      modifier1[currentFieldName] = 1;                                                                              // 279
      var action = {                                                                                                // 280
        "$unset" : modifier1                                                                                        // 281
      };                                                                                                            // 282
      if (editedFieldName) {                                                                                        // 283
        var modifier2 = {};                                                                                         // 284
        modifier2[newFieldName] = tmpl.data[this.toString()];                                                       // 285
        action["$set"] = modifier2                                                                                  // 286
      }                                                                                                             // 287
      EditableJSONInternal.update(tmpl,null,action);                                                                // 288
    }                                                                                                               // 289
    editingField.set(null);                                                                                         // 290
  }                                                                                                                 // 291
});                                                                                                                 // 292
                                                                                                                    // 293
Template.editable_JSON_object.helpers({                                                                             // 294
  notEmpty: function() {                                                                                            // 295
    return !_.isEmpty(this);                                                                                        // 296
  }                                                                                                                 // 297
});                                                                                                                 // 298
                                                                                                                    // 299
Template.editable_JSON_array.helpers({                                                                              // 300
  elements: function() {                                                                                            // 301
  var elements = _.map(this,function(value,index) {                                                                 // 302
    return {element:{____val:value,arrIndex:index},index:index};                                                    // 303
  });                                                                                                               // 304
    return elements;                                                                                                // 305
  },                                                                                                                // 306
  last: function(arr) {                                                                                             // 307
    return arr.length === (this.index + 1);                                                                         // 308
  }                                                                                                                 // 309
});                                                                                                                 // 310
                                                                                                                    // 311
Template.editable_JSON_string.helpers({                                                                             // 312
  _idField: function() {                                                                                            // 313
    var parentData = Template.parentData(1);                                                                        // 314
    return parentData && parentData.fld && parentData.fld === '_id';                                                // 315
  }                                                                                                                 // 316
});                                                                                                                 // 317
                                                                                                                    // 318
Template.editable_JSON_string.events({                                                                              // 319
  'click .editable-JSON-string' : function(evt,tmpl) {                                                              // 320
    tmpl.$(evt.target).find('.editable-JSON-edit').trigger('click');                                                // 321
  }                                                                                                                 // 322
});                                                                                                                 // 323
                                                                                                                    // 324
Template.editable_JSON_number.events({                                                                              // 325
  'click .editable-JSON-number' : function(evt,tmpl) {                                                              // 326
    tmpl.$(evt.target).find('.editable-JSON-edit').trigger('click');                                                // 327
  }                                                                                                                 // 328
});                                                                                                                 // 329
                                                                                                                    // 330
/*Template.editable_JSON_date.rendered = function() {                                                               // 331
  var self = this;                                                                                                  // 332
  var field = this.$('input')[0];                                                                                   // 333
  var picker = new Pikaday({                                                                                        // 334
    field: field,                                                                                                   // 335
    onSelect: function(date) {                                                                                      // 336
      field.value = picker.toString();                                                                              // 337
    }                                                                                                               // 338
  });                                                                                                               // 339
}*/                                                                                                                 // 340
                                                                                                                    // 341
Template.editable_JSON_date.helpers({                                                                               // 342
  date: function() {                                                                                                // 343
    return this.toISOString();                                                                                      // 344
  }                                                                                                                 // 345
});                                                                                                                 // 346
                                                                                                                    // 347
Template.editable_JSON_date.events({                                                                                // 348
  'change input' : function(evt,tmpl) {                                                                             // 349
     var currentDate = new Date(this);                                                                              // 350
     var newDate = new Date(tmpl.$('input').val());                                                                 // 351
     if (currentDate.getTime() !== newDate.getTime()) {                                                             // 352
       var modifier = {                                                                                             // 353
         field: EditableJSONInternal.getField(),                                                                    // 354
         value: newDate,                                                                                            // 355
         action: "$set"                                                                                             // 356
       }                                                                                                            // 357
       EditableJSONInternal.update(tmpl,modifier);                                                                  // 358
    }                                                                                                               // 359
  }                                                                                                                 // 360
});                                                                                                                 // 361
                                                                                                                    // 362
Template.editable_JSON_boolean.helpers({                                                                            // 363
  boolean: function() {                                                                                             // 364
    return (this.valueOf() == true) ? 'true' : 'false';                                                             // 365
  }                                                                                                                 // 366
});                                                                                                                 // 367
                                                                                                                    // 368
Template.editable_JSON_boolean.events({                                                                             // 369
  'click .editable-JSON-boolean' : function(evt,tmpl) {                                                             // 370
    var modifier = {                                                                                                // 371
      field: EditableJSONInternal.getField(),                                                                       // 372
      value: !this.valueOf(),                                                                                       // 373
      action: "$set"                                                                                                // 374
    };                                                                                                              // 375
    EditableJSONInternal.update(tmpl,modifier);                                                                     // 376
  }                                                                                                                 // 377
});                                                                                                                 // 378
                                                                                                                    // 379
Blaze.registerHelper('editable_JSON_getField', function() {                                                         // 380
  return EditableJSONInternal.getField();                                                                           // 381
});                                                                                                                 // 382
                                                                                                                    // 383
Blaze.registerHelper('editable_JSON_getContext', function() {                                                       // 384
  return EditableJSONInternal.getContext();                                                                         // 385
});                                                                                                                 // 386
                                                                                                                    // 387
Blaze.registerHelper('editable_JSON_collection', function() {                                                       // 388
  var template = Blaze._templateInstance();                                                                         // 389
  var collection = template.get('collection');                                                                      // 390
  return collection;                                                                                                // 391
});                                                                                                                 // 392
                                                                                                                    // 393
Template.editableJSONInput.created = function() {                                                                   // 394
  this.editing = new ReactiveVar(false);                                                                            // 395
}                                                                                                                   // 396
                                                                                                                    // 397
Template.editableJSONInput.helpers({                                                                                // 398
  editing: function() {                                                                                             // 399
    return Blaze._templateInstance().editing.get();                                                                 // 400
  }                                                                                                                 // 401
});                                                                                                                 // 402
                                                                                                                    // 403
Template.editableJSONInput.events({                                                                                 // 404
  'click .editable-JSON-edit' : function(evt,tmpl) {                                                                // 405
    evt.stopPropagation();                                                                                          // 406
    if (String(this) === '_id') {                                                                                   // 407
      return;                                                                                                       // 408
    }                                                                                                               // 409
    var parent = $(evt.target).parent();                                                                            // 410
    tmpl.editing.set(true);                                                                                         // 411
    Tracker.flush();                                                                                                // 412
    EditableJSONInternal.editing_key_press(parent,true);                                                            // 413
  },                                                                                                                // 414
  'input input' : function(evt,tmpl) {                                                                              // 415
    EditableJSONInternal.saveToSession(evt,tmpl,this);                                                              // 416
  },                                                                                                                // 417
  'keydown input' : function(evt,tmpl) {                                                                            // 418
	var charCode = evt.which || evt.keyCode;                                                                           // 419
	if (charCode === 27) {                                                                                             // 420
	  tmpl.editing.set(false);                                                                                         // 421
	}                                                                                                                  // 422
	if (charCode !== 13) {                                                                                             // 423
	  EditableJSONInternal.editing_key_press($(evt.target));                                                           // 424
	}                                                                                                                  // 425
  },                                                                                                                // 426
  'keyup input, focusout input' : function(evt,tmpl) {                                                              // 427
	if (evt.type === 'keyup') {                                                                                        // 428
      var charCode = evt.which || evt.keyCode;                                                                      // 429
	  if (charCode !== 13) {                                                                                           // 430
		return;                                                                                                           // 431
	  }                                                                                                                // 432
	}                                                                                                                  // 433
    tmpl.editing.set(false);                                                                                        // 434
    if (this.collection) {                                                                                          // 435
      var elem = tmpl.$(evt.target);                                                                                // 436
      var value = elem.val();                                                                                       // 437
      if (this.number) {                                                                                            // 438
        value = parseInt(value);                                                                                    // 439
      }                                                                                                             // 440
      var modifier = {                                                                                              // 441
        field: this.field,                                                                                          // 442
        value: value,                                                                                               // 443
        action: "$set"                                                                                              // 444
      };                                                                                                            // 445
      EditableJSONInternal.update(tmpl,modifier);                                                                   // 446
    }                                                                                                               // 447
	else {                                                                                                             // 448
	  EditableJSONInternal.saveToSession(evt,tmpl,this,true);	                                                         // 449
	}                                                                                                                  // 450
  }                                                                                                                 // 451
});                                                                                                                 // 452
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['babrahams:editable-json'] = {
  EditableJSON: EditableJSON
};

})();
