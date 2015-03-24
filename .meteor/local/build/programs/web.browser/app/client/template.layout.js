(function(){
Template.__checkName("layout");
Template["layout"] = new Template("Template.layout", (function() {
  var view = this;
  return HTML.DIV({
    style: "padding: 20px"
  }, "\n\n		", HTML.A({
    href: function() {
      return Spacebars.mustache(view.lookup("pathFor"), "home");
    },
    "class": "btn btn-primary"
  }, "Home"), "\n		", HTML.A({
    href: function() {
      return Spacebars.mustache(view.lookup("pathFor"), "profile");
    },
    "class": "btn btn-primary"
  }, "Profile"), "\n		", HTML.A({
    href: function() {
      return Spacebars.mustache(view.lookup("pathFor"), "myposts");
    },
    "class": "btn btn-primary"
  }, "Meine Posts"), "\n		", Spacebars.include(view.lookupTemplate("loginButtons")), HTML.Raw("<br><br>\n\n		"), Spacebars.include(view.lookupTemplate("yield")), "\n	");
}));

})();
