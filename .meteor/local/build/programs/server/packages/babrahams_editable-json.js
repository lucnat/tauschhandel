(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;

(function () {

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/babrahams:editable-json/editable-json-common.js          //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
Meteor.methods({                                                     // 1
                                                                     // 2
  update: function (collectionName, _id, action) {                   // 3
                                                                     // 4
    var Collection = Mongo.Collection.get(collectionName);           // 5
                                                                     // 6
	try {                                                               // 7
	                                                                    // 8
	  if (!!Package['aldeed:simple-schema'] && !!Package['aldeed:collection2'] && _.isFunction(Collection.simpleSchema)) {
		                                                                   // 10
		Collection.update(_id, action, {                                   // 11
		  filter: false,                                                   // 12
		  autoConvert: false,                                              // 13
		  removeEmptyStrings: false,                                       // 14
		  validate: false                                                  // 15
		});                                                                // 16
		                                                                   // 17
		return;                                                            // 18
	                                                                    // 19
	  }                                                                 // 20
	                                                                    // 21
	  Collection.update(_id, action);                                   // 22
	                                                                    // 23
	}                                                                   // 24
	                                                                    // 25
	catch (err) {                                                       // 26
	  throw new Meteor.Error(err);	                                     // 27
	}                                                                   // 28
                                                                     // 29
  }                                                                  // 30
                                                                     // 31
});                                                                  // 32
///////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['babrahams:editable-json'] = {};

})();

//# sourceMappingURL=babrahams_editable-json.js.map
